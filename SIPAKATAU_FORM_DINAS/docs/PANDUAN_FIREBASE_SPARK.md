# Panduan Deployment Firebase Spark — Untuk Developer Saja

Tidak ada konfigurasi teknis yang perlu diisi pegawai pada formulir.

## A. Hanya menayangkan form (tanpa data daring)
1. Siapkan proyek Firebase khusus yang dimiliki instansi pada paket Spark.
2. Dari direktori ini, `firebase login` dan `firebase deploy --only hosting --project ID_PROYEK_ANDA`.
3. Buka `https://ID_PROYEK_ANDA.web.app`, cek lima tahap pada HP. Jangan mengganti `public/firebase-config.js` jika hanya butuh mode statis.
4. Dalam mode statis, semua pegawai yang memiliki tautan dapat melihat form kosong, tetapi **tidak** bisa mengirim jawaban ke server. Hasil disimpan melalui unduh JSON/CSV; jangan mengunggah hasil ke folder publik.

## B. Menyimpan draf kolaboratif secara daring (opsional)
1. Aktifkan Firebase Authentication Email/Password; buat akun petugas dari Console. Tidak ada pendaftaran mandiri dalam form.
2. Aktifkan Firestore default database di lokasi yang disetujui, misalnya Jakarta jika sesuai kebijakan instansi.
3. Siapkan `staff_access/{AUTH_UID}` melalui Console/Admin SDK: `active: true`, `role: "editor"` atau `"admin"`. Jangan beri hak akses melalui frontend.
4. Tinjau `firestore.rules` terhadap aturan proyek yang sudah ada. Pada proyek khusus yang belum memiliki aturan lain, uji aturan di emulator dan deploy `firebase deploy --only firestore:rules --project ID_PROYEK_ANDA`. **Jangan** menimpa rules proyek bersama yang sudah berjalan.
5. Isi `public/firebase-config.js` menggunakan konfigurasi Web App Firebase, misalnya `window.SIP_FIREBASE_CONFIG = {apiKey:'...',authDomain:'...',projectId:'...',appId:'...'}`. Web App config **bukan** service account; jangan memasukkan private key atau API key Kirimdev/Gemini.
6. Deploy Hosting. Harus muncul login. Petugas resmi masuk, draf dari `discovery_forms/main` dimuat, dan tombol **Simpan ke Firebase** tersedia pada tahap 5.
7. Simpan pertama `revision=1`, berikutnya bertambah satu melalui transaksi; stale editor mendapat pesan konflik. Setiap editor berhak melihat semua kontak petugas pada draf bersama, sehingga **batasi jumlah editor**.
8. Uji akses tanpa akun, akun nonaktif, akun tanpa `staff_access`, penimpaan revisi, export dan pemulihan. Konfigurasi belum diuji pada proyek pengguna.

## Batas keamanan
- Hosting tidak sama dengan database. Frontend tetap publik (HTML, CSS, JavaScript), data Firestore hanya untuk pengguna yang diizinkan oleh Rules.
- Form mengumpulkan kontak staf; informasikan tujuan dan batasi akses sesuai kebijakan instansi.
- Native Firestore backup bukan otomatis tersedia gratis pada Spark; rencana backup dan restore wajib disetujui jika dipakai sebagai sumber data resmi.
- Versi ini tidak memiliki pengesahan digital, audit versi historis, kontrol kategori per-user, fitur merge, atau penyimpanan otomatis. Jangan mengklaim demikian.
