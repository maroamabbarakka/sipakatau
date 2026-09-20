# 08 — UX audio/voice, persetujuan, privasi, dan pembatasan konten
## Komponen wajib
`AudioGuideButton`: "Dengarkan penjelasan" dengan ikon speaker; saat memutar menjadi "Jeda" dan "Berhenti". `AudioGuidePanel`: naskah yang sama dapat dibaca/dibuka tanpa suara + opsi kecepatan. `VoiceInputButton`: "Ceritakan dengan suara" dengan label yang berubah sesuai state. `TranscriptReview`: hasil transkrip hanya draf, tombol edit, hapus, gunakan teks. `SpeechStatus` mengumumkan status **singkat** via aria-live polite; error via role=alert.

## Urutan interaksi ideal
Audio guide: tekan → cek suara Indonesia → tampilan teks tersedia → baca naskah kurasi dengan jeda semantik → tombol stop/jeda/ulang. Jika output device dimute atau voice Indonesia tak tersedia, tampilkan teks, bukan voice Inggris.
Dikte: tekan "Ceritakan dengan suara" → jelaskan secara singkat bahwa browser dapat memproses audio di luar aplikasi → konfirmasi → browser minta izin mic → status mendengarkan/visual waveform dekoratif (bukan rekaman waveform data audio) → hentikan → tinjau teks/edit → terapkan ke kronologi, **tidak mengirim laporan** → submit lewat tombol form normal.

## Hal yang TIDAK BOLEH ada
- Mic aktif saat loading, hover, scroll, auto-open, atau tombol mendengar penjelasan.
- Mengirim audio, transkrip mentah, NIK, nama anak, token tracking, atau kronologi ke analytics/Gemini tanpa kebijakan yang sah.
- TTS membacakan nomor tiket/kode rahasia/identitas pengguna secara otomatis di ruang umum.
- Klaim "semua suara diproses hanya pada ponsel" tanpa bukti browser-specific.
- Auto restart STT setelah `onend` tanpa instruksi user; dapat menimbulkan perekaman tak disadari.
- Merekam dan menyimpan audio asli atas nama kebutuhan voice input tanpa persetujuan dan tata kelola arsip.

## Persetujuan dan copy UI
"Fitur ini memakai pengenalan suara dari browser Anda. Pada beberapa browser, suara dapat diproses oleh penyedia layanan browser. Jangan gunakan jika tidak nyaman menyampaikan informasi dengan suara; Anda selalu dapat mengetik. Hasilnya akan muncul sebagai teks untuk Anda periksa sebelum dikirim."
Tombol: "Lanjutkan ke mikrofon" / "Saya memilih mengetik". Jangan pakai checkbox wajib yang menghalangi laporan manual.

## Konteks laporan sensitif
Saat kasus kekerasan, identitas anak, kesehatan atau disabilitas: tampilkan pengingat "Jika berada di tempat ramai, gunakan mengetik agar percakapan Anda tidak terdengar orang lain". Tidak otomatis membaca konteks kasus. Jika standar instansi melarang layanan STT browser eksternal untuk data nyata: tombol dikte NONAKTIF untuk produksi; TTS naskah generik boleh dinilai terpisah tanpa mengirim data kasus.

## Aksesibilitas dan kegagalan
Kontrol punya aria-label dengan kata kerja, fokus terlihat, ukuran >=48x48, indikator recording bukan hanya titik merah, status "Mikrofon sedang aktif" muncul teks. Jika izin ditolak, fokus ke peringatan dan textarea. `visibilitychange` abort voice; jika halaman tersembunyi suara TTS cancel bila kebijakan user menghendaki. Keyboard Space/Enter berfungsi, Esc stop voice, tidak merebut shortcut screen-reader.
