# QA REPORT — DEMO UI/UX SIPAKATAU V1.0

Tanggal pembuatan: 21 September 2026. Lingkungan: build statis HTML/CSS/JavaScript dan Node.js smoke test. **Status: demo visual/interaksi sintetis, bukan aplikasi siap produksi.**

## Pemeriksaan otomatis yang benar-benar dijalankan

- `node --check js/data.js` — PASS.
- `node --check js/app.js` — PASS.
- `node qa/smoke_test.cjs` — PASS untuk 11 kelompok pengujian: 17 kategori unik, 34 kasus fiktif, 9 rute publik, 4 tahap form, 9 rute operator pusat, semua lima peran, 6 halaman pengaturan admin, denial peran lain, isolasi kategori K02/K03, formula biaya, pembuatan tiket sebelum AI, dua pesan WA ke satu tiket, status delivery bukan tiket, dan larangan request eksternal dari skrip demo.
- Server lokal demo mengembalikan HTTP 200 untuk `index.html`.
- Struktur mencakup 24 rute unik, tujuh tab detail kasus, 17 kategori dengan operator utama dan cadangan, 18 dokumen pelaksanaan bernomor serta satu instruksi agen VS Code.

## Lingkup yang belum diuji dan harus dikerjakan developer di VS Code

1. Tampilan visual nyata di browser: viewport 390×844, 768×1024, 1440×900 dan 1920×1080. Lingkungan pembuat paket memblokir otomasi browser untuk membuka URL lokal, sehingga **jangan** menyatakan hasil visual screenshot Playwright PASS. Pemeriksaan render dengan Node tidak menggantikan uji visual.
2. Semua UX-001–022 secara manual pada Chrome/Edge, Firefox, Safari iOS dan Chrome Android. Verifikasi fokus keyboard, pembaca layar, reflow 200%, teks panjang dan kontras.
3. Integrasi nyata, keamanan backend, Firestore Rules, pencatatan audit tahan gangguan, pemrosesan data dan vendor: **belum dibangun** pada demo.
4. TC-001–030 full E2E dan restore disaster recovery: **belum lulus** dan merupakan gate produksi terpisah.
5. Ketersediaan Kirimdev untuk entitas pemerintah, persyaratan Gemini, lokasi data/vendor, tata kelola biaya, dan SOP aktif: keputusan pemilik proyek diperlukan. Fitur AI dalam demo adalah hasil lokal deterministik, bukan panggilan Gemini.

## Kesimpulan QA yang dapat dinyatakan

LULUS pemeriksaan sintaks, cakupan render route dasar dengan mock DOM, simulasi alur tiket, integritas kalkulasi contoh, dan penerimaan file melalui server lokal. **Tidak menyatakan perangkat lunak aman/aksesibel/siap produksi** dan tidak memberikan bukti uji browser yang belum dilakukan.
