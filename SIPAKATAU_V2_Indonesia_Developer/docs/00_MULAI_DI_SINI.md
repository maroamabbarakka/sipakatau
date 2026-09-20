# 00 — Mulai di sini: kontrak pengembangan SIPAKATAU UI/UX V2.1
**Tanggal referensi:** 21 September 2026. **Status:** paket rancangan implementasi; belum mengubah repository GitHub, bukan bukti deploy atau siap produksi.

## Tujuan yang tidak boleh bergeser
Transformasi UI/UX untuk aplikasi pengaduan masyarakat **dan** Form Kebutuhan Dinas dalam repo `maroamabbarakka/sipakatau`. Acuan SAPA 129: penyajian empatik, form bertahap dan bantuan audio/voice. Adaptasi alur dan prinsip interaksi; jangan menyalin aset, logo, foto, naskah, atau kode SAPA 129 tanpa izin. Pertahankan tiga identitas yang disetujui: **logo SIPAKATAU, logo Kabupaten Pinrang, logo Dikbud** dari berkas repository; logo institusi tidak boleh direka ulang lewat generative image.

### P0 tidak boleh dikurangi
1. Dua kanal WA Kirimdev dan form; 17 kategori terkonfigurasi; satu tiket; hak akses petugas; lacak tiket+token; identitas terlindungi; jalur anak/disabilitas; pelaporan, biaya, audit, AI opsional dan fallback.
2. Form internal dinas tetap *nonteknis*: identitas layanan, nomor WA resmi, pengelola dan cadangan lengkap nama/email/WA, telaah 17 kategori, nama baru/nonaktif/usulan kategori, operator, kebutuhan layanan, peninjauan, ekspor/penyimpanan sesuai mode.
3. `id-ID` di seluruh audio **harus benar-benar memilih suara bahasa Indonesia**. Tanpa voice Indonesia yang tersedia, jangan diam-diam memilih voice Inggris; tampilkan naskah teks. Dikte `id-ID` harus mengizinkan koreksi sebelum submit; fitur ini bersyarat browser, persetujuan dan penilaian privasi.
4. P0 keamanan dan alur tiket tidak boleh dikorbankan untuk desain. Demo berbasis localStorage adalah simulasi, bukan sistem pengaduan aktif.

## Urutan baca dan eksekusi
| Tahap | Dokumen | Gate |
|---|---|---|
| Audit | 01, 02 | Baseline kode, fungsi, screenshot + issue list |
| Desain | 03, 04, 05, 06 | Desain 320/390/768/1440 px disetujui |
| Suara | 07, 08, 09 | Naskah disetujui; lang/voice/privasi diuji |
| Halaman | 10, 11 | E2E publik dan form dinas lulus |
| Aset & motion | 12, 13 | Lisensi/kontras/performansi lulus |
| Integrasi | 14 | Tidak ada schema/routing berubah tanpa CR |
| QA | 15, 16, 17 | Evidence terlampir, sign-off sebelum deploy |

## Deliverable developer
- Screenshot before/after per route, mobile + desktop; layar error/empty/loading/success; status a11y.
- Tabel pemetaan route→komponen→requirement→test→status, termasuk seluruh peran.
- Audio naskah Bahasa Indonesia terverifikasi, voice TTS tanpa fallback bahasa asing; contoh implementasi di `examples/` harus ditinjau/adaptasi, bukan langsung dipakai untuk produksi.
- Aset ilustrasi baru di `assets/illustrations`, ikon vektor di `assets/icons`; jangan mengganti logo resmi.
- Laporan regresi lengkap, change request untuk hal di luar visual, dan rencana rollback.

**Sumber baseline:** https://github.com/maroamabbarakka/sipakatau (repo dibaca 21 September 2026), `referensi` masterplan V1.1 di repo, https://laporsapa129.kemenpppa.go.id/ dan `/lapor`. Periksa HEAD terkini sebelum mengeksekusi; commit lain mungkin telah mengubah struktur file.
