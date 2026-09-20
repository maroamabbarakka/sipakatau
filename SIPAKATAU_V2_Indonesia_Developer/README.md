# SIPAKATAU — Paket arahan UI/UX V2.1, Audio & Voice Bahasa Indonesia

**Untuk developer VS Code / Antigravity.** Dibuat 21 September 2026 dari audit baca repo `maroamabbarakka/sipakatau` dan prinsip interaksi SAPA 129. Belum memodifikasi repository asli, belum melakukan deploy, belum memverifikasi browser HP nyata, dan bukan persetujuan penggunaan STT browser pada laporan sensitif.

## Buka terlebih dahulu
1. `docs/00_MULAI_DI_SINI.md` — kontrak lengkap.
2. `docs/01_AUDIT_REPO_DAN_BATAS_PERUBAHAN.md` — file, baseline dan kontrol regresi.
3. `docs/16_PROMPT_VSCODE_AGENT_SIAP_TEMPEL.md` — instruksi lengkap untuk agen, dimulai READ-ONLY.
4. `docs/07_WEB_SPEECH_API_ID_ID_KONTRAK.md` dan `docs/09_NASKAH_AUDIO_BAHASA_INDONESIA.md` — penerapan bahasa Indonesia dan naskah yang menjelaskan konteks.

## Isi ZIP
- `docs/00..17`: 18 file spesifikasi Markdown terarah dan terukur.
- `assets/illustrations`: moodboard dan empat ilustrasi bertema layanan pendidikan/voice/inklusif/routing dalam PNG+WebP.
- `assets/icons`: 12 ikon SVG mandiri. Logo institusi tetap diambil dari repo asli; **bukan** dari aset generatif.
- `examples/`: modul JavaScript ES Module sebagai starting point TTS dan STT + katalog contoh.
- `qa/`: unit test pemilihan suara id-ID dan manifest hasil verifikasi paket.

## Jalankan contoh unit test
```bash
node qa/voice-tests.mjs
```
Contoh modul belum terhubung ke frontend yang dimiliki pengguna. Integrasi harus dilakukan developer setelah menyelesaikan audit & persetujuan plan. **Tidak ada API key, data warga, atau perubahan repo asli di ZIP ini.**

## Kebijakan bahasa & fallback
TTS hanya mengucapkan naskah Bahasa Indonesia yang ditinjau secara editorial. Set `lang=id-ID`, pilih voice yang memang memiliki `voice.lang=id-ID` atau locale Indonesia, tunggu `voiceschanged`; jika tidak ada suara Indonesia, baca teks bantuan. STT `lang=id-ID` hanya jika browser mendukung dan pengguna menerima penjelasan pemrosesan browser; hasilnya bisa diedit, tidak auto-submit, voice/STT tidak dapat berjalan bersamaan. STT produksi default **OFF** menunggu penilaian privasi.

## Akses file bila link chat bermasalah
Setelah berhasil diperoleh, simpan paket ini ke repo GitHub dalam direktori dokumentasi baru; jangan mengandalkan unduhan chat sebagai arsip permanen. Verifikasi manifest dan ukuran arsip pada QA; klik link sandbox hanya bila file bisa dijangkau di UI Anda.
