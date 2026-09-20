# 00 — PERINTAH AWAL UNTUK DEVELOPER / VS CODE

## Tujuan

Bangun aplikasi SIPAKATAU produksi berdasarkan masterplan V1.1 dan demo dalam paket ini. Demo adalah **kontrak interaksi visual** dan skenario uji, **bukan** arsitektur backend yang boleh disalin mentah. Jangan deploy file demo yang memakai `localStorage`, role selector, fake token, dan fake webhook sebagai layanan nyata.

## Perintah kerja yang harus diikuti urut

1. Baca seluruh `README.md`, `docs/01`–`docs/16`, kemudian masterplan teknis asli. Buat daftar kesenjangan yang menyebut ID requirement, bukan sekadar ringkasan.
2. Jalankan demo lokal: `python -m http.server 8000`, lalu buka `http://localhost:8000`. Telusuri setiap route pada `02_PETA_LAYAR_DAN_NAVIGASI.md` di desktop 1440 × 900 dan mobile 390 × 844.
3. Buat branch `feature/sipakatau-foundation` dari repository privat instansi. Jangan mengubah proyek produksi Firebase selama fase eksplorasi.
4. Sediakan folder `frontend/`, `backend/`, `packages/contracts/`, `tests/`, `infra/`, `docs/`. Pisahkan konfigurasi staging/production. Semua secret di secret manager, `.env.example` hanya placeholder.
5. Buat `REQUIREMENTS_MATRIX.md` internal yang mengaitkan **RQ-001 s.d. RQ-014** dengan fitur, route, endpoint, unit test, E2E, dan bukti. Setiap P0 harus memiliki owner.
6. Terapkan tahapan G0–G5; **jangan loncat** dari mockup ke deployment produksi. Setiap gate memerlukan sign-off pemilik produk dan hasil uji yang tersedia.
7. Sebelum mengerjakan UI yang cantik, definisikan kontrak API, aturan field-level access, idempotency, state machine, dan kategori K01–K17. Design token demo boleh digunakan, tetapi keamanan demo tidak boleh dijadikan implementasi backend.
8. Setiap perubahan kebutuhan: buat change request dengan alasan, dampak biaya/jadwal/privasi, acceptance test baru dan persetujuan tertulis. Jangan memangkas detail karena ingin mempercepat pekerjaan.

## Komando VS Code

```bash
# berada di folder hasil ekstraksi
python -m http.server 8000
# buka http://localhost:8000

# pemeriksaan statis tanpa dependensi
node --check js/data.js
node --check js/app.js
```

`index.html` dapat dibuka langsung, tetapi server lokal lebih konsisten terkait origin browser dan localStorage. Tidak ada `npm install` diperlukan untuk demo.

## Perintah implementasi tahap berikutnya (bukan bagian demo)

- Frontend: TypeScript + React/Vite boleh dipilih, dengan router dan komponen yang mempertahankan spesifikasi UI. Teknologi final harus dicatat sebagai ADR.
- Backend: Node.js/TypeScript pada Cloud Run Jakarta atau opsi setara yang disahkan; Firestore Jakarta; integrasi frontend melalui HTTPS API. Semua operasi mutasi kasus ditangani backend.
- Tes: Vitest untuk unit, Playwright untuk E2E, emulator staging untuk Rules, OWASP test/pentest sesuai lingkup.
- Deployment: dari CI terproteksi; staging dulu; production hanya setelah uji restore, hak akses, vendor dan legal gate lulus.

## Batas produk yang tidak boleh diubah

- **Tepat dua kanal masuk:** Kirimdev WhatsApp resmi dan form online. Tidak menambahkan Instagram, telepon, aplikasi native, atau chatbot AI publik ke MVP.
- **K01–K17:** setiap kategori operator utama, pengganti, eskalasi, rules dan versi kebijakan.
- **Satu dashboard multi-peran:** pimpinan, super admin, pusat, kategori, perlindungan khusus (peran tambahan akses).
- **NIK tidak wajib.** Nomor WA hanya kontak. Form tanpa identitas dan mode terlindungi harus ada.
- **Tiket sebelum AI.** AI boleh off sehingga layanan tetap berjalan; AI tidak menentukan sanksi/penutupan/kebenaran laporan.
- **Privasi kasus anak, kekerasan, disabilitas dan konflik kepentingan:** operasi disahkan petugas, bukan hanya UI flag.
- **Logo:** SIPAKATAU sesuai aset; tidak menambah logo Kabupaten Pinrang. Kebutuhan lambang Tut Wuri Handayani harus memakai file resmi terverifikasi, tidak digambar ulang sembarangan.

## Output pertama yang wajib dikirim developer

- `PROJECT_STATUS.md`: versi masterplan, daftar asumsi dan risiko.
- `REQUIREMENTS_MATRIX.md`: RQ-001–014 terpetakan route/API/test.
- `ADR/`: keputusan hosting, backend, storage privat, AI, backup, auth.
- `SCREEN_INVENTORY.md`: 22+ layar dan semua keadaan kosong/loading/error/denied.
- `UAT_PLAN.md`: 30 test masterplan + uji UI dari dokumen 14.

**Gate G0:** jangan lanjut coding produksi sampai matriks kewenangan, SOP, retensi, peran, kategori K16, rujukan ULD, dan kebijakan privasi diklarifikasi oleh pemilik produk.
