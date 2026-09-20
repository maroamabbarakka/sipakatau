# 06 — Form pengaduan masyarakat: spesifikasi empat langkah, cabang, dan audio
## Larangan
Jangan menghapus NIK-optional, mode privasi, laporan dari anak/saksi yang membutuhkan keselamatan, kategori UNKNOWN atau penerbitan tiket sebelum AI. Jangan membuat audio sebagai syarat submit. Jangan menyalin seluruh pertanyaan korban pada SAPA 129 untuk pengaduan umum pendidikan.

## Wizard empat langkah (mapping business field tetap)
**S1 Kondisi dan persoalan:** tanya urgensi "Apakah ada bahaya yang sedang berlangsung?" dengan pilihan biasa/darurat + opsi "Tidak yakin"; tampilan bantuan segera melalui aturan deterministik jika kritis, jangan menunggu Gemini. "Siapa yang terdampak?" diri sendiri / anak / orang lain / tidak ingin menjawab; hindari meminta detail anak bila tidak perlu. Kategori UNKNOWN tetap sah.
**S2 Ceritakan:** jenjang PAUD/SD/SMP/nonformal/tidak tahu, sekolah bila tahu (master data valid jika ada), lokasi kejadian ≠ domisili, kronologi textarea; tombol dikte dan panduan audio saling eksklusif; lampiran opsional dalam kontrol aman. Batas karakter tetap sesuai kode/existing requirement, jangan ubah diam-diam.
**S3 Privasi & tindak lanjut:** STANDARD_RESTRICTED / PROTECTED / NO_ID_FORM (NO_ID hanya tersedia di form), kontak opsional berdasarkan mode dan kebutuhan follow-up; jelaskan WA tidak anonim penuh. Nama/NIK anak tidak dipaksa. Persetujuan spesifik untuk dikte bila voice recognition mungkin memproses di penyedia browser.
**S4 Periksa & kirim:** ringkas tepat sesuai input, Edit untuk tiap bagian, label fakta pelapor vs hasil verifikasi, consent/notice yang sah; satu klik anti-duplicate, progress valid, server confirmation sebelum tampil "Berhasil"; token rahasia ditampilkan sekali pada hasil form.

## State & event contract UI
`idle → validating → submitting → success` atau `field-error/network-error/pending`; `retry` dengan idempotency key yang sama. Simpan draft non-sensitive secara terbatas di demo; keputusan produksi penyimpanan kronologi/lampiran lokal harus melalui privacy review; jangan menaruh nama anak/audio mentah di localStorage/analytics. Jika pindah langkah, speech stop (TTS dan STT); perubahan step tidak boleh menghapus jawaban.

## Voice entry flow
Pengguna melihat tombol "Ceritakan dengan suara" + ringkasan risiko → centang/konfirmasi eksplisit satu sesi → klik "Mulai merekam untuk diubah menjadi teks" (jangan mengklaim perekaman lokal) → dengarkan → hasil transkrip sebagai **draf tidak dikirim** → periksa ejaan/nama/tempat → "Gunakan teks ini" → bisa edit di textarea. `not-allowed`, `no-speech`, `audio-capture`, `network`, `language-not-supported`, `service-not-allowed` tampilkan pesan dan fallback manual. Bila tidak didukung, jangan tampilkan tombol palsu.

## Sensitif/aksesibilitas
K02 dan K17 dapat memiliki petunjuk privat/akomodasi yang relevan, dipisah dalam data konfigurasi setelah SOP disetujui; jangan meminta diagnosis untuk bisa mengadu. TTS jangan membacakan laporan atau identitas ke publik. Target sentuh ≥48px, label dan error terbaca, progress announce singkat (bukan seluruh konten ulang), fokus pada heading setelah next, dan suara tidak otomatis start.

## Uji wajib
Pilihan darurat vs normal, kategori UNKNOWN, 3 mode privasi, NIK kosong, anak/saksi, penolakan mikrofon, voice error, transkrip diedit, reload saat draft, lampiran gagal, double submit, AI mati, offline, token tidak bocor, staff routing. Semua diuji desktop+mobile.
