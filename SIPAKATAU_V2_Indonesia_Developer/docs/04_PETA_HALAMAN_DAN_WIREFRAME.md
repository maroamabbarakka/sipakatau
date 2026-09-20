# 04 — Peta halaman & wireframe berbasis alur
## Prinsip inventaris
Route berikut target berdasarkan masterplan dan repo terbaca; developer harus reconcile dengan hash routes aktual di HEAD. Jangan menghapus route yang tidak tertulis di sini: catat dalam `evidence/route-inventory.md` dan masukkan ke pengujian.

| Area | Route / flow | Above-the-fold mobile | Elemen sekunder |
|---|---|---|---|
| Publik | `#/` | logo institusi, headline, CTA Buat/Lacak | cara kerja, grup isu, audio panduan, privasi, FAQ |
| Publik | `#/pengaduan` | langkah + pertanyaan inti + bantuan audio | pilihan voice, privasi, review, konfirmasi |
| Publik | `#/lacak` | input tiket + kode rahasia | status, timeline, tambahan, keberatan |
| Publik | `#/demo-whatsapp` | chat fiktif + instruksi | simulasi hasil tiket, bukan WA sungguhan |
| Publik | `#/panduan`, `#/aksesibilitas`, `#/privasi`, `#/bantuan-anak` | penjelasan mudah + jalur aksi | tabel/FAQ accordion, panduan audio statis |
| Staff | `#/login` | login demo berlabel + role | peringatan mode simulasi |
| Staff | `#/dashboard` | salam + ringkasan sesuai role + tugas berikutnya | grafik, tren, filter |
| Staff | inbox/cases/detail | prioritas, cari & filter | timeline, balasan, penugasan, lampiran, audit |
| Staff | assignments/escalations | antrean kerja & tenggat | alihkan/escalate sesuai peran |
| Staff | reports/admin/categories/users/settings/cost | ringkasan tujuan layar | data, pagination, audit, cost guard |
| Form Dinas | `SIPAKATAU_FORM_DINAS/public/index.html` | judul nonteknis, progres 1/5 | WA, admin, kategori, kebutuhan, tinjau |

## Sketsa susunan mobile beranda
`sticky slim header` → headline H1 + explanatory paragraph → CTA form & lacak (stack) → institutional trust badges → ilustrasi konsultasi→ "Apa yang ingin disampaikan?" 6 group cards → "Cara kami menangani" numbered timeline → privacy and accessibility → FAQ → footer logos. Tidak ada tabel statistik kosong atau KPI fiktif pada beranda produksi.

## Sketsa form
`header minimal` → progress label "Langkah 1 dari 4" → guide text + tombol "Dengarkan penjelasan" → single question / choice cards → reveal field terkait → `Kembali | Simpan draf | Lanjut` sticky. Langkah review tampil semua jawaban penting dan tombol Edit per bagian. Setelah submit: tanda terima, token shown once, petunjuk simpan, CTA lacak.

## Sketsa dashboard mobile
Header nama role → tabs Tugas/Ringkasan → KPI ringkas berbentuk cards → satu daftar kasus berprioritas dengan label teks (bukan warna saja) → detail satu kasus per halaman/drawer aman; chart opsional bawah. Desktop menggunakan daftar-kiri/detail-kanan bila viewport cukup. Privasi berlaku pada data query/API, bukan hanya UI.

## Empty/error/loading
Setiap halaman WAJIB state: tidak ada data, memuat, gagal koneksi, akses ditolak, input salah, proses tertunda, sukses. Tidak mengarang status bahwa laporan telah tercatat bila backend belum membuktikan durable write.
