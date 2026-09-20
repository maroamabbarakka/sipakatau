# 14 — MATRIKS UJI FUNGSIONAL, INTEGRASI, KEAMANAN, DAN UI/UX

## Jenis bukti per test

Setiap skenario memperoleh ID, prasyarat, langkah, expected result, actual result, screenshot/video/log tersanitasi, environment, browser, severity, tester, dan status PASS/FAIL/BLOCKED. Pada test produksi, bukti visual saja tidak menggantikan API negative tests atau restore. Gunakan **data sintetis** sepanjang tes; sampel data nyata hanya bila dasar legal dan kontrol keamanan telah disetujui.

## 30 test baseline masterplan

| Test ID | Tahapan uji | Expected result |
|---|---|---|
| TC-001 | Form tanpa NIK, isi K01, submit | tiket unik + token, persist, status benar |
| TC-002 | Protected + data WA | operator kategori tidak menerima nomor dalam API |
| TC-003 | NO_ID_FORM tanpa WA | hanya token dan case; nomor WA tidak diwajibkan |
| TC-004 | 12 WA message yang relevan | pesan tetap terhubung ke 1 kasus terkonfirmasi |
| TC-005 | replay event ID sama 10x | 1 intake logical dan 1 tiket |
| TC-006 | delivery status | hanya outbox berubah, 0 tiket baru |
| TC-007 | signature salah atau stale | 401, 0 kasus sah |
| TC-008 | database mati sebelum persist | webhook gagal dan retry aman |
| TC-009 | Gemini disabled/429/timeout | tiket+triase tetap berfungsi |
| TC-010 | masukkan 17 contoh kategori | 17/17 route benar |
| TC-011 | operator K01 paksa URL/API K02 | 403/404, tidak ada data kasus bocor |
| TC-012 | terlapor adalah operator tujuan | alternatif berwenang, bukan terlapor |
| TC-013 | anak dalam bahaya | jalur aman tanpa blokir 18+/AI |
| TC-014 | atap hampir runtuh | rule urgency + human notification |
| TC-015 | disabilitas + bullying | satu case dengan tags dan special owner |
| TC-016 | executable menyamar PDF | backend reject/quarantine |
| TC-017 | nama anak dalam summary | redact sebelum akses yang tidak berwenang |
| TC-018 | nomor tiket tanpa token | status privat tidak terlihat |
| TC-019 | illegal transition/stale case version | 409 + audit utuh |
| TC-020 | WA send failed/replayed | pending alarm, tak ada double send |
| TC-021 | owner cuti/deadline | backup/escalation dan record history |
| TC-022 | ganti operator K03 | route versi baru, case lama tetap terlacak |
| TC-023 | load 500/3.000 case | p95 sesuai SLO yang disetujui |
| TC-024 | restore drill | seluruh collection+object+vault konsisten |
| TC-025 | mobile, keyboard, screen reader | formulir/track lengkap tanpa mouse |
| TC-026 | cost guard AI 100% | hanya AI OFF, intake tetap ON |
| TC-027 | pimpinan baca statistik sensitif | agregasi aman, raw child data tak terlihat |
| TC-028 | sekolah belum terverifikasi | tidak mengarang NPSN |
| TC-029 | input prompt injection | route, policy dan secrets tidak berubah |
| TC-030 | ledger dibanding counter | KPI kasus unik dan pesan konsisten |

## UI coverage tambahan

| UAT ID | Pengujian | Expected |
|---|---|---|
| UX-001 | hero mobile 390×844 | CTA jelas, tak overflow |
| UX-002 | formulir 4 langkah; tombol kembali | draft tersimpan dan tidak hilang |
| UX-003 | UNKNOWN category | boleh lanjut dan tiket pusat |
| UX-004 | emergency dengan narasi singkat | diterima ke jalur aman |
| UX-005 | anonim lalu ganti protected | field yang tidak perlu tak terbawa |
| UX-006 | token salah/ticket benar | respons generik |
| UX-007 | keberatan atas tiket | tiket baru mengacu parent |
| UX-008 | role PIMPINAN | hanya route aggregator di menu |
| UX-009 | role SUPER_ADMIN | kategori, biaya, settings, audit, bukan raw case |
| UX-010 | role OPERATOR_KATEGORI K03 | K10 tidak muncul dan deep-link ditolak |
| UX-011 | ganti operator K03 | setting disimpan, audit event tercatat |
| UX-012 | filter status/kategori/channel | hasil dan pagination benar |
| UX-013 | pencarian kosong | empty state dan reset filter |
| UX-014 | detail tab 7 | semua isi berbeda dan relevan |
| UX-015 | forbidden transition | peringatan dan status tidak berubah |
| UX-016 | input WA dua pesan | pertambahan pesan, bukan duplikasi kasus |
| UX-017 | replay/delivery | idempotent dan status outbox |
| UX-018 | AI mode OFF/ON demo | label simulasi jelas; AI OFF tidak ganggu laporan |
| UX-019 | cost edit/reset/export | formula berubah, CSV unduh |
| UX-020 | backup check | teks 'simulasi' tak dianggap backup produksi |
| UX-021 | reset dataset | perubahan lokal kembali awal |
| UX-022 | 200% zoom/reduced motion | semua aksi dapat diakses |

## Minimal browser matrix

Chrome/Edge desktop terbaru, Firefox desktop, Safari iOS terbaru, Chrome Android; viewport 390×844, 768×1024, 1440×900, 1920×1080. Uji tanpa koneksi (intake produksi harus memberi status yang jujur), slow 3G, upload berat, keyboard-only, screen reader NVDA/TalkBack dan pembesaran. Isi kegagalan API dinyatakan jelas tanpa membocorkan data dan terdapat retry aman.

## Quality gates (go/no-go)

P0 = 100% PASS, tidak ada bug keamanan critical/high yang belum ditangani, uji backup restore PASS, penempatan data/vendor disetujui, a11y audit diterima, 17 routing pass, 0 kehilangan event pada test deterministik. P1 boleh ditunda **hanya dengan change request** yang ditandatangani dan jelas mitigasinya. Hasil AI memiliki gate terpisah: jika gagal legal/data/quality, AI nonaktif tetapi core tetap dapat go-live setelah seluruh gate lainnya lulus.
