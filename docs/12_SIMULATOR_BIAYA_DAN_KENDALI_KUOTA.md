# 12 — SIMULATOR BIAYA, ASUMSI, DAN KONTROL TAGIHAN

## Status tarif

Angka awal **diambil dari asumsi masterplan tanggal 19 September 2026**, bukan tarif live, HPS atau invoice. Kirimdev Starter Rp25.000/bulan adalah referensi dokumen; service message gratis 1.000/bulan, service/utility Rp356,65 dan marketing Rp586,33 adalah parameter proyeksi yang harus dicek rate card sebelum berlaku. Autentikasi di demo diinisialisasi Rp0 **PLACEHOLDER, bukan gratis**. Perubahan harga Meta, kurs, pajak, volume, dan kebijakan tier menyebabkan perbedaan biaya.

## Route interaktif

`#/dashboard/costs` (role PIMPINAN atau SUPER_ADMIN). Semua input numerik editable, perhitungan diperbarui saat input diubah dan fokus keluar, ekspor CSV serta reset asumsi. Dashboard biaya bukan sistem penagihan dan tidak membaca invoice sebenarnya.

## Variabel dan formula yang harus identik frontend/backend

| Simbol | Arti |
|---|---|
| N | kasus unik/bulan |
| W | proporsi WA dalam [0,1] |
| S,U,A,M | pesan service, utility, authentication, marketing per WA case |
| F | kuota free service per nomor/bulan (rate card) |
| rs,ru,ra,rm | tarif per pesan masing-masing kategori |
| K | biaya platform Kirimdev per bulan |
| E | proporsi kasus eligible AI [0,1] |
| C | AI calls per eligible case |
| tin,tout | token input/output per call |
| pin,pout | USD/juta token input/output |
| FX | kurs **asumsi**, bukan kurs terkini |
| H,B,O | backend, backup, object storage privat/bulan |
| R,T | cadangan dan pajak simulasi dalam bentuk fraksi |

```text
wa_cases = N * W
service_messages = wa_cases * S
paid_service = max(0, service_messages - F)
meta = paid_service*rs + wa_cases*(U*ru + A*ra + M*rm)
ai_usd = N*E*C*(tin*pin + tout*pout)/1_000_000
ai_rupiah = ai_usd * FX
base = K + meta + ai_rupiah + H + B + O
monthly = base*(1+R)*(1+T)
yearly = monthly*12
per_case = monthly/max(1,N)
```

**Perhatian:** asumsi kategori pesan mengikuti nomenklatur rate card vendor terbaru, dan jumlah service messages bukan sama dengan jumlah pengaduan. Jika satu nomor melayani beberapa produk, free quota dibagi; hitung pada WABA/nomor yang benar. Pajak sesungguhnya dan markup vendor tidak bisa disimpulkan dari simulator.

## Uji aritmetika baseline

Dengan N=500, W=60%, S=1, U=A=M=0, F=1000, K=25.000, H=100.000, B=100.000, O=50.000, R=15%, T=0%, AI eligible/call mengikuti harga token yang masih rendah namun **demo biaya default memasukkan komponen AI bernilai nonnol**. Untuk mendapatkan persis Rp316.250 versi masterplan, set `aiEligible=0%` atau `aiCalls=0`. Transparansi ini diperlukan agar contoh masterplan tidak menyembunyikan biaya token saat dipilih.

Kasus aktif komunikasi: N=500, W=100%, S=2, U=1 → 1.000 service free, 500 utility berbayar → 500 × 356,65 = Rp178.325 biaya Meta; ditambah layanan/infrastruktur sesuai variabel pengguna. Lonjakan: N=3.000, W=100%, S=2, U=1 → 5.000 service paid + 3.000 utility = 8.000 × 356,65 = Rp2.853.200. Angka ini ilustrasi **jika rate acuan berlaku**.

## Cost guard produksi

Pencatatan ledger per vendor, kategori tagihan, rate snapshot, currency, timestamp, request ID, kasus/ref minimal, token/model, dan status delivery. Dashboard peringatan 50/75/90/100% pagu; rekonsiliasi billing setidaknya bulanan. Saat AI over budget, matikan AI adapter saja; saat WA nonwajib over budget, prioritaskan pesan wajib/SOP dan portal. Jangan menghentikan durable intake, notifikasi bahaya wajib, atau backup. Cloud billing alert bukan hard cap umum; limit aplikasi perlu dibuat dan diuji.

## Uji formula otomatis

- N=0 → biaya tetap K+H+B+O, per_case tidak membagi nol.
- N=1.000, W=100%, S=1, F=1000 → service paid 0.
- N=1.001 → service paid 1 × rs.
- S=0,U=0,A=0,M=0 → biaya Meta 0.
- U=1 dan rate=356,65 → 500 laporan WA menghasilkan Rp178.325.
- AI calls=0 atau eligible=0 → AI Rp0 (bukan berarti Free Tier cocok untuk produksi).
- Semua input negatif/NaN ditolak oleh backend dan formulir produksi.
