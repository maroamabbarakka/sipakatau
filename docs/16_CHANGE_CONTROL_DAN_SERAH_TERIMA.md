# 16 — CHANGE CONTROL, DEFINITION OF DONE DAN SERAH TERIMA

## Kontrak anti-pemangkasan

Developer tidak boleh menghapus, menggabungkan, menyederhanakan secara merugikan, mengganti teknologi penting, atau menunda requirement P0 tanpa persetujuan tertulis pemilik proyek. Menyatakan 'terlalu rumit' bukan keputusan perubahan. Untuk setiap usulan gunakan formulir CR berikut.

```md
CR-ID: CR-YYYY-NNN
Pengusul / tanggal:
Requirement yang terdampak: RQ-xxx, TC-xxx, UX-xxx
Kondisi sekarang:
Perubahan yang diminta:
Alasan dan alternatif:
Dampak pada warga, anak, disabilitas, privacy, hak akses:
Dampak biaya bulanan / initial / target jadwal:
Data schema, API, UI dan migration yang berubah:
Risiko regresi dan rencana rollback:
Acceptance test tambahan/diperbarui:
Keputusan: APPROVED / REJECTED / NEEDS_REVISION
Persetujuan pemilik dan penanggung jawab keamanan bila relevan:
```

Tidak boleh mengganti dua kanal dengan form saja, mengurangi 17 kategori, menghapus jalur anak, mengganti logo, memasukkan logo Pinrang, menyebut AI Free Tier aman untuk data nyata tanpa review, atau mengganti backup teruji dengan ekspor JSON tanpa uji restore.

## Definition of Done per fitur

Fitur selesai hanya jika (a) berjalan di staging, (b) validasi positif/negatif pass, (c) backend permissions pass, (d) exception/fallback pass, (e) audit no PII, (f) user journey mobile & accessibility teruji, (g) biaya dan resource impact terukur, (h) docs dan runbook diperbarui, (i) hasil disetujui owner. Screenshot cantik atau PR merge tidak cukup.

## Serah terima minimum

| Kelompok | Artefak |
|---|---|
| Kepemilikan | source private repo instansi, domain, nomor WABA, proyek Google/Firebase, kontrak Kirimdev |
| Arsitektur | ADR, diagram data, IAM map, threat model, inter-service identity |
| Data | data dictionary, migrasi, indeks, backup manifest, retensi |
| Kode | frontend/backend source, nonsecret `.env.example`, dependency/license inventory |
| API | OpenAPI, webhook signature spec, event schema, state transition contract |
| UX | Figma/HTML source editable, asset brand, mobile/desktop screenshots, accessibility report |
| QA | TC-001–030, UX-001–022, load, permission deny, restore drill, manual UAT |
| Operasi | deploy/rollback, monitors, alert, billing, incident, secret rotation, support on-call |
| Finance | actual vendor invoice/rate card, cost ledger, monthly forecast, threshold alarm |
| Keamanan | pentest report, DPIA/legal decisions, vendor DPA and data placement approvals |

## Acceptance sign-off

Owner layanan, perwakilan operator, developer lead, reviewer keamanan/data, dan pimpinan menandatangani bagian yang menjadi kewenangannya. Dokumentasi dilengkapi tanggal, versi, catatan isu tersisa, apakah isu memblokir go-live, rencana mitigasi, dan keputusan rilis/rollback.

## Pernyataan status demo

Paket ini **menyajikan simulasi UI/UX dan pedoman implementasi**, bukan bukti backend terhubung. Segala klaim Kirimdev, Gemini, Firestore, Cloudflare, authentication, backup, enkripsi, dan penempatan data produksi masih harus dibuktikan melalui konfigurasi, kontrak, test dan review instansi.
