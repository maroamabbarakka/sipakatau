# 03 — Design system: token, komponen, ikonografi, logo
## Token rancangan (usulan; kalibrasi dari warna logo repo)
```css
:root {
 --brand-700:#104A8B; --brand-600:#1667C8; --brand-100:#EAF3FF;
 --accent-500:#F08B29; --success-600:#137957; --danger-700:#A82C43;
 --text-900:#17324D; --text-600:#4B6178; --surface:#FFFFFF;
 --canvas:#F7FAFD; --line:#D9E5F0; --focus:#F3A52E;
 --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
 --space-6:24px; --space-8:32px; --space-12:48px;
 --radius-control:14px; --radius-card:22px;
 --shadow-card:0 14px 38px rgba(20,58,108,.07);
 --font-ui:system-ui,"Segoe UI",Arial,sans-serif;
}
```
Dapat memakai font existing bila izin lisensi sudah terpenuhi, jangan mengemas font berlisensi dalam ZIP. Cek contrast nyata seluruh state menggunakan alat otomatis + pengujian manual.

## Skala tipografi
| Elemen | Mobile | Desktop |
|---|---:|---:|
| Body | 16–18px / 1.55 | 16–18px / 1.6 |
| Label | 16px / 1.4 | 16px / 1.4 |
| Helper | 14px / 1.5 | 14px / 1.5 |
| H1 | clamp(30px,7vw,42px) | 48–60px |
| H2 | 26–30px | 32–40px |
| H3 | 21–24px | 24–28px |
| Data table/meta | ≥14px | ≥14px |
Button/touch target rancangan ≥48x48px; fokus terlihat; error tidak disampaikan hanya dengan merah.

## Sistem layout
Mobile 320–767: 1 kolom, max-width konten 680px, padding horizontal 16–20px, CTA lebar penuh; form sticky actions di bawah memperhitungkan `env(safe-area-inset-bottom)`. Tablet 768–1023: 2 kolom hanya bila terbaca. Desktop ≥1024: content 1160–1280px, editorial hero dua kolom 55/45, dashboard sidebar yang bisa runtuh. Jangan mendefinisikan fixed widths untuk teks yang panjang.

## Brand locks
- Header publik: logo SIPAKATAU di area utama; Pinrang dan Dikbud pada secondary institutional lockup/area kepercayaan. Mobile: identitas tetap tersedia dan proporsional tanpa memaksa semua logo kecil dalam satu baris.
- Footer memuat ketiganya. Logo Pinrang `logo/pinrang.png`, Dikbud `logo/dikbud.webp` sesuai repo saat audit; verifikasi izin/ketepatan aset dan referensi path di HEAD.
- Dilarang grayscale/filter invert pada lambang resmi jika membuat warna resmi berubah. Logo lain boleh punya versi monokrom hanya bila aset brand disahkan.
- Aset buatan paket ini **hanya ilustrasi dan ikon fitur**, bukan logo institusi.

## Komponen tunggal (jangan menyalin override)
`PublicHeader`, `InstitutionalLogos`, `HeroSplit`, `PrimaryCTA`, `IssueGroupAccordion`, `JourneyTimeline`, `TrustFactCard`, `ProgressHeader`, `ChoiceCard`, `FieldWithHelp`, `PrivacyChoice`, `AudioGuidePanel`, `VoiceDictationButton`, `TranscriptReview`, `StepNavigation`, `TicketReceipt`, `StatusTimeline`, `StaffMetrics`, `CaseList`, `CaseDetail`, `NeedsCategoryEditor`, `EmptyState`, `AlertBanner`.
Setiap komponen punya default/hover/focus/disabled/loading/error/success, pengujian keyboard, dan integrasi media mobile.
