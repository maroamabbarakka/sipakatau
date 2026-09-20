# SIPAKATAU — Form Kebutuhan Sederhana (mobile-first)

**Untuk:** pegawai Dinas Pendidikan Kabupaten Pinrang yang mengisi kebutuhan awal proyek, bukan developer.

## Yang ditanyakan (hanya 5 bagian)
1. Identitas layanan dan penanggung jawab.
2. Nomor WhatsApp pengaduan resmi serta nama, email, WA admin pengelola.
3. Tinjau 17 kategori satu per satu: tetap, ganti nama, tidak diperlukan; tambah layanan bila perlu; nama, email, WA admin masing-masing dan pengganti opsional.
4. Cara tindak lanjut, operator pusat, perlindungan identitas, disabilitas, dan kebutuhan tambahan.
5. Periksa jawaban, unduh JSON, daftar operator CSV, atau cetak.

**Penting:** ini form kebutuhan internal, **bukan** form pengaduan warga, belum menghubungkan WhatsApp, belum merupakan keputusan/SK resmi. Jangan mengisi NIK, data murid, kronologi pengaduan nyata, kredensial atau API key.

## Cara paling sederhana untuk melihat

- Buka berkas `form_sipakatau_sederhana.html` yang berada **di luar ZIP** bila ingin langsung membuka dengan browser tanpa server atau login.
- Versi dalam folder ini: buka `public/index.html` pada browser; lebih baik pakai server lokal (`python -m http.server 8000 --directory public`) dan akses http://localhost:8000.
- Berkas HTML mandiri dan mode statis **tidak menyimpan jawaban ke server**. Klik **Unduh hasil isian** sebelum menutup tab. Tidak ada penyimpanan data personal diam-diam ke localStorage.
- Ekspor JSON dapat dibaca developer/diimpor ke sistem lanjut. CSV adalah daftar kategori dan kontak petugas untuk kebutuhan internal.

## Firebase Spark

Berkas `firebase.json` menayangkan folder `public/`. Bila hanya ingin menampilkan form, jalankan perintah ini dari folder ZIP yang telah diekstrak:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting --project ID_PROYEK_ANDA
```

Hosting statis tidak memerlukan Cloud Functions dan tidak menyimpan data otomatis. **Jangan publikasikan data isian atau JSON ekspor di folder `public/`.**

Jika ingin isian bersama **tersimpan daring**, developer mengaktifkan Firebase Authentication dan Firestore dengan mengikuti `docs/PANDUAN_FIREBASE_SPARK.md`; setiap petugas harus memiliki akun terotorisasi. Data disimpan hanya ketika tombol **Simpan ke Firebase** ditekan pada bagian terakhir. Perubahan bersamaan ditolak agar jawaban tidak tertimpa diam-diam. Pada mode bersama, akses dan pengelolaan data pribadi pegawai perlu disahkan instansi.

## Cakupan dan batas
- Font dasar 18px, form input 17px, tombol ~50px, satu kolom pada layar kecil, layar kategori satu per satu.
- Semua 17 kategori tetap ada dalam data meskipun diberi status `Tidak diperlukan`; keputusan resmi tetap dilakukan di luar demo.
- Tidak ada OTP, NIK, pertanyaan server, API, budget teknis atau kode di form pengisian.
- Integrasi Cloud belum diaktifkan dalam paket unduhan (`public/firebase-config.js = null`). Pengujian lokal tidak membuktikan implementasi produksi.
- Form single document bukan sistem audit formal atau sistem backup otomatis. Review, sign-off, dan backup tetap diperlukan sebelum dipakai sebagai sumber data final.

**Mulai dari:** `docs/UNTUK_PEGAWAI.md` untuk petugas dan `docs/ARAHAN_VSCODE.md` untuk developer.
