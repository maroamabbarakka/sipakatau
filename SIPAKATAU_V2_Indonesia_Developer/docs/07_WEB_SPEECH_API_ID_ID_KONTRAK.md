# 07 — Kontrak Web Speech API Bahasa Indonesia (`id-ID`)
## Dua fitur yang BERBEDA
- **TTS/panduan suara:** `speechSynthesis`, input naskah statis bahasa Indonesia yang diedit manusia, output suara Indonesia jika benar-benar tersedia di browser/perangkat.
- **STT/dikte:** `SpeechRecognition` atau `webkitSpeechRecognition`, `lang='id-ID'`, hasil teks draf untuk dikoreksi; bukan audio recorder / penyimpan audio mentah.
Ketersediaan TTS, bahasa dalam daftar voice, dan dukungan STT berbeda per browser/perangkat. Set `utterance.lang='id-ID'` saja **tidak menjamin** pengucapan Indonesia; pilihan suara dan audit QA tetap wajib. STT dapat menggunakan layanan jarak jauh browser; HTTPS tidak menjamin audio lokal.

## Runtime TTS: pemilihan voice wajib
1. Feature detect `window.speechSynthesis` dan `SpeechSynthesisUtterance`; bila tidak ada, teks panduan tetap bisa dibaca.
2. `getVoices()` bisa kosong saat pertama dipanggil; subscribe `voiceschanged`, refresh ketika user menekan tombol. Jangan timer polling tak berakhir.
3. Filter `voice.lang` dengan regex `^id(?:-|$)` case-insensitive; prioritaskan `id-ID` dan voice yang dipilih pengguna (bila sebelumnya disimpan **hanya nama voice**, bukan data sensitif). Jangan pilih `en-US` atau bahasa Melayu hanya agar tombol bekerja.
4. Jika 0 voice Indonesia tersedia: state `NO_INDONESIAN_VOICE`, sembunyikan/hentikan TTS dan tampilkan naskah bantuan yang sama. Jangan mengklaim "audio Indonesia siap".
5. TTS hanya setelah `click`; set `utterance.lang='id-ID'`, voice yang lolos filter, rate awal 0.94–1.0 (opsi user 0.85–1.15), pitch 1, volume 1; tes pengucapan Pinrang/PAUD/NISN/BOSP dan hindari ejaan singkatan keliru lewat naskah.
6. `cancel()` sebelum audio baru; `pause/resume/stop`; tangani `onend`, `onerror` dan perubahan route/tab/visibility. Jangan auto-speak per navigasi atau autoplay. Jangan membacakan isi kronologi, token dan data privat.
7. State TTS: `UNSUPPORTED`, `LOADING_VOICES`, `NO_INDONESIAN_VOICE`, `READY`, `SPEAKING`, `PAUSED`, `DONE`, `ERROR`.

## Runtime STT: guard privacy + izin
1. Feature detect constructor; cek konteks aman HTTPS/localhost dan browser sasaran. Tampilkan informasi **sebelum mikrofon aktif**: fitur pengenalan suara bergantung pada browser dan pada beberapa implementasi dapat memproses suara melalui penyedia eksternal; gunakan ketik bila tidak berkenan.
2. User setuju dan klik langsung pada tindakan yang memulai `recognition.start()`; `lang='id-ID'`, `continuous=false`, `interimResults=true` hanya untuk tampilan ephemeral, `maxAlternatives=1`.
3. Hasil `isFinal` disimpan ke buffer transkrip **sementara**. Interim tidak disimpan, tidak dikirim ke Firebase/localStorage/analytics. Tekan "Gunakan teks ini" untuk menyalin teks hasil tinjauan ke textarea.
4. Batasi satu sesi, tombol berhenti eksplisit, `stop()`/`abort()` saat keluar halaman, tangani event `onstart`,`onresult`,`onerror`,`onend` tanpa auto-restart tak terbatas.
5. Jangan berjalan berbarengan dengan TTS; memulai dikte otomatis menghentikan TTS dan sebaliknya. Tidak ada unggah atau penyimpanan suara mentah kecuali proyek dan kebijakan berubah lewat persetujuan.
6. STT state: `UNSUPPORTED`, `CONSENT_REQUIRED`, `READY`, `REQUESTING_PERMISSION`, `LISTENING`, `TRANSCRIBING`, `REVIEW`, `ERROR`, `STOPPED`.

## Kode contoh
- `../examples/voice-guide.mjs`: pemilihan voice Indonesia + naskah terpandu, aman bila voice tak tersedia.
- `../examples/voice-dictation.mjs`: adapter browser dasar, hasil final buffer dan explicit `useTranscript`.
- `../examples/audio-guide-catalog.mjs`: konten statis kurasi, tidak ada penyisipan isi laporan.
- `../qa/voice-tests.mjs`: unit test eksplisit untuk pemilihan bahasa/penyaringan voice.
Kode contoh **belum diintegrasikan** ke kode pengguna atau dibuktikan pada perangkat nyata. Integrator wajib menyelaraskan dengan router dan re-render `js/app.js` (referensi event handler bisa hilang setelah DOM diganti).

## Uji perangkat wajib
Chrome Android, Edge Windows, Chrome desktop, Safari iPhone bila tersedia, Firefox desktop, dan browser bawaan ponsel yang digunakan pegawai; untuk masing-masing catat versi OS/browser, daftar voice, id-ID available Y/N, STT Y/N, izin mic, akurasi dan fallback. Jika voice id-ID ada tetapi salah mengucapkan istilah, koreksi naskah atau gunakan rekaman Indonesia disetujui; jangan sebut API menjamin kualitas suara.

## Rujukan teknis primer
- MDN Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- MDN voiceschanged: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event
- MDN SpeechRecognition: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
- MDN Using Web Speech: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
- WCAG 2.2 audio controls: https://www.w3.org/TR/WCAG22/#audio-control
