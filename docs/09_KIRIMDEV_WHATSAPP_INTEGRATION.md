# 09 — IMPLEMENTASI WHATSAPP KIRIMDEV: DARI WEBHOOK KE OUTBOX

## Sebelum mulai

Dapatkan konfirmasi tertulis Kirimdev untuk akun instansi pemerintah, kepemilikan WABA/nomor, hak data, izin platform, tarif/pajak, kuota, webhooks/API, retensi, penutupan kontrak dan ekspor. Dokumen masterplan V1.1 mencatat Starter Rp25.000/bulan sebagai referensi per 19 September 2026; jangan menganggap ini harga yang berlaku saat pengadaan.

## Penerimaan webhook

1. Terima **raw request body** dan header; jangan parse JSON lebih dulu jika tanda tangan dihitung dari byte asli.
2. Verifikasi header signature dengan secret dari secret manager dan metode yang dikonfirmasi terhadap dokumentasi Kirimdev terkini. Masterplan menyebut pola `X-Kirim-Signature: t=<unix>,v1=<hex>` HMAC-SHA256 atas `"{t}.{raw_body}"`, `X-Kirim-Event-Id` dan toleransi waktu ±300 detik sebagai baseline **yang perlu dicocokkan sebelum implementasi**.
3. Gunakan perbandingan constant-time, rotasi rahasia terkontrol, aturan replay timestamp, dan tolak signature invalid dengan 401 tanpa mencatat payload rahasia.
4. Claim `event_id` secara atomik dan simpan event+durable job di satu transaksi. Event duplikat dibalas ACK tanpa membuat kasus/tiket baru.
5. Balas 2xx **setelah persist**; jangan menunggu Gemini atau seluruh routing. Jika database gagal, jangan balas sukses palsu—biarkan mekanisme retry vendor bekerja.
6. Worker async membedakan inbound message, delivery/read status, event sistem; hanya inbound yang valid boleh memulai/melengkapi kasus.

```ts
async function handleWebhook(raw: Buffer, headers: Headers) {
  verifySignature(raw, headers);              // required, with timestamp + secret
  const eventId = requireEventId(headers);
  const accepted = await atomicCreateEventAndJob(eventId, minimalPayload(raw));
  if (!accepted) return {status: 200, body: 'duplicate'};
  return {status: 200, body: 'accepted'};
}
```

Kode di atas adalah kontrak alur, **bukan implementasi siap pakai**. Dalam produksi gunakan library resmi yang diizinkan dan error handling teruji.

## Percakapan dan anti-duplikasi

- Satu event ID Kirimdev → maksimal satu rekaman intake logical.
- Pesan beruntun yang jelas melengkapi kasus yang sama dapat dikelompokkan setelah verifikasi konteks; jangan paksa setiap pesan menjadi tiket baru.
- Jika pelapor menyebut 'laporan kedua', mulailah tiket baru. Jangan menggabungkan dua korban berbeda hanya berdasarkan kata-kata mirip.
- Delivery status tidak boleh menaikkan hitungan `unique_cases`.
- Data asli, referensi vendor dan hasil redaksi disimpan terpisah.

## Outbound gateway

`compose → validate privacy → outbox intent/idempotency → check service window/category/rate → send → vendor id → delivery status/retry`.

Operator hanya menulis pesan di dashboard. Backend membaca nomor WA dari vault dan mengirim tanpa mengembalikan nomor kepada operator kategori. Batasi retries agar tak menggandakan biaya/komunikasi; gunakan status pending, backoff terukur, reconciliation dengan status vendor. Seluruh template harus disetujui platform, teks pemberitahuan tidak membocorkan isi kekerasan atau anak.

## Uji integrasi

- Bad HMAC → 401, tidak membuat event.
- Timestamp stale → reject aman.
- Event valid diputar 10x → satu intake, satu tiket, tak lebih satu tanda terima.
- Database mati → error yang menyebabkan retry, bukan ACK semu.
- Gemini 429/timeout → tiket tetap masuk.
- Banyak pesan dalam satu percakapan → satu kasus apabila pelengkap; dua kasus bila pelapor eksplisit membuat laporan baru.
- `read/delivered` → update outbox, no ticket.
- Nomor pelapor terlindungi tidak tercantum dalam payload kepada operator kategori.
- Biaya aktual harus dihitung menurut kategori pesan dan invoice vendor, bukan sekadar jumlah kasus.

## Contoh demo

Pada `#/dashboard/whatsapp`, pilih 'Contoh bahaya bangunan' → kirim → periksa tiket baru pada `#/dashboard/inbox` → klik 'Uji replay' → jumlah tiket tidak bertambah → 'Uji status delivered' → status outbox berubah, tidak membuat kasus. Semua langkah lokal, tidak menguji HMAC secara sungguhan.
