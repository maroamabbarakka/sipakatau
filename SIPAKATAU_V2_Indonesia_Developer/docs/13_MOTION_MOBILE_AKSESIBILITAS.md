# 13 — Motion, mobile-first, aksesibilitas dan performa
## Layout matrix & gate
| Lebar viewport | Fokus QA |
|---|---|
| 320px | tidak ada scroll-x; CTA/tombol 48px; logo tidak gepeng |
| 360/390/430px | satu kolom, keyboard mobile, progress dan sticky bottom aman |
| 768px | navigasi responsif dan form max width terbaca |
| 1024px | dashboard tablet tidak memaksakan tabel desktop |
| 1280/1440px | hero editorial dua kolom dan split case view |
| 200% zoom | semua konten tersedia tanpa clipping/hilang |

## Motion contract
Transisi microinteraction 160–260 ms `opacity` dan `transform`, bukan animasi layout besar. Reveal hanya bila konten **tetap visible secara default** bila JS/IntersectionObserver gagal. `prefers-reduced-motion: reduce` mematikan scroll reveal, bounce, parallax, otomatis smooth-scroll. Tidak ada efek yang menunda munculnya CTA, menyebabkan mual, flash, atau mengganggu fokus.
```css
@media (prefers-reduced-motion: reduce){
 *,*::before,*::after {animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
}
```
Efek waveform untuk mic boleh berupa ikon statis pulsing kecil saat sedang mendengarkan; status teks dan berhenti tetap primer, motion dimatikan pada reduced-motion.

## Aksesibilitas WCAG 2.2 AA sebagai target uji
- Dokumen `lang="id"`, label programatik, error terhubung `aria-describedby`, error summary yang bisa difokuskan.
- Hit target rancangan ≥48px, kontras teks normal ≥4.5:1 dan teks besar ≥3:1; verifikasi per palet dan real device.
- TTS tidak otomatis; ada teks setara, pause/stop, tidak konflik dengan screen reader. Dikte bukan satu-satunya input.
- Tidak bergantung warna, ikon tanpa label, hover-only controls, gesture drag-only, atau CAPTCHA visual tunggal.
- Saat wizard next, fokus `h2` langkah dengan `tabindex=-1` dan status step singkat; saat error fokus first invalid.
- `aria-live` jangan membaca seluruh halaman dan audio TTS bersamaan tanpa user mengaktifkan.

## Performance budget proposal (bukan hasil audit)
First visit pada throttling mobile: LCP target ≤2.5s bila realistis dan dibuktikan, CLS <0.1, interaksi responsif. Hero visual WebP optimized + width/height; hindari ketergantungan video dan perpustakaan motion besar; bundle CSS satu sumber token agar cascade mudah dipelihara. Ukur Lighthouse/performance trace dengan bukti perangkat nyata; angka harus dilaporkan sebagai hasil, bukan sekadar target.
