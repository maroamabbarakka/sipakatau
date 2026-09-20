# 03 — DESIGN SYSTEM, BRANDING, RESPONSIVITAS, DAN KOMPONEN

## Identitas visual

Nama resmi: SIPAKATAU — Sistem Pengaduan Pendidikan Terpadu; konstruksi akronim pada materi penjelasan: **SI**stem **P**eng**A**duan pendidi**KA**n **T**erp**A**d**U**. Pada wordmark, jangan memberi ornamen identik berulang pada huruf A. Jika menggunakan varian modifikasi huruf U, pertahankan satu bentuk gelembung dialog yang sederhana, jelas, konsisten, dan terbaca pada 24 px. Label kepanjangan tetap dieja normal, tanpa pemisahan suku kata yang merusak keterbacaan.

Aset:
- `assets/logo-horizontal.png`: header publik, sidebar dan cetak lebar.
- `assets/logo-utama.png`: poster, beranda, ruang sambutan.
- `assets/ikon-app.png`: favicon dan shortcut.

Tidak boleh mendesain ulang Tut Wuri Handayani dari imajinasi. Jika lembaga menghendaki emblem, gunakan satu aset resmi yang telah diverifikasi dan jangan memasukkan logo Kabupaten Pinrang pada mockup/proyek tanpa persetujuan perubahan identitas.

## Token warna dari demo

```css
--navy: #102d56;    /* judul, sidebar, identitas kelembagaan */
--blue: #0860c9;    /* tindakan primer dan state fokus */
--blue2:#1681ee;    /* pendukung informasi */
--orange:#ff8a16;   /* aksen, status perlu perhatian */
--teal:#008a79;     /* keberhasilan dan kejelasan */
--red:#bd3151;      /* kritis, error, eskalasi */
--text:#173253;     /* isi */
--muted:#62758c;    /* metadata */
--line:#e0e8f0;     /* pembatas */
--bg:#f5f8fc;       /* kanvas */
--surface:#ffffff; /* cards */
```

Warna status tidak boleh menjadi satu-satunya pembeda; selalu tampilkan teks dan, bila diperlukan, ikon. Nilai warna merupakan token demonstrasi dan harus diuji kontras terhadap WCAG 2.2 AA sebelum disahkan. Hindari gradasi mencolok pada tabel dan area baca.

## Tipografi dan tata letak

- UI gunakan font sistem `Inter`, `Segoe UI`, `Arial`, sans-serif; font tidak disertakan dalam paket. Untuk dokumen formal pemerintah, ikuti panduan terpisah Calibri 11/12 pt.
- Display hero 38–62 px responsif; H1 dashboard 27 px; H2 halaman 24–33 px; judul kartu 16–18 px; isi 13–16 px; metadata minimal 11–12 px dan diperbesar untuk produksi bila hasil audit menunjukkan keterbacaan kurang.
- Spasi dasar kelipatan 4/8 px; radius 10–17 px; kolom utama hingga 1190 px, staff dashboard adaptif hingga 1700 px.
- Desktop dashboard: sidebar 255 px + konten; tablet 208 px; mobile <760 px sidebar overlay dan menu pemicu. Beranda dua kolom berubah satu kolom pada mobile.
- Tabel horizontal boleh di-scroll di layar kecil; tindakan inti jangan tersembunyi tanpa petunjuk.

## Komponen inventaris dan kontrak perilaku

| Komponen | State yang harus tersedia | A11y minimal |
|---|---|---|
| Button | default, hover, active, disabled, loading, error | `button`, teks aksi, fokus terlihat |
| Input / select / textarea | empty, filled, invalid, readonly, disabled | label terhubung, error `aria-describedby` produksi |
| Stepper formulir | 1–4, completed, error | langkah diumumkan melalui heading/aria |
| Card KPI | number, timeframe, loading, partial | `tabular-nums`, label selalu terlihat |
| Ticket table | sort/filter/pagination/empty/error | header tabel semantik, fokus link/action |
| Badge | kritis, tinggi, normal, status, privasi | teks berdiri sendiri, bukan warna saja |
| Tab kasus | selected/unselected, denial | `role=tablist/tab`, keyboard arrow di produksi |
| Timeline | event terbaru, actor, time, reason | struktur list yang terbaca pembaca layar |
| Modal konfirmasi | open, submit, cancel | focus trap dan kembalikan fokus |
| Toast | info, sukses, peringatan | `role=status`/`alert`, tidak auto-hide sebelum cukup waktu |
| File uploader | validate/progress/scan/quarantine | status terucap, tidak wajib drag-drop |
| Cost form | valid/invalid/empty/preset | angka, mata uang, catatan asumsi |

## Prinsip layar high-fidelity

1. Logo konsisten. Jangan gunakan logo Pinrang pada modul atau gambar screenshot.
2. Dashboard pimpinan: angka besar dan jelas, unit, tanggal dan definisi indikator; tidak mengumumkan sekolah ‘buruk’ berdasar tuduhan.
3. Halaman aduan: bahasa sehari-hari, navigasi empat langkah, tidak wajib NIK, privacy mode eksplisit, bantuan pada anak/risiko.
4. Detail kasus: informasi penting sebelum lipatan pertama (tiket/status/urgensi/kategori/owner/SLA/privacy), tujuh tab jelas.
5. Semua contoh nama sekolah dan angka wajib mencantumkan `FIKTIF` atau `SIMULASI` pada layar atau dataset.
6. Tidak boleh menjadikan mockup generatif sebagai sumber teks final, nama instansi, SLA, tarif atau statistik. UI HTML/CSS adalah sumber visual yang dapat diedit.

## Golden-ratio sebagai pemeriksaan proporsi, bukan klaim geometris palsu

Gunakan rasio kolom hero 1.05:0.95 dan detail kasus 1.6:1 sebagai keseimbangan visual. Jika ingin mengklaim logo dibangun dari golden ratio (φ ≈ 1,618), desain vektor harus memiliki ukuran dan konstruksi yang bisa diukur; jangan menempelkan spiral emas dekoratif tanpa bukti. Fokus pada proporsi, keterbacaan dan konsistensi.

## Peta pengujian visual

Viewport minimal 390×844, 768×1024, 1440×900 dan 1920×1080; selain itu zoom 200%. Periksa clipping, overflow, fokus, sticky nav, pembungkusan chip, form yang tetap bisa dikirim, tabel yang dapat di-scroll, dan logo yang tidak terpotong.
