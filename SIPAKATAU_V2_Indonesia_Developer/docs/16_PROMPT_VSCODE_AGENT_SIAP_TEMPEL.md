# 16 — Prompt pelaksanaan ketat untuk agen VS Code / Antigravity
Salin seluruh bagian **PROMPT** di bawah ke agen. Lengkapi branch/commit jika perlu.

---
## PROMPT
Anda adalah frontend engineer senior, interaction designer, accessibility specialist dan QA engineer. Kerjakan redesign repo `maroamabbarakka/sipakatau`, berpatokan dokumen `docs/00..17` dalam paket ini dan masterplan teknis repo. **Jangan menyimpulkan sendiri atau memangkas requirement.**

**BATAS OTORISASI:** Tahap pertama hanya audit READ-ONLY dan rencana implementasi; jangan mengubah source code, Firebase rules, secrets, production data atau melakukan deploy sebelum pemilik produk menyetujui rencana. Setelah disetujui, kerja di branch, PR per fase, rollback ready.

**KONTRAK BRAND:** Tetap tampilkan logo SIPAKATAU, Kabupaten Pinrang (`logo/pinrang.png`) dan Dikbud (`logo/dikbud.webp`) sesuai aset repo HEAD; dilarang mengganti/menghapus/memfilter resmi; gambar AI bukan sumber lambang. Adaptasi SAPA129 secara prinsip/layout/microinteraction, jangan salin aset pihak ketiga.

**FUNGSI UTUH:** dua kanal Kirimdev & form, K01–K17 + UNKNOWN, tiket/token, privacy modes, perlindungan anak dan disabilitas, WA simulated/integration sesuai mode, AI gate/fallback, lima role, inbox/cases/disposisi/SLA/laporan/cost/admin/audit/ekspor/form dinas. Jangan ubah database model, kategori ID, rules, routing logic atau kontrak ekspor hanya demi UI. Demo tetap ditandai simulasi.

**DESAIN:** Mobile-first 320/360/390/430/768/1024/1440; body 16–18px, controls ≥48px, editorial hero yang hangat, CTA Buat/Lacak dominan, ilustrasi pendidikan di `assets/illustrations`, SVG icon fitur; kontras WCAG 2.2 AA, `prefers-reduced-motion`, no overflow. Redesain landing, form masyarakat, tracking, seluruh dashboard role, form dinas; jangan hapus menu. Konsolidasikan CSS overrides menjadi token/komponen terdokumentasi.

**AUDIO:** Panduan TTS `id-ID` menggunakan teks hasil kurasi yang menambah arti, apa yang harus dilakukan, tips, bukan membaca seluruh DOM. Pilih `SpeechSynthesisVoice.lang` yang benar-benar Indonesia (exact id-ID atau locale id-*), tunggu voiceschanged; jika tidak ada, fallback TEKS, tidak boleh membaca Inggris. Audio start hanya via klik, pause/stop/replay, cancel route leave. Recognition `id-ID` feature-detect + consent browser/vendor + permission; final transcript editable, interim ephemeral, no auto-submit/no raw recording; text entry always works. STT produksi default OFF sampai privasi disetujui. Gunakan contoh `examples/*.mjs` hanya sebagai referensi, integrasikan sesuai router sebenarnya.

**WAJIB LAPOR PER FASE:** daftar file dibaca; screenshot baseline; peta route; perubahan file; apa yang tidak diubah; test IDs 15_MATRIKS...; viewport screenshots; user feedback; risiko dan blocker; commit SHA; CR bila perlu. Anda tidak boleh menyatakan seluruh UI siap sebelum test dan sign-off. Jangan menggunakan gambar poster AI dengan teks/logo tiruan sebagai UI operasional.

**MULAI SEKARANG:** Audit READ-ONLY dahulu, hasilkan `PLAN_UIUX_V2.md` dengan WBS, dependensi, rencana rollback, matriks UI/voice requirement↔source↔test dan perkiraan ukuran aset. Jalankan source smoke test yang tersedia tanpa memodifikasi. Tunggu persetujuan `UIUX_V2_PLAN_APPROVED`. Setelah approved, kerjakan desain tokens, publik, form, TTS, STT staging, form dinas, dashboard, regression dan UAT dalam PR kecil. Jangan commit ke main atau deploy otomatis.
---
