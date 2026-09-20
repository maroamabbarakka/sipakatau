# 01 — Audit repo & pembekuan perilaku sebelum coding
## Bukti repository yang telah diperiksa
- `index.html` memuat CSS terpisah (`css/styles.css`, `logo-contrast.css`, `public-page-rhythm.css`, dan CSS requirements) serta `js/data.js`, `js/app.js` dan tambahan `js/requirements-*.js`.
- `js/app.js` merupakan renderer berbasis hash route, memuat model `localStorage`, beranda, wizard publik, petugas, simulasi WA dan biaya. Data demo tidak sungguh terhubung API produksi.
- `css/styles.css` masih memuat banyak teks 11–13 px, `.btn` min-height 42 px, `.field` control min-height 43 px; perlu token tipografi baru dan audit seluruh overrides, bukan menambah override file tanpa batas.
- `js/app.js` footer sudah menampilkan `logo/pinrang.png` dan `logo/dikbud.webp` — pertahankan; jangan ikuti rekomendasi lama yang meminta menghapus kedua logo ini.
- `SIPAKATAU_FORM_DINAS/public/index.html` adalah aplikasi terpisah, sudah memiliki lima bagian dan opsi login/penyimpanan cloud. Jangan memperberatnya dengan terminologi developer.
- `qa/smoke_test.cjs` dan `qa/QUALITY_REPORT.md` tersedia sebagai titik awal, **bukan** bukti seluruh tampilan responsif/voice sudah benar.

## Audit read-only WAJIB sebelum edit
1. Catat SHA HEAD, status `git status`, branch, dan daftar file relevan. Buat branch `feat/uiux-v2-voice-id` setelah diizinkan; tidak mengubah main saat eksplorasi.
2. Baca penuh `index.html`, semua CSS dengan urutan cascade dan semua JS yang ter-load; baca `SIPAKATAU_FORM_DINAS/{firebase.json,firestore.rules,public/index.html,public/js/*,public/css/*}`.
3. Daftarkan route aktual dengan parser source + kunjungi di browser. Jangan menganggap dokumen ini daftar route definitif jika HEAD berubah.
4. Rekam screenshot 320, 390, 768 dan 1440 px untuk setiap route; catat `overflowWidth`, DOM errors, interaksi, role visibility.
5. Uji skenario lama sebelum edit: wizard empat tahap, tiket/token, laporan baru/lanjutan, privasi, 17 kategori, dashboard multi-role, biaya dan semua ekspor form dinas.
6. Simpan hasil di `evidence/baseline/` (screenshot tanpa PII), `evidence/route-inventory.md` dan `evidence/test-baseline.md`.

## Pemetaan file & intervensi
| File | Perubahan yang boleh | Jangan dilakukan |
|---|---|---|
| `css/styles.css` | token, typography, responsive base, komponen | mengganti semantics data atau izin |
| CSS requirements | konsolidasikan styling berulang setelah tes | menghapus fitur ekspor/cetak |
| `js/app.js` | markup semantik dan aksesibilitas, UI event adapters | menghapus fungsi/handler atau mengubah model kasus diam-diam |
| `js/requirements-*.js` | form presentation + status aksesibel | mengubah JSON/export schema tanpa migration |
| `js/data.js` | hanya label UI sesuai persetujuan | mengubah ID K01–K17 atau ownership |
| folder `logo/`, `assets/` | gunakan referensi existing logo institusi | regenerasi lambang resmi atau menempel dari concept art |
| Firestore rules/config | baca untuk regresi | ubah/deploy tanpa izin eksplisit |

## Issue teknis yang harus diverifikasi, bukan diasumsikan bug
`canBrowse()` pada versi terbaca mengembalikan false untuk PIMPINAN/SUPER_ADMIN; mungkin memang sengaja untuk membatasi kasus mentah. Uji terhadap skenario izin formal sebelum mengubahnya. Logo pada footer kode saat ini ada dan harus tetap muncul. `localStorage` bukan keamanan RBAC produksi. Peta route dan codepoint mesti dicek pada HEAD yang benar-benar akan diubah.

## Stop conditions
Jika ada fitur tidak bisa dipetakan, kontrak output form berubah, voice memerlukan pengiriman data sensitif ke vendor tak disetujui, atau akses identitas berubah: hentikan bagian itu, tulis CR dan minta persetujuan. Jangan menyimpulkan "desain saja" lalu mendeploy perubahan berisiko.
