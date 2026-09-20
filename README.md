# SIPAKATAU — DEMO UI/UX INTERAKTIF + PAKET PELAKSANAAN DEVELOPER

**Versi:** 1.0-demo | **Tanggal:** 21 September 2026 | **Status:** Prototipe interaktif, bukan aplikasi pemerintah yang beroperasi.

SIPAKATAU = **SI**stem **P**eng**A**duan pendidi**KA**n **T**erp**A**d**U**. Ruang lingkup: Dinas Pendidikan Kabupaten Pinrang, jenjang PAUD, SD, SMP, serta pendidikan nonformal/informal yang menjadi kewenangan kabupaten. Masterplan teknis 19 September 2026 V1.1 adalah baseline. Jangan menyisipkan logo Kabupaten Pinrang: aset aplikasi menggunakan identitas SIPAKATAU; lambang kelembagaan tambahan, apabila kelak dibutuhkan, hanya melalui aset Tut Wuri Handayani resmi yang diverifikasi.

## Cara membuka demo

1. Ekstrak ZIP, buka folder `SIPAKATAU_UIUX_DEMO`.
2. **Cara sederhana:** klik ganda `index.html` dengan Chrome/Edge. Untuk interaksi terbaik, gunakan server lokal pada langkah berikut.
3. **Cara yang disarankan dengan VS Code:** buka folder ini → Terminal → `python -m http.server 8000` → buka `http://localhost:8000`.
4. Alternatif Node: `npx --yes http-server . -p 8000` membutuhkan pengunduhan paket bila belum dipasang; **tidak diperlukan** karena cara Python tanpa dependensi sudah cukup.
5. Klik **Demo Petugas**, pilih peran, lalu uji seluruh menu. Semua data merupakan fiksi. Demo menyimpan perubahan di `localStorage` browser; reset melalui Super Admin → Pengaturan → Reset.

**Tidak boleh memasukkan nama anak nyata, NIK, data kesehatan, kronologi sesungguhnya, foto warga, kata sandi, atau API key.** Semua formulir dan WA bersifat simulasi; tidak ada request ke Firebase, Gemini, Kirimdev, atau layanan eksternal. Ikon dan logo berasal dari aset SIPAKATAU yang tersedia pada proyek.

## Daftar fungsi interaktif

- Publik: beranda, 17 kategori, formulir empat langkah, NIK tidak wajib, tiga pilihan privasi, konfirmasi tiket + kode, pelacakan dengan dua faktor referensi (ticket + token), informasi tambahan, tiket keberatan terkait, FAQ, perlindungan anak, aksesibilitas, pemberitahuan privasi.
- Petugas: login demonstrasi berbasis lima peran, ikhtisar, kotak masuk, daftar filter/cari/pagination, detail kasus dengan tujuh tab, penugasan, transisi status, eskalasi, balasan via outbox simulasi, matriks K01–K17, master sekolah rekaan, peran, pengaturan, AI simulasi, laporan, penghitungan dan ekspor biaya, backup check dan audit.
- WhatsApp: contoh pesan masuk, grouping pesan lanjutan, event ID unik, replay idempotent, status delivery, outbox lokal; **bukan** panggilan Cloud API sungguhan.
- AI: mode awal OFF. Super Admin dapat mengaktifkan mode hasil **deterministik lokal**, bukan Gemini; validasi kontrak dan perlindungan data tetap merupakan blocking gate untuk aktivasi AI produksi.
- Biaya: seluruh variabel dapat diedit, mencakup biaya Meta menurut kategori pesan, Kirimdev, AI, backend, backup, penyimpanan, kurs asumsi, cadangan, dan pajak asumsi. Ekspor CSV tidak setara faktur/vendor pricing.

## Struktur ZIP

```text
index.html                 aplikasi satu halaman berbasis hash route
css/styles.css             design system + responsif
js/data.js                 17 kategori dan dataset rekaan
js/app.js                  renderer dan aksi UX simulasi
assets/                    logo utama, horizontal dan ikon app
qa/                        smoke test Node.js dan laporan pemeriksaan
docs/                      18 dokumen instruksi developer berurutan
referensi/                 masterplan teknis V1.1 yang menjadi baseline
PROMPT_VSCODE_AGENT.md     instruksi siap tempel untuk agen VS Code
README.md                  panduan ini
```

## Batas tegas demo vs produksi

| Demo yang boleh diuji | Produksi yang wajib dikembangkan |
|---|---|
| Login memilih role | Firebase Auth / autentikasi staf + MFA dan backend authorization |
| Dataset localStorage | Firestore Jakarta dan backend tepercaya |
| Simulasi WA lokal | Webhook Kirimdev terverifikasi HMAC, durable intake, idempotency |
| Respons AI deterministik | AI adapter berizin, output tervalidasi; `AI_ENABLED=false` sampai gate disetujui |
| Token demonstrasi | Token acak entropi tinggi, hanya hash tersimpan, rate limit |
| Tanggal/target rekaan | SLA versi sesuai SOP dan kalender kerja disahkan |
| Tombol role dan akses UI | Policy RBAC + ABAC server-side untuk setiap query dan tindakan |
| Uji backup browser | Backup data + lampiran + vault terpisah dan restore drill nyata |

**Tidak ada klaim bahwa aplikasi telah terhubung/siap produksi.** Referensi biaya dan vendor pada dokumen berasal dari baseline masterplan September 2026; periksa ulang sebelum pengadaan.

## Urutan membaca instruksi developer

Mulai `docs/00_MULAI_DI_SINI.md`, lanjutkan sesuai nomor file. Gunakan `PROMPT_VSCODE_AGENT.md` sebagai instruksi awal di VS Code. Setiap fase memiliki input, keluaran, uji penerimaan, dan gate. Developer **dilarang menghapus persyaratan P0** atau menyatakan fitur selesai hanya berdasarkan mockup. Semua perubahan dicatat dalam `docs/16_CHANGE_CONTROL_DAN_SERAH_TERIMA.md`.

**Dokumen acuan sumber:** `SIPAKATAU_Grand_Masterplan_Teknis_Developer.docx` 19 September 2026 V1.1 dan masterplan nonteknis V1.2. Salinan baseline teknis ada di `referensi/Masterplan_Teknis_V1.1.docx` agar paket dapat dibaca mandiri; masterplan nonteknis tetap merupakan acuan tata kelola terpisah. Pastikan versi final yang disetujui pemilik proyek ketika memulai implementasi.
