# 10 — AI ADAPTER: SMART CLASSIFICATION, SUMMARY, ALERT DAN GATE

## Kegunaan tiga keluaran dalam satu proses

1. **Classification:** usulan K01–K17/UNKNOWN, subkategori/tags, kategori alternatif jika ambigu. Tidak mengubah owner langsung.
2. **Summary:** narasi netral berdasarkan sumber, bedakan 'pelapor menyatakan' dari 'terbukti'. Jangan mengarang sekolah, tanggal, nilai rupiah, NIK atau identitas korban.
3. **Alert:** usulan flag kekerasan, ancaman bangunan, pembalasan, anak, konflik kepentingan, disabilitas. Deterministic safety rules tetap bekerja meskipun AI mati.

## Default dan gerbang aktivasi

`AI_ENABLED=false` pada produksi sampai penyedia, ruang lingkup aplikasi, syarat usia, dasar pemrosesan, lokasi, retensi, perjanjian dan mutu hasil disetujui secara tertulis. Gemini Free Tier hanya digunakan untuk data sintetis/non-sensitif yang memenuhi ketentuan; **jangan mengirim pengaduan nyata dengan alasan menganggap privasi tidak penting**. Google membatasi aplikasi yang ditujukan/mungkin diakses anak; sekadar checkbox 18+ atau backend-only bukan persetujuan otomatis. Jika tidak disetujui, AI tetap OFF, sistem menggunakan rules + petugas.

## Kontrak adapter

```ts
type Suggestion = {
 schema_version: 1;
 suggested_category: 'K01' | 'K02' | /* ... */ 'K17' | 'UNKNOWN';
 secondary_category_tags: string[];
 summary: string; // maximum length; evidence-bound
 source_evidence_spans: string[];
 missing_information: string[];
 risk_flags: string[];
 requires_human_review: boolean;
 unknown_fields: string[];
};
```

Validator: enum valid, panjang output maksimum, PII tidak bocor, kutipan mendukung klaim, field wajib ada, request id/model/prompt version dicatat. AI hasil disimpan `ai_runs` sebagai proposal saja; `verified_summary` hanya ketika petugas setuju. Prompt injection dari pesan/bukti selalu dianggap data dan tidak dapat memerintah routing, membuka kasus, atau mengubah settings.

## Kebijakan pemanggilan

```text
persist(ticket)
run deterministic safety checks → alert manusia segera bila kritis
if !AI_ENABLED or !contract_ok or !data_ok: return RULES_ONLY
sanitize/minimize; jika masih sensitif/tidak eligible → HUMAN_REVIEW
use single bounded call and typed output
validate schema and evidence → store proposal
rules engine final mapping → operator per kewenangan
```

Jangan rotasi banyak API key/proyek untuk menghindari kuota. 429, timeout, dan kesalahan schema → antrean pusat; jangan retriable loop tanpa batas. Batasi satu analisis per versi kronologi (hash + model/prompt version), metering token per model/masa, anggaran maksimum dan kill switch AI-only.

## Evaluasi mutu

Dataset sintetis awal ≥300: 170 kasus satu kategori (10 per K01–K17), 80 kasus multi-isu/sensitif, ≥50 typo/bahasa sehari-hari/Bugis/ambiguous. Label emas diperiksa minimal dua penilai untuk sampel konflik. Pisahkan prompt tuning dari held-out evaluation.

Ambang **usulan untuk disahkan**: macro F1 ≥0,85, per kategori F1 ≥0,75, 100% drill kritis dikenali minimum oleh deterministic rules, 0 kebocoran PII pada sampel, ≥99% ringkasan tanpa klaim baru. Catat false negative, confusion matrix, human corrections dan regression. Angka itu bukan hasil yang sudah dicapai.

## Implementasi demo vs produksi

Demo `js/app.js` memakai fungsi `demoAnalyze()` yang membuat keluaran deterministik di browser (tidak ada Gemini). `AI_ENABLED` pada UI simulasi bukan flag produksi dan tidak membuka izin memproses data nyata. Untuk pengembangan produksi, buat interface provider `GeminiAdapter`, `NullAdapter`, `FakeAdapter` dengan tes contract yang sama, simpan secret server-side. Tidak ada secret di frontend atau dalam ZIP.
