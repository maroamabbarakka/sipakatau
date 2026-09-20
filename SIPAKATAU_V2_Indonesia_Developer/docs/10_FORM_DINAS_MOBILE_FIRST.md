# 10 — Form Kebutuhan Dinas: UX nonteknis lima bagian
**Scope file:** `SIPAKATAU_FORM_DINAS/public/index.html`, `public/css/*`, `public/js/*`. Pertahankan `firebase.json`, `firestore.rules`, `firebase-config.js` hingga perubahan disahkan. Form tidak boleh menjadi formulir pengaduan warga.

## Apa yang pegawai rasakan
- Buka HP, lihat heading "Bantu kami melengkapi SIPAKATAU", penjelasan tidak bertele-tele, bantuan audio, progres Bagian 1 dari 5.
- Semua label bahasa sehari-hari, ukuran body 17–18 px, label ≥16, helper ≥14; layout 1 kolom mobile. State fokus/error jelas; tombol lanjut sticky bottom bila tidak menutup keyboard.
- 17 kategori tidak ditumpuk dalam 17 blok raksasa: selector kategori + kartu aktif dengan tombol Sebelumnya/Berikutnya, status terisi per kategori dan indikator selesai x/17; semua keyboard friendly.

## Lima bagian TETAP
1. **Identitas layanan:** nama instansi, nama layanan SIPAKATAU dan opsi usulan nama/kepanjangan baru, penanggung jawab, jabatan dan tujuan singkat.
2. **Nomor WhatsApp resmi:** nomor+status resmi, nama/email/WA admin utama, pengganti jika tersedia, jam layanan usulan (tidak otomatis jadi SLA). Jika nomor belum ada, pilih status "belum tersedia" dan jangan memaksa input palsu: validasi kondisional.
3. **17 kategori:** status `TETAP/UBAH_NAMA/TIDAK_DIPERLUKAN`, nama baru bila UBAH, operator utama+email+WA, pengganti dan catatan. ID K01–K17 tetap untuk sinkronisasi rancangan; "tidak diperlukan" merupakan **usulan**, bukan menghapus kategori produksi otomatis. Tambah kategori baru melalui daftar usulan terpisah.
4. **Cara pelayanan:** siapa operator pusat, email/WA, target balasan "belum diputuskan" bila perlu, kebutuhan perlindungan identitas, anak, disabilitas, dan catatan yang butuh persetujuan pimpinan.
5. **Periksa:** ringkas pilihan status kategori, tandai isian kosong, perbaiki, ekspor JSON+CSV/print; tombol Simpan ke Firebase hanya jika login/konfigurasi benar dan izin sudah diuji. Jangan klaim tersimpan ke server hanya karena localStorage berhasil.

## Kontrak status dan ekspor
Jangan mengubah nama field, kategori ID, pembentukan CSV/XLSX, dan alur login tanpa laporan migration. Periksa isi `requirements-demo.js`, `requirements-enhancements.js`, `requirements-xlsx.js`, `requirements-export-ui.js` di root dan modul form dinas terpisah: jangan membuat dua sumber kebenaran yang konflik. Semua eksportir harus memakai normalisasi data satu fungsi dan sanitasi formula CSV/XLSX untuk string yang dimulai `=`, `+`, `-`, `@`. Cek nama file sederhana, UTF-8 BOM CSV jika perlu kompatibilitas Excel Indonesia, formula security, jumlah operator 17/17.

## Logo dan voice
Tampilkan SIPAKATAU sebagai logo layanan, Pinrang dan Dikbud sebagai identitas kelembagaan dalam posisi proporsional dan jelas. Jangan mengganti logo menjadi representasi ilustrasi AI. Audio panduan `DINAS-*` dalam `09_NASKAH...md`; tidak membacakan nama/email/WA pegawai secara otomatis. Dikte pada field narasi **opsional** dan nonaktif secara default di produksi sampai privasi browser diperiksa.

## QA khusus
360px: tanpa horizontal scroll, kategori aktif & tombol navigasi mudah disentuh, 17 kategori semua bisa diakses, isian operator tidak lenyap ketika kategori berganti, mode tanpa WA tidak terblokir oleh required validation, save berhasil hanya saat server mengakui, ekspor lengkap, reload aman untuk draft demo. Uji juga keyboard, 200% zoom, pinch zoom tidak di-disable dan mode cetak A4.
