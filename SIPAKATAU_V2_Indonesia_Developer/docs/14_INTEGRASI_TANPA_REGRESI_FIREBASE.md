# 14 — Integrasi ke repo, Firebase Spark, keamanan, dan change control
## Struktur implementasi yang disarankan
`css/tokens-v2.css` (hanya jika konsolidasi direncanakan; lebih baik revisi token existing), `css/components-v2.css` sebagai satu file komponen saja, `js/audio/audio-catalog.js` naskah statis, `js/audio/voice-guide.js`, `js/audio/voice-dictation.js`, `js/audio/audio-controller.js`. Integrasikan ke hash-router `js/app.js` dengan lifecycle `onRouteLeave` untuk cancel TTS dan abort STT; hindari event listener duplikat setelah render.

## Source of truth
Repository default `main` adalah titik awal; screenshot dan tests before/after harus pada HEAD yang sama sebelum branch. Jangan menambahkan gambar asset ke remote tanpa pemeriksaan ukuran, attribution dan persetujuan. Tiga logo terpelihara; data kategori ID K01–K17 tidak berubah.

## Firebase Spark
Frontend statis / form dinas dapat dihosting di Spark, tetapi Hosting bukan penyimpanan jawaban dengan sendirinya. Jangan menulis API key vendor, token, atau kredensial server ke frontend. Login dan Firestore rules harus dievaluasi terpisah dan diuji akses negatif bila penyimpanan bersama diaktifkan; jangan deploy rules otomatis saat hanya mengerjakan UI. Uji `firebase emulators` untuk perubahan rules setelah disetujui; tanpa persetujuan, mode UI demo tetap fiktif/offline.

## Voice deployment gate
TTS generik dengan naskah internal Indonesia bisa diuji tanpa kasus nyata; STT dengan data pribadi pengaduan harus `FEATURE_VOICE_DICTATION=false` pada produksi sampai pemeriksaan browser/vendor, privasi, kebijakan PSE, dan sign-off. Jangan membuat key Gemini berputar atau memanggil AI untuk sekadar membacakan bantuan. Audio naskah disetujui editorial dan disimpan dalam source control; tidak perlu live generative text untuk TTS.

## Urutan perubahan aman
1. Cek kode seluruh route+form dinas; screenshot baseline & smoke tests.
2. Buat PR token/layout tanpa business logic; uji.
3. PR desain publik; uji form/ticket/track.
4. PR voice TTS/UX dengan feature flag; unit test + real device.
5. PR STT **staging dengan teks fiktif saja**; privacy gate sebelum produksi.
6. PR dashboard dan form dinas; audit export+role.
7. Sign-off visual dan semua regression; deploy hanya setelah otorisasi, dengan rollback commit.

## Jangan klaim
"Voice pasti berbahasa Indonesia di semua perangkat", "rekaman hanya di perangkat", "Form Firebase sudah aman" atau "semua fitur selesai" tanpa evidence. Jika Voice Indonesia tidak tersedia, produk tetap bekerja via teks; ini memenuhi fallback desain, bukan fitur suara yang bekerja penuh di perangkat itu.
