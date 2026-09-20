# 17 — WALKTHROUGH DEMO YANG BISA LANGSUNG DIIKUTI

**Persiapan:** buka `index.html` via `python -m http.server 8000`. Pakai data rekaan saja. Untuk kembali ke kondisi awal: Login Super Admin → Pengaturan → Reset.

## Demonstrasi untuk pimpinan: 8 menit

1. Beranda: tunjukkan dua pintu WA dan form, cakupan PAUD–SMP/nonformal, 17 kategori dan bantuan khusus.
2. Form: pilih K10, isi '[FIKTIF] plafon hampir jatuh', centang ancaman keselamatan, pilih privacy PROTECTED, konfirmasi dan kirim.
3. Tunjukkan tiket dan token sekali pada hasil demo, buka pelacakan menggunakan tombol.
4. Masuk PIMPINAN: tunjukkan KPI, grafik kategori, kasus kritis, reports dan cost simulator.
5. Coba buka detail kasus langsung: akses ditolak dalam UI. Jelaskan kebutuhan server enforcement produksi.
6. Pada biaya: ubah proporsi WA, jumlah pesan, tarif dan backup; tunjukkan run rate sebelum pajak.

## Demonstrasi untuk operator pusat: 12 menit

1. Login OPERATOR_PUSAT → WhatsApp Simulasi → preset contoh disabilitas → kirim.
2. Periksa nomor tiket dan outbox. Klik replay: tidak membuat tiket ganda.
3. Buka Kotak masuk → cari tiket → detail tab 7.
4. Penugasan: pilih K17; periksa owner sesuai matriks. Catat bahwa pengesahan ULD belum boleh diklaim.
5. Transisi status legal, tulis balasan rekaan → outbox tersimpan, tidak terkirim nyata.
6. Kembali ke laporan → jumlah kasus unik berubah sesuai tiket baru, bukan jumlah balasan.

## Demonstrasi operator kategori: 5 menit

1. Login OPERATOR_KATEGORI, kategori K03 → tampil daftar K03 assigned saja.
2. Klik tiket terkait, cek ringkasan/pesan/timeline. Coba URL `#/dashboard/cases/demo-020` (kategori K10) → akses ditolak. Ini uji tampilan, bukan pengujian API produksi.
3. Usulkan verifikasi hasil bila status memungkinkan; penutupan oleh petugas biasa tidak diberi izin.

## Demonstrasi super admin: 8 menit

1. Login SUPER_ADMIN → Master kategori → edit operator utama dan cadangan K03 dengan nama rekaan berbeda; simpan.
2. Pengaturan → AI demo ON (default OFF). Jangan menyebut ini Gemini sesungguhnya.
3. AI → tidak dapat membaca kasus rahasia sebagai admin teknis; periksa policy gate dan feature flags saja.
4. Biaya → ubah dan ekspor CSV; Backup → jalankan pemeriksaan **lokal**; Audit → lihat catatan demo; Reset.

## Demonstrasi aksesibilitas dan kasus sensitif

- Tab melalui header, kategori, formulir, pelacakan; semua input perlu label.
- Resize hingga 390×844 dan zoom 200%; pastikan tombol dapat digunakan.
- Form pilih NO_ID_FORM: kolom nama/WA hilang; nomor tiket + token tetap diberikan.
- Form tandai anak dan keselamatan: jalur darurat bisa dicatat tanpa memaksa register NIK/OTP.
- Jangan gunakan contoh identitas atau kasus nyata dalam presentasi.
