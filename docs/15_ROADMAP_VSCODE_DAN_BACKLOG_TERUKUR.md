# 15 — ROADMAP EKSEKUSI VS CODE, SPRINT, DAN DELIVERABLE TERUKUR

## Prinsip WBS

Setiap story harus berisi `ID`, deskripsi, owner, prasyarat, estimasi jam/story points, file/module, test ID, screenshot/staging URL, risiko dan acceptance. Developer wajib memperlihatkan perbedaan baseline masterplan vs implementasi pada setiap review. Jangan menggunakan abstraksi 'fitur selesai' tanpa bukti E2E.

## G0: Fondasi dan otorisasi — minggu indikatif 1–2

**Input:** masterplan, SOP aktual, SK/peran, katalog kategori, kewenangan, pengelolaan data. **Pekerjaan:** audit gap, katalog layanan, desain akses, SOP digital, DPIA awal, data inventory, ADR Spark vs Blaze, keputusan storage dan backup, scope aset brand. **Output:** requirements matrix, routing table 17/17, state machine final, protokol perubahan. **Gate:** sign-off owner; K16/ULD diberi status valid/hold.

## G1: Core platform — minggu indikatif 3–6

| Story | Komponen | Bukti |
|---|---|---|
| CORE-01 | skeleton frontend, routing, design system | desktop/mobile screenshot dan keyboard test |
| CORE-02 | Firebase Auth staf + MFA | authentication denied, no role self-assign |
| CORE-03 | case schema + security + migration | fixture data + schema tests |
| CORE-04 | form API idempotent + ticket/token | TC-001/003/018 |
| CORE-05 | role ABAC case list/detail | TC-002/011/027 |
| CORE-06 | state machine/assignment/audit | TC-010/012/019/022 |
| CORE-07 | dashboard KPI + pagination | counts match ledger, no full scan |
| CORE-08 | child/disability/emergency | TC-013/014/015 |

**Gate:** form→ticket→assigned→timeline→review→closed E2E di staging dengan data sintetis; role negatif semua lolos.

## G2: Kirimdev WhatsApp — minggu indikatif 7–9

Konfirmasi vendor pemerintah/kontrak dahulu; implementasi HMAC, verified webhook, durable job, idempotency, grouping, outbox, status dan retry; admin dashboard koneksi dan error queue. **Bukti:** TC-004–008/020 termasuk 1 event ×10 replay, worker failure, API mock vendor. Tidak membuat bot WhatsApp Web tidak resmi.

## G3: AI adapter terkontrol — minggu indikatif 10–11

Implement `NullAdapter`, `FakeAdapter`, `GeminiAdapter` (Gemini only approved contract) dan JSON Schema validator, risk/sanitize/policy gate, metrics + budget guard. Dataset 300 sintetis dan confusion matrix; fail gate → `AI_ENABLED=false` tanpa menghambat core. Developer tidak perlu membangun AI multi-agent atau chatbot publik.

## G4: QA, a11y, keamanan, pemulihan — minggu indikatif 12–14

Audit WCAG 2.2 AA, OWASP/permission tests, stress 500/3.000 kasus, simulasi offline, restore drill lengkap, cost reconciliation, SOP petugas, pelatihan 17 kategori. Perbaiki semua P0. **Gate:** berita acara UAT dan security+DR sign-off.

## G5: soft launch — minggu indikatif 15–16

Traffic terbatas, monitoring p95, biaya aktual, ketepatan routing, penggunaan privacy modes dan feedback. Rilis bertahap per kategori hanya bila semua 17 kategori telah terkonfigurasi secara benar dan sistem inti aman. Peningkatan pasca-rilis dengan feature flag, rollback, versioned schema.

## Estimasi beban kerja baseline (bukan penawaran/HPS)

Discovery 18–30 jam; UX 30–50; core backend+DB 70–110; role/routing 40–65; dashboard 30–50; QA/security 45–75; deployment/docs/training 20–35; WA tambahan 40–80; AI tambahan 25–45; integration testing tambahan 20–35. Estimasi perlu dikalibrasi tim dan pemilik produk; bukan jaminan durasi otomatis.

## Konvensi coding dan struktur repository

- Setiap PR kecil memiliki link requirement/test ID. CI menjalankan lint, typecheck, unit, integration, E2E smoke, secret scanning.
- Hindari log raw payload; gunakan structured logs dengan request ID.
- JSON schema dan enums ditaruh `packages/contracts`, digunakan frontend/backend untuk mencegah drift.
- Cache/aggregation update saat event status, bukan dashboard membaca seluruh Firestore setiap detik.
- Indeks Firestore deklaratif berdasarkan query terukur; query pagination cursor limit 20–30 awal.
- Perubahan rules/privacy perlu review berbeda dari penulis kode bila memungkinkan.
- Data fixtures fiktif di `tests/fixtures`; tidak boleh clone database produksi ke developer laptop tanpa izin dan kontrol.

## Template setiap PR

```md
### Identitas
PR ID / Requirement IDs / Owner / Referensi ADR
### Apa yang berubah
Modul, migration, kontrak API, UI state
### Bukti
Screenshot mobile+desktop, unit/E2E, security negative, a11y
### Risiko/rollback
Potential regressions, versioning, cost impact, rollback steps
### Checklist
[ ] P0 tidak dipangkas [ ] fixture sintetis [ ] docs updated
[ ] no secrets/PII [ ] reviewer approval
```
