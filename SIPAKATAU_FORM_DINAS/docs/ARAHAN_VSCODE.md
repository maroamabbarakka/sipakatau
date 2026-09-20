# Instruksi Developer / VS Code — Sederhanakan Form Kebutuhan SIPAKATAU

## Kontrak perubahan (jangan dipangkas)
- Pertahankan kelima tahap: identitas, WhatsApp resmi, kategori, kebutuhan layanan, review.
- Pertahankan **semua 17** kategori dasar; status `Tidak diperlukan` adalah usulan penonaktifan, **jangan hapus record**. Izinkan penambahan kategori dan perubahan label tanpa merusak ID K01–K17.
- Setiap kategori aktif memiliki isian nama admin, email admin, nomor WA admin; pengganti dan catatan bersifat opsional.
- Wajib mobile-first: 1 kolom di bawah 720px, font body 18px, input 17px, label 17px, tombol tinggi minimum 48px, indikator langkah, fokus terlihat, semua input punya label yang jelas.
- Jangan tampilkan istilah Firebase, webhook, Gemini, collection, API, Cloudflare atau jargon lain pada pertanyaan petugas.
- Jangan menambahkan kewajiban NIK/KTP, bukti murid, upload kronologi nyata, atau registrasi publik.
- Form kebutuhan **bukan** penerimaan pengaduan; pisahkan rute/collection dari data kasus produksi.
- Data contoh/fiktif saja untuk preview. Tidak ada koneksi vendor WA maupun AI.

## Struktur paket
- `public/index.html`: markup dan lima panel.
- `public/css/style.css`: tampilan responsif dan cetak.
- `public/js/app.js`: state form, kategori, validasi format opsional, ringkasan, ekspor JSON/CSV dan cetak.
- `public/firebase-config.js`: default `null`, diisi developer untuk mode kolaborasi.
- `public/js/cloud.js`: login staf melalui Auth dan save/load satu dokumen Firestore dengan revisi transaksi.
- `firestore.rules`: aturan contoh untuk **proyek khusus**. Jangan menimpa rules proyek eksisting tanpa penggabungan dan uji emulator.
- `firebase.json`: hanya menayangkan folder `public/`.

## Definisi selesai untuk UI
1. Lebar 360, 390, 768, 1280: tidak ada horizontal overflow atau teks kecil.
2. Tab/keyboard dan pembaca layar dapat mengisi semua lima tahap.
3. Kategori K01–K17 tersedia utuh; memilih ganti nama/tidak diperlukan tidak memodifikasi kategori lain.
4. Semua 17 kontak admin dapat diisi dan dibaca pada ringkasan; layanan baru dapat ditambahkan dan ikut ekspor.
5. JSON valid, CSV tidak mengeksekusi formula yang berasal dari input pengguna, dan cetak hanya memuat ringkasan.
6. Tidak ada pembuatan dokumen cloud tanpa login; hanya UID dalam `staff_access` yang boleh membaca/menulis.
7. Simpan bersamaan dari dua tab tidak diam-diam menimpa revisi; jika konflik tampil pesan dan sarankan unduh JSON.
8. Data tidak otomatis disimpan ke localStorage atau disebarkan ke analitik pihak ketiga.
9. Jangan menyatakan fitur siap produksi tanpa uji Firebase Auth, Firestore Rules/emulator, tata kelola data pegawai, backup dan UAT petugas.

## Pengembangan berikutnya (setelah persetujuan)
- Mekanisme approval oleh pimpinan dengan catatan dan riwayat versi; saat ini hanya draft.
- Penguncian formulir final setelah disahkan.
- Backup dan ekspor berkala pada lokasi yang disetujui.
- Hak akses per kategori bila formulir akan dibagikan lintas bidang (model sekarang **satu dokumen bersama**, hanya untuk koordinator/editor tepercaya).
- Impor JSON dengan pratinjau perubahan, validasi lebih lengkap, dan penggabungan aman.

**Jangan** menyederhanakan fitur inti, mengubah branding, atau menghapus persyaratan tanpa change request dan persetujuan pemilik produk.
