# 17 — Roadmap, risiko, sumber, checklist handoff
## Gerbang bertahap (estimasi relatif, bukan janji durasi)
| Gate | Output yang harus diperiksa | Syarat lanjut |
|---|---|---|
| G0 audit | source inventory, screenshot, baseline tests, risk | owner approve |
| G1 design tokens | design system + 3 logo & 320/1440 mockup | visual approval |
| G2 publik | home, 17 kategori grouped, help, tracking | E2E publik |
| G3 form | wizard empat langkah, privasi, state | 100% regresi kritis |
| G4 audio | naskah editorial + TTS id-ID real device | voice language proof |
| G5 STT | consent + transcript review staging | privacy+device gate |
| G6 form dinas | 5 bagian, export & cloud status | 17/17 category QA |
| G7 staff | 5 role, inbox, cases, cost & audit | auth/regression |
| G8 release | accessibility, performance, rollback | owner signoff |

## Risiko yang harus dicatat
Voice id-ID belum tersedia, STT browser mengirim audio ke layanan eksternal, naskah salah menerangkan SOP, posisi 3 logo buruk pada 320px, image terlalu berat, lintas kategori terhapus, form dinas ganda sumber state, CSS override berkonflik, layar sukses palsu, clipboard token, dan fiturnya menuntut billing baru. Untuk masing-masing: issue severity/owner/mitigasi/test.

## Sumber & batas verifikasi
Repo: https://github.com/maroamabbarakka/sipakatau (pembacaan 21 September 2026, harus recheck SHA saat implementasi). Referensi pengalaman SAPA: https://laporsapa129.kemenpppa.go.id/ dan https://laporsapa129.kemenpppa.go.id/lapor. Speech: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API dan https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition serta https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event. A11y: https://www.w3.org/TR/WCAG22/. Instruksi ini bukan pengesahan kebijakan, lisensi vendor, lokasi data ataupun voice STT produksi.

## Format laporan serah terima
```
Release: v2.x / SHA:
Tautan PR:
File yang diubah:
Fitur dipertahankan:
Fitur ditunda + alasan persetujuan:
Hasil QA PASS/FAIL/NOT_TESTED:
Daftar browser/voice id-ID:
Screenshot before/after:
Asset inventory & ukuran:
Privacy and legal gates:
Rollback command tested:
Persetujuan owner:
```

## Antisipasi kendala unduh
Selain ZIP, `README.md` dan `docs/16_PROMPT...md` tersedia sebagai file langsung di paket. Setelah ZIP berhasil disalin ke repo, simpan commit di GitHub agar akses tidak bergantung pada link lampiran chat. Link sandbox baru dapat ditawarkan hanya setelah berkas dibuat dan diverifikasi di runtime saat itu.
