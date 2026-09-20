# 12 — Panduan integrasi ilustrasi, ikon, dan hak pakai
## Aset baru yang disediakan dalam ZIP
- `assets/illustrations/00_contact_sheet.png`: empat panel moodboard hasil generasi; referensi visual, bukan tampilan produk final.
- `01_konsultasi_pendidikan.webp/png`: hero pendampingan orang tua, petugas dan siswa.
- `02_form_dengan_voice.webp/png`: visual fitur ponsel, ikon mikrofon, dan privasi (isi layar ilustratif **jangan** dianggap komponen UI nyata).
- `03_sekolah_inklusif.webp/png`: panel akses pendidikan inklusif, bukan klaim tentang sekolah tertentu.
- `04_routing_pengaduan.webp/png`: ilustrasi alur masyarakat → petugas → kelompok masalah.
- `assets/icons/*.svg`: ikon fitur vektor orisinal sederhana dari geometri; background transparan di luar bidang ikon; semua memakai `viewBox 64` dan judul; boleh dipakai sebagai decorative bila `aria-hidden=true`.

## Penempatan
| Halaman | Aset | Aturan |
|---|---|---|
| Beranda hero | 01 | object-fit contain, tidak memotong wajah; jangan simpan CTA penting dalam gambar |
| Form kronologi/voice | 02 | ilustrasi di area edukasi, jangan membuatnya terlihat sebagai tombol palsu |
| Layanan inklusif & disabilitas | 03 | alt "Ilustrasi lingkungan sekolah dengan jalur yang dapat diakses kursi roda" |
| Cara kerja/routing | 04 | tetap tampilkan langkah sebagai HTML asli, gambar pendukung saja |
| Menu/kartu | ikon SVG | konsisten 24–28 px, decorative aria-hidden jika text label sudah ada |

## Aset kelembagaan
Logo Pinrang dan Dikbud *harus dipertahankan menggunakan file asli repo*. Gambar konsep buatan AI bukan logo pemerintah resmi dan tidak boleh disalin sebagai sumber logo. Logo SIPAKATAU resmi pun gunakan dari folder `assets/` repo, bukan dibuat ulang dari ilustrasi. Periksa rasio, padding, warna serta izin sebelum tayang.

## Kualitas dan performa
Ilustrasi panel hasil generasi dipotong dari gambar komposit resolusi 1672×941; **setiap panel berukuran sekitar 817×456 px**, cocok untuk card/kolom hero sampai ukuran teruji, bukan materi 4K cetak. WebP untuk loading, PNG sebagai sumber, SVG untuk ikon tanpa font embedded. Sediakan text alternative, lazy load panel di bawah fold, uji LCP hero dan low-end Android. Hindari efek backdrop besar dan video autoplay.

## Kredensial dan provenance
Ilustrasi/ikon dibuat khusus untuk paket arahan ini; tidak berasal dari SAPA 129, bukan dokumentasi riil instansi/sekolah. Jangan menampilkan foto warga atau anak asli tanpa izin yang sah. Teks kecil dalam layar ilustrasi hanyalah dekorasi: seluruh teks layanan nyata harus HTML dengan aksesibilitas dan data benar.
