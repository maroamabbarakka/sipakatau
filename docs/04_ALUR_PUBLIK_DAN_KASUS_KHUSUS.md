# 04 — ALUR PUBLIK: FORM, WHATSAPP, PRIVASI, ANAK, DAN PELACAKAN

## F-01 — Formulir empat langkah

**Langkah 1 — Klasifikasi sendiri bila mampu:** pilih jenis COMPLAINT/ASPIRATION/INFO, kategori K01–K17 atau `UNKNOWN`, jenjang PAUD/SD/SMP/NONFORMAL/UNKNOWN, dan satuan pendidikan (opsional). UNKNOWN tidak boleh menjadi error; kirim ke triase pusat. Nama sekolah diisi manual bila belum diverifikasi, jangan otomatis mengarang NPSN.

**Langkah 2 — Kronologi:** uraian, kecamatan kejadian (bukan domisili NIK), apakah subjek anak, dan penanda ancaman keselamatan. Validasi minimum narasi tidak boleh menolak laporan risiko yang sangat singkat; bila ada bahaya aktif, cari bantuan lebih dahulu dan eskalasi manual segera setelah tiket diterima.

**Langkah 3 — Perlindungan:** `STANDARD_RESTRICTED`, `PROTECTED`, `NO_ID_FORM`. PROTECTED: kontak boleh dicatat dalam vault tetapi tak tampil pada operator kategori. NO_ID_FORM: jangan minta nama/nomor; komunikasikan keterbatasan pemulihan token. Opsional lampiran foto/PDF dengan batas usulan 5 MB per file, 15 MB per kasus, tempat simpan privat dan verifikasi file.

**Langkah 4 — Ringkasan dan kirim:** tampilkan preview yang bisa dikoreksi; acknowledgement pemberitahuan privasi yang sah (bukan consent serba guna); akun dewasa reguler self-declaration bila kebijakan disahkan. **Kasus perlindungan anak/keselamatan dapat diterima tanpa syarat registrasi 18+.** Submit menggunakan idempotency key; sukses hanya setelah write persisten.

**Hasil:** `ticket_number`, `tracking_secret_once`, waktu penerimaan dan status aman. Token hanya diberikan sekali dalam produksi; hash disimpan server, bukan token mentah di URL/log. Demo menggunakan string fiktif di localStorage, sama sekali bukan pola yang boleh dikloning untuk produksi.

## F-02 — WhatsApp melalui Kirimdev

```text
Warga kirim pesan → Kirimdev webhook → HMAC + timestamp → durable intake
→ ACK cepat → bedakan report/new message/delivery status → tiket satu kali
→ safety rules → AI gate opsional → category rules → operator → outbox notice
```

- Pesan chat bertahap dari satu pelapor: gabungkan ke kasus yang sama hanya setelah keterkaitan terbukti; frasa 'laporan kedua' menciptakan kasus baru.
- Status delivered/read bukan laporan. Replay event tidak boleh menduplikasi tiket.
- WA memiliki nomor pengirim yang diketahui vendor/sistem, maka hanya dapat menawarkan **identitas terlindungi**, bukan anonim penuh.
- Notifikasi pertama mengandung nomor tiket dan instruksi aman. Informasi sensitif tidak boleh dikirim sebagai teks otomatis panjang, dan pengiriman mengikuti ketentuan kategori pesan/jendela layanan Meta yang berlaku.

## F-03 — Pelacakan aman

Gunakan tiket + token rahasia dengan entropi tinggi atau login yang sah. GET status mengembalikan hanya metadata aman, timeline yang sesuai peran, pembaruan dan fungsi kirim informasi tambahan. Nomor tiket saja harus memberi respons generik; salah token tidak boleh mengungkap ada/tidaknya seseorang terdaftar.

**Fitur keberatan:** tiket baru terkait kasus sebelumnya (`parent_case_id`), bukan menimpa status kasus pertama; deadline dan reviewer sesuai SOP. Detail asli hanya diberikan sesuai hak.

## F-04 — Kekerasan / anak / disabilitas

| Kondisi | Tampilan | Tindakan belakang layar |
|---|---|---|
| Ancaman bangunan atau kekerasan berlangsung | peringatan bahwa aplikasi bukan pengganti bantuan darurat | deterministic safety flag dan notifikasi petugas khusus segera |
| Anak menghubungi WA | jawaban aman dan informasi bantuan, jangan otomatis membungkam | informasi awal bisa diterima; rujukan perlindungan resmi |
| Orang tua melapor anak | 'saya mewakili anak' tanpa NIK anak default | subject reference jika perlu; akses dibatasi |
| Orang tua/terlapor konflik | jangan otomatis membuka WA/kasus kepada terlapor | conflict-of-interest check sebelum route |
| Penolakan karena disabilitas | K17 + K01 bila relevan | pemeriksaan akses pendidikan/ULD jika sudah diverifikasi |
| Dugaan kekerasan + disabilitas | satu pemilik, multi-tag risiko | petugas perlindungan khusus, informasi minim |
| Laporan di luar kabupaten | tetap diterima dan dirujuk | bukti rujukan, pemilik follow-up, bukan auto-close |

## F-05 — Rincian status masyarakat

Tampilkan bahasa: Diterima → Triase → Didisposisikan → Dalam Penanganan → Verifikasi Hasil → Terselesaikan → Ditutup; jalur opsional butuh info / instansi lain / eskalasi / keberatan. Jangan menampilkan nama pejabat terlapor, chat internal, hasil AI mentah, kontak pelapor lain, atau nama anak tanpa dasar.

## Kriteria UAT publik

- Form selesai dengan kategori K01 dan NIK kosong; nomor tiket + token tercipta.
- UNKNOWN tidak buntu.
- Pemilihan NO_ID_FORM tidak menyimpan kontak dari form; untuk WA jangan menjanjikan anonim total.
- Tidak ada upaya enumerasi tiket hanya dari nomor atau nomor WA.
- Lampiran palsu dan berbahaya ditolak di backend; demo menampilkan batas saja.
- Laporan keselamatan tak tertunda AI atau validasi umur biasa.
- Pengguna zoom 200% dan pembaca layar dapat menyelesaikan empat langkah.
