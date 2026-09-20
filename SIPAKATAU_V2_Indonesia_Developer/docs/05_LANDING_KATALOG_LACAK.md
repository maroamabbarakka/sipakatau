# 05 — Spesifikasi UX halaman publik: beranda, kategori, panduan, pelacakan
## Beranda
**Heading usulan:** "Ada masalah pendidikan? Kami siap mendengarkan." Subheading: "Sampaikan persoalan PAUD, SD, SMP atau pendidikan nonformal. Tidak perlu mengetahui bidang yang menangani; kami bantu meneruskannya." Tombol utama "Buat pengaduan", kedua "Lacak pengaduan". Link WA resmi **hanya** jika nomor sudah diisi/divalidasi instansi. Informasi layanan tidak boleh mengarang jam operasional/nomor.
Hero desktop: headline kiri, ilustrasi `01_konsultasi_pendidikan.webp` kanan. Di ponsel, CTA di atas ilustrasi; hindari gambar mendorong CTA terlalu jauh. `srcset`/sizes bila ada varian asli, `width`,`height`, lazy-load gambar di bawah fold; hero preload terbatas bila diuji perlu.

## Kategori
Jangan tampilkan 17 kartu kecil dan deskripsi owner pada first fold. Gunakan 6 rumpun visual + satu opsi "Saya belum tahu"; overlay/drawer menampilkan K01–K17 lengkap; ID routing tidak berubah. Daftar harus keyboard navigable, searchable dan tidak auto-route dari tampilan rumpun tanpa mapping eksplisit.

## Audio guide
Tombol berada dekat H1/penjelasan form, label "Dengarkan panduan halaman ini"; durasi indikatif bukan janji. TTS hanya bacakan naskah statis/kurasi pada `09_NASKAH_AUDIO_BAHASA_INDONESIA.md`; tidak pernah membacakan pesan rahasia, nama anak, kontak, nomor tiket/token melalui speaker tanpa interaksi + tinjauan risiko.

## Pelacakan
Nomor tiket + token rahasia dalam input terpisah, **tidak** dalam URL, clipboard analytics, query string atau event logger. Status kartu, timeline dengan label teks, jam pembaruan yang nyata, kirim informasi tambahan/keberatan sesuai izin. Ticket-only harus menolak akses rincian; token hilang pada pelapor tanpa kontak tidak boleh dipulihkan dengan tebakan tiket.

## Konten lain
Halaman privasi: perbedaan WA (nomor diterima sistem/vendor) versus form tanpa identitas (kode akses), privasi operator bukan anonim mutlak. Halaman aksesibilitas: cara memakai keyboard, screen reader, panduan audio, dikte bila tersedia, kontak bantuan alternatif. Halaman perlindungan anak: penjelasan prioritas dan rujukan **setelah** nomor/instansi tujuan diverifikasi; tak menjamin penanganan real-time dari situs demo.

## UAT
Pada 360px, CTA Buat/Lacak dan ringkasan manfaat terlihat tanpa horizontal scroll. User yang tidak paham kategori mampu sampai tiket. Semua tombol sesuai label dan tidak menuju # kosong. Tidak ada logo yang berubah warna/dipipihkan. FAQ terbuka dengan Enter/Space dan state dibaca screen reader.
