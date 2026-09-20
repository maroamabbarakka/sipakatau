# 11 — Dashboard staff dan microcopy: segar tanpa mengorbankan kecepatan kerja
## Pola visual
Dashboard desktop: sidebar ringkas dengan identitas, topbar pencarian & role, KPI yang benar-benar relevan, antrean tindakan prioritas, panel detail kasus; grafik di bawah. Mobile: sidebar drawer/tabs, KPI dalam 1–2 kolom, satu kasus per kartu, detail full-page; jangan menampilkan tabel 17 kolom yang disusutkan.

| Peran | Tampilan beranda | Batas |
|---|---|---|
| Operator pusat | intake ambigu, eskalasi, pengalihan dan WA gagal | tidak otomatis membuka seluruh identitas terlindungi |
| Operator kategori | tugas assigned, prioritas, SLA dan balasan | case scope harus dicek backend saat produksi |
| Perlindungan | antrean sensitif, konflik dan audit intensif | jangan tampilkan identitas anak di preview umum |
| Pimpinan | statistik agregat, SLA, eskalasi, trend | tidak otomatis lihat raw reports/contact |
| Super admin | kesehatan demo, kategori, role, konfigurasi biaya | bukan akses default ke vault/kronologi sensitif |

## Detail kasus
Atas: tiket, status, kategori, urgensi, pemilik, SLA, badge privasi. Tab: ringkasan asli vs usulan AI diberi label; pesan asli (sesuai role); timeline; penugasan; lampiran aman; balasan/outbox; audit. Tombol aksi yang terlihat sesuai izin. Error/konflik versi tidak menimpa state secara diam-diam.

## Bahasa UI
- Hindari label "disposisi" tanpa penjelasan: gunakan "Teruskan ke petugas" + tooltip "Penugasan tercatat pada riwayat kasus".
- "Unknown category" → "Kategori belum dipastikan" dan CTA "Periksa kategori".
- "AI disabled" → "Analisis otomatis belum digunakan. Laporan tetap dapat ditangani petugas." tanpa menyebut error sistem.
- "SLA breach" → "Melewati target penanganan" dan tampilkan target versi kebijakan bila disahkan.
- Selesai hanya setelah pemeriksaan dan status nyata, jangan berdasarkan keluaran AI.

## Audio di dashboard
Audio guide hanya untuk orientasi UI dan informasi generik, bukan isi kasus atau nomor WA. Dikte untuk balasan sensitif tidak aktif default sampai persetujuan vendor dan kebijakan data. Voice pada publik dan form dinas tidak otomatis masuk ke dashboard petugas.

## Regression
Peran, jumlah total data, filter, pagination, status, routing, audit dan biaya harus identik before/after pada dataset fiktif. Visual baru tidak boleh mengubah cara penghitungan metrik; nilai demo jelas dilabeli simulasi.
