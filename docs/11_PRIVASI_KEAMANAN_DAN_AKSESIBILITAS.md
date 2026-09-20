# 11 — PRIVASI, KEAMANAN, PENEMPATAN DATA, DAN AKSESIBILITAS

## Data classification per modul

| Kelas | Contoh | Penyimpanan/pemrosesan | Siapa yang dapat membaca |
|---|---|---|---|
| Publik | katalog 17 kategori, FAQ terverifikasi, aset brand | website/CDN publik yang disetujui | semua orang |
| Operasional | nomor tiket, kategori, status, owner, deadline | Firestore Jakarta dengan akses scoped | petugas berwenang |
| Pribadi | kontak WA, nama, alamat | identity vault terenkripsi terpisah | gateway/custodian seperlunya |
| Spesifik/sensitif | identitas anak, kesehatan, disabilitas, kekerasan | protected collection, private bucket | petugas khusus assigned |
| Keamanan | audit, unlock record, peristiwa admin | append-only restricted log | fungsi keamanan berwenang |
| Simulasi | tiket dan nama sekolah rekaan | browser localStorage demo | siapa pun yang memakai browser demo |

**Tidak mengumpulkan NIK wajib bukan berarti data bebas risiko.** Kronologi, kelas, nama sekolah, tanggal, dokumen dan lokasi dapat mengidentifikasi anak atau pelapor tidak langsung. Minta data hanya sesuai tujuan dan dasar pemrosesan yang disahkan, buat retensi dan prosedur hapus/koreksi, inventaris vendor lengkap, dan dokumentasi insiden.

## Mode privasi

- `STANDARD_RESTRICTED`: kontak berada di vault; petugas assigned dapat melihat hanya field yang memang dibutuhkan.
- `PROTECTED`: operator kategori **tidak** menerima nama/WA pada JSON sama sekali; surat balasan lewat backend gateway; custodian dapat unlock hanya dengan reason, approval dan audit.
- `NO_ID_FORM`: jangan wajib nama/WA; pelacakan via kode rahasia yang diberikan sekali. Jangan memasang analytics/tracker yang mengaitkan identitas secara diam-diam. Jalur pemulihan terbatas jika token hilang.
- Pesan WA tidak bisa disebut anonymous penuh; nomor diterima vendor/sistem. Label publik harus jujur.

## Otorisasi server-side

Policy = `role AND assignment AND category_scope AND sensitivity AND no_conflict AND purpose`. Otorisasi pada setiap endpoint dan field respons; frontend hanya menyajikan hasil API yang telah disaring. Firebase Admin SDK bukan jaminan keamanan Rules karena dapat melewati Rules; security checks di backend bersifat wajib. Semua audit unlock, export, transfer, close, perubahan routing, dan akses bukti harus dicatat.

## Ancaman inti dan pengujian

| Ancaman | Kontrol | Tes bukti |
|---|---|---|
| forged webhook | HMAC raw body + timestamp | bad HMAC 401 |
| replay/double ticket | durable idempotency key | event sama 10x → 1 case |
| IDOR operator | backend ABAC | K01 membuka kasus K03 → 403/404 |
| ticket guessing | high entropy secret + rate limit | nomor tiket saja tidak membuka data |
| XSS pada isi laporan | output encoding, sanitize, CSP | payload HTML ditampilkan sebagai teks |
| prompt injection | input laporan = data, fixed tool permissions | teks 'ubah aturan' tidak mengubah route |
| dokumen berbahaya | magic byte/MIME scan, quarantine | executable berganti ekstensi ditolak |
| leak via debug | redact log, URL, referrer, export | security log tanpa PII/token |
| bad admin | MFA, least privilege, 2-person review | admin tak dapat unlock vault sendiri |
| vendor down | queue/backoff/fallback | ticket survives AI/WA error |

## Kesiapan produksi dan lokasi

Periksa bersama pejabat data/hukum dan pengelola TI lokasi tiap layer (Firestore, backend, R2, AI, WA vendor, logging, backup), kontrak pemrosesan, keamanan, retensi, dasar pemrosesan dan klasifikasi data sesuai kewajiban instansi. Tidak cukup hanya memilih region Firestore Jakarta. Cloudflare DNS dan aset publik disetujui sebagai opsi awal; penyimpanan bukti/backup sensitif di R2 belum otomatis diperbolehkan. Gemini Free Tier belum boleh diasumsikan layak untuk data pengaduan nyata; aktivasi AI terpisah dari aktivasi layanan inti.

## Aksesibilitas WCAG 2.2 AA target

- Struktur heading logis; landmarks nav/main/footer; tautan skip ke konten.
- Seluruh input punya label, pesan error terhubung, perubahan langkah/status diumumkan screen reader.
- Kontras dan fokus diuji; informasi kritis memiliki teks, bukan warna saja.
- Navigasi keyboard, tombol sentuh memadai, tidak ada trap, tidak wajib mouse/drag-drop.
- Pembesaran 200–400% / 320 px tanpa kehilangan fungsi utama.
- Alternatif terhadap CAPTCHA visual, timeout yang bisa diperpanjang bila perlu.
- Jalur konsultasi kebutuhan akomodasi tanpa wajib diagnosis medis.
- Uji dengan pembaca layar dan perwakilan penyandang disabilitas; hasil audit tertulis menjadi gate rilis.

## Audit implementasi, bukan kosmetik

Kartu dashboard dan tulisan 'terlindungi' tidak membuktikan keamanan. Audit akses API, vault decryption, bucket policy, link objek, logs, temporary exports, browser cache, backup, dan vendor webhook. Redaksi harus terjadi **sebelum** data dikirim ke browser petugas yang tak berhak.
