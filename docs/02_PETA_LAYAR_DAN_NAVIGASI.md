# 02 — INVENTARIS LAYAR, NAVIGASI DAN STATUS ANTARMUKA

## Rute halaman publik

| URL demo | Layar | Aksi utama | Empty/error/loading yang harus dibuat produksi |
|---|---|---|---|
| `#/` | Beranda | dua CTA, 17 kategori, jalur bantuan | aset gagal, jaringan lambat, akses keyboard |
| `#/pengaduan` | Wizard 4 langkah | memilih kategori, uraian, privasi, konfirmasi | validasi, upload gagal, duplikasi submit, autosave aman |
| `#/lacak` | Pelacakan | ticket + tracking secret, informasi tambahan, keberatan | salah kode tanpa enumeration, request timeout |
| `#/demo-whatsapp` | Penjelasan alur WA | masuk demo petugas | konektor produksi belum tersambung |
| `#/panduan` | FAQ/layanan | accordion, menuju formulir | FAQ belum divalidasi, fallback petugas |
| `#/bantuan-anak` | jalur perlindungan | instruksi bantuan/rujukan | nomor rujukan harus diverifikasi sebelum publikasi |
| `#/aksesibilitas` | aksesibilitas | informasi K17 dan cara akses | pembaca layar, zoom besar |
| `#/privasi` | pemberitahuan privasi | pemahaman mode privacy | harus diganti pemberitahuan resmi terbit |
| `#/login` | login petugas simulasi | pilih role | produksi: MFA, invalid account, reset/revocation |

**Wizard langkah:** (1) jenis/kategori/jenjang/sekolah; (2) kronologi/lokasi/anak/risk; (3) privacy/kontak/lampiran; (4) review, pernyataan dan kirim. Konfirmasi tiket bukan langkah form yang harus diisi. Dalam produksi upload membutuhkan signed URL berumur pendek, pemeriksaan lampiran, dan UI progres terpisah.

## Rute dashboard internal

| URL demo | Aktor utama | Komponen dan interaksi |
|---|---|---|
| `#/dashboard` | seluruh role | KPI scoped, distribusi, prioritas, status integrasi |
| `#/dashboard/inbox` | pusat/kategori/perlindungan | daftar intake baru, filter, buka kasus |
| `#/dashboard/cases` | pusat/kategori/perlindungan | seluruh daftar kasus sesuai hak, cari/filter/pagination |
| `#/dashboard/cases/:id` | petugas sesuai penugasan | 7 tab, transisi, eskalasi, disposisi, balasan |
| `#/dashboard/assignments` | pusat/kategori/perlindungan | pemilik aktif, cadangan, daftar tugas |
| `#/dashboard/escalations` | pimpinan/pusat/perlindungan | kasus kritis, high priority, eskalasi |
| `#/dashboard/whatsapp` | pusat | percakapan rekaan, webhook, replay, delivery, outbox |
| `#/dashboard/reports` | pimpinan/pusat | statistik dari kasus unik, distribusi, ekspor CSV agregat |
| `#/dashboard/ai` | pusat/kategori/perlindungan/admin | cek kebijakan, tiga kemampuan AI SIMULASI |
| `#/dashboard/costs` | pimpinan/admin | kalkulator editable, cost guard, ekspor CSV |
| `#/dashboard/admin/categories` | super admin | master 17 kategori; edit operator/cadangan; ekspor |
| `#/dashboard/admin/schools` | super admin | daftar sekolah rekaan, metadata verifikasi |
| `#/dashboard/admin/users` | super admin | daftar peran, simulasi ganti role |
| `#/dashboard/admin/settings` | super admin | feature flags, AI/WA, pagu, reset data lokal |
| `#/dashboard/admin/backup` | super admin | status DR, pemeriksaan simulasi, checklist produksi |
| `#/dashboard/admin/audit` | super admin | audit contoh + ekspor CSV |

**Rute produksi:** boleh menggunakan path browser (`/pengaduan`, `/dashboard/...`) dengan SPA fallback atau hash-routing. Kedua pola diterima jika URL dibagikan, refresh dan akses langsung aman. Demo memakai hash untuk bisa dibuka tanpa infrastruktur.

## Inventaris 7 tab detail kasus

1. Ringkasan: deskripsi asli, ringkasan AI **draf** dan badge status.
2. Pesan asli: urutan waktu per channel; tidak diubah hasil AI.
3. Riwayat: kejadian status/penugasan/otorisasi; append-only.
4. Bukti: hanya objek yang lolos AV/type; signed URL untuk pemilik tugas.
5. Penugasan: operator aktif, cadangan, route baru yang lolos conflict check.
6. Balasan: operator mengetik; backend memasukkan ke outbox, komunikasi melalui gateway, nomor WA tidak diungkap kepada kategori.
7. Aturan & AI: category/rule version, gate, risk tags, usulan AI berlabel, tombol analisis hanya saat eligible.

## Variasi state UI yang WAJIB dirancang per layar

`LOADING`: skeleton relevan, tidak memblokir navigasi. `EMPTY`: jelaskan tidak ada data dan sediakan reset filter/aksi sesuai hak. `ERROR`: pesan nonteknis + retry tanpa duplikasi. `NO_PERMISSION`: halaman/panel tidak mengungkap isi raw di respons API. `OFFLINE/DEPENDENCY_DOWN`: penerimaan tidak boleh mengaku sukses sebelum durable write. `DEGRADED_AI`: status kasus tetap berjalan. `PARTIAL_VENDOR`: pesan outbox menunggu dengan alasan terukur. `STALE_DATA`: cap last updated dan manual refresh. `MOBILE`: navigasi sidebar bisa dibuka/tutup; tabel horizontal tanpa menghilangkan isi penting; tombol 44 px target bila memungkinkan.

## Alur deep-link dan URL

- URL publik aman tidak memuat NIK, WA, nama, kode pelacakan, atau identitas anak.
- Nomor tiket boleh terlihat sebagai referensi administratif; **tidak cukup** untuk membuka rincian.
- Detail kasus internal `/dashboard/cases/:id` harus memverifikasi role+assignment+sensitivitas **pada server tiap request**, termasuk akses lewat URL yang diketik manual.
- Route tidak ada -> 404; role tidak sesuai -> 403/404 yang tidak membocorkan apakah ID sebenarnya ada.
- Setiap tombol terlihat harus mempunyai satu respons berguna: navigasi, perubahan state, penjelasan `simulasi`, atau disabled dengan alasan.

## Alur yang bisa dijalankan segera

**Warga:** Beranda → Ajukan pengaduan → empat tahap → tiket+token → Lacak → informasi tambahan/keberatan. **Pusat:** Login OPERATOR_PUSAT → WA simulator → kirim contoh → Kotak Masuk → Kasus → Penugasan → Penanganan → Balasan → Riwayat. **Pimpinan:** login PIMPINAN → ikhtisar/escalations/reports/costs → mencoba link raw detail seharusnya tertolak. **Admin:** login SUPER_ADMIN → kategori/role/settings/backup/audit/costs. **Kategori:** login OPERATOR_KATEGORI K03 → daftar hanya K03 assigned, URL K10 tidak terbuka.
