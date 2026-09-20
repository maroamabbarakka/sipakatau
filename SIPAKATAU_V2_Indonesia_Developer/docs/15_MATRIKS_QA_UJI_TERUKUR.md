# 15 — Matriks QA lengkap: visual, voice, fungsional, keamanan demo
Simpan hasil per testcase: tanggal, commit SHA, perangkat+browser+versi, pass/fail, screenshot/video, bukti console, issue ID; `NOT TESTED` tidak boleh dianggap PASS. Data semuanya sintetis.

| ID | Pengujian | Expected result |
|---|---|---|
| VIS-01 | 320px beranda | tidak overflow; CTA tampak dan fungsi |
| VIS-02 | 390px beranda | hero CTA di atas visual panjang |
| VIS-03 | 768/1440 hero | visual tidak memotong wajah atau logo |
| VIS-04 | 200% zoom | menu, form, CTA tetap dapat digunakan |
| VIS-05 | logo 3 jenis | SIPAKATAU, Pinrang, Dikbud terlihat utuh |
| VIS-06 | all routes | no blank page, no console exception |
| VIS-07 | font 320 | body≥16px, label≥16, helper≥14 |
| VIS-08 | keyboard only | focus, menu, wizard, modal valid |
| VIS-09 | reduced motion | reveal/parallax tidak aktif, konten visible |
| VIS-10 | images offline | alt/fallback, layout tidak lompat |
| PUB-01 | 17 categories | semua ada, ID/routing sama baseline |
| PUB-02 | UNKNOWN category | bisa submit, antrean pusat |
| PUB-03 | step flow | 4 langkah maju-mundur tanpa data hilang |
| PUB-04 | NIK kosong | laporan umum tidak terhalang |
| PUB-05 | protected privacy | pilihan tersimpan dan UI menjelaskan |
| PUB-06 | NO_ID_FORM | tidak dipaksa nama/WA |
| PUB-07 | kasus anak/urgent | jalur prioritas tanpa menunggu AI |
| PUB-08 | submit dua klik | tiket tidak ganda pada sistem nyata |
| PUB-09 | ticket only | tidak membuka rincian tanpa token |
| PUB-10 | lost token | tidak dibuka lewat tebakan tiket |
| PUB-11 | jaringan putus | tidak klaim sukses palsu |
| PUB-12 | AI disabled | intake/routing tetap jalan |
| WA-01 | webhook replay | event sama sekali diproses satu kali |
| WA-02 | outbound failed | status pending, laporan tidak hilang |
| STAFF-01 | role matrix | seluruh role scoped sesuai baseline |
| STAFF-02 | PIMPINAN | agregat, raw restricted by policy |
| STAFF-03 | operator cross category | gagal via API, bukan CSS saja |
| STAFF-04 | status transitions | guards + audit utuh |
| STAFF-05 | filters pagination | angka sama dengan data |
| STAFF-06 | cost calculator | hasil formula sama baseline |
| DIN-01 | 5 sections | label sederhana dan progres benar |
| DIN-02 | 17 categories | status/rename/admin/email/WA tersimpan |
| DIN-03 | WA belum tersedia | tidak memaksa nomor fiktif |
| DIN-04 | usulan kategori baru | tidak menimpa 17 ID |
| DIN-05 | ekspor JSON CSV/XLSX | isi lengkap, formula injection dicegah |
| DIN-06 | cloud off | tidak tampil klaim tersimpan ke server |
| DIN-07 | login unauthorized | tidak dapat membaca isian orang lain |
| VOI-01 | no synthesis | naskah teks terlihat |
| VOI-02 | getVoices kosong lalu update | voiceschanged refresh |
| VOI-03 | hanya en-US tersedia | NO_INDONESIAN_VOICE, tidak bersuara Inggris |
| VOI-04 | id-ID tersedia | benar memilih Indonesian voice |
| VOI-05 | user click only | no autoplay on load/route/hover |
| VOI-06 | stop pause repeat | tombol benar-benar bekerja |
| VOI-07 | speech on route leave | TTS cancel, STT abort |
| VOI-08 | STT unsupported | mengetik tetap dapat dipakai |
| VOI-09 | mic permission denied | error manusiawi, fokus ke textarea |
| VOI-10 | speech recognition language | recognition.lang benar `id-ID` |
| VOI-11 | privacy consent denied | tidak start mic |
| VOI-12 | interim vs final | interim tidak tersimpan/submit |
| VOI-13 | transkrip salah | koreksi, "Gunakan teks", tidak auto-submit |
| VOI-14 | simultaneous audio | mulai STT hentikan TTS |
| VOI-15 | sensitive data | tidak auto baca/simpan audio raw |
| VOI-16 | Safari/Android real device | record compatibility; fallback bila gagal |
| SEC-01 | URL/console analytics | tidak bocor identitas/token |
| SEC-02 | input JS/script | render escaped, tidak dieksekusi |
| SEC-03 | logo assets | tidak ada logo AI palsu |
| SEC-04 | offline/reconnect | draft/submit status akurat |
| REL-01 | snapshot diff | tidak ada halaman/fitur terhapus |
| REL-02 | backup/rollback | baseline bisa dipulihkan |

## Gate release
Seluruh P0 di atas PASS atau status blocker dengan sign-off penghentian rilis; setiap route dan peran memiliki screenshot 360 + 1440. Voice STT boleh OFF jika kebijakan belum tuntas, namun tombol tidak boleh tampak berfungsi palsu. Uji keamanan produksi dan restore berada di luar QA demo ini dan tetap wajib tersendiri.
