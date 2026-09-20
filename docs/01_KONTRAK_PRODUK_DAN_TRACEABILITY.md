# 01 — KONTRAK PRODUK, KEWAJIBAN, DAN TRACEABILITY

## Pernyataan ruang lingkup

SIPAKATAU adalah pusat pengaduan pendidikan Dinas Pendidikan Kabupaten Pinrang untuk PAUD, SD, SMP, pendidikan nonformal/informal berdasarkan kewenangan aktual. Masyarakat mengakses WA atau form online, tiket unik dicatat, rules engine mengarahkan kategori, operator menindaklanjuti, pimpinan memantau agregat. Kategori kebudayaan K16 dan fungsi ULD untuk K17 wajib divalidasi terhadap penugasan resmi.

## Matriks ID spesifikasi teknis V1.1

| Requirement | Harus tersedia | Route/alur demo | Bukti produksi |
|---|---|---|---|
| RQ-001 P0 | Hanya WA Kirimdev + form mobile | `/demo-whatsapp`, `/pengaduan` | E2E kedua kanal; webhook asli staging |
| RQ-002 P0 | intake durable, tiket unik, pesan asli utuh | form konfirmasi, WA replay, detail tab Pesan | Uji 10 replay satu event; 0 lost event |
| RQ-003 P0 | 17 operator + cadangan + versi aturan | `/dashboard/admin/categories` | Matriks K01–K17, operator & fallback 17/17 |
| RQ-004 P0 | satu dashboard akses berdasarkan peran | semua `/dashboard/*` | Uji API IDOR dan row/field level |
| RQ-005 P0 | NIK/registrasi publik tak wajib | form 4 tahap | UAT kirim tanpa NIK |
| RQ-006 P0 | protected + no ID | form privasi, detail kasus | Vault aman, token sekali tampil, no-leak API |
| RQ-007 P0 | emergency tanpa menunggu AI | WA contoh bahaya, form emergency | AI OFF/429 tetapi alarm petugas aktif |
| RQ-008 P0 | AI hanya usulan, adapter bisa dimatikan | AI & settings | Feature flag + mock provider + schema validation |
| RQ-009 P0 | child, violence, disability, conflict route | K02/K17 & kasus priority | Test pengecualian, PPA/BSAN rujukan disahkan |
| RQ-010 P0 | audit, keamanan, private storage, restore | audit, backup | Pentest, backup restore valid, DPA vendor |
| RQ-011 P0 | pimpinan agregat, bukan raw sensitif | login PIMPINAN | 403 raw case, hanya agregat aman |
| RQ-012 P1 | metering cost & fitur opsional | `/dashboard/costs` | cost ledger vs invoice; kill switch AI-only |
| RQ-013 P1 | ekspansi katalog layanan | FAQ/peta domain | schema extensible, layanan baru gated SOP |
| RQ-014 OUT | konektor lain tidak di MVP | tidak ada route | No Instagram/Dukcapil/Dapodik/SP4N direct write |

## Prioritas yang harus dibedakan

**P0:** registrasi, dua kanal, tiket, routing, privacy, kasus khusus, role, audit, penyimpanan, backup/restore, pelacakan. **P1:** laporan lanjut, pagu biaya, ekspansi katalog. **Out:** sinkronisasi data instansi eksternal tanpa izin, aplikasi native, penilaian pidana/sanksi AI, ranking sekolah berdasarkan laporan mentah.

## Metrik dan kualitas: usulan, BUKAN hasil pengujian

- 100% 17 kategori punya routing terkonfigurasi pada dataset UAT.
- Form intake p95 ≤ 3 detik tanpa unggah besar; webhook ACK p95 ≤ 2 detik dan < 10 detik jika vendor mengonfirmasi kontraknya.
- 0 kehilangan data pada 1.000 event uji sintetis; idempotensi replay ≥ 10 kali.
- Akses pengguna ke kasus bukan miliknya harus ditolak oleh API, bukan sekadar tombol hilang.
- Dataset AI uji ≥ 300 contoh berlabel: 170 satu-kategori, 80 multi-isu/sensitif, 50 typo/bahasa lokal; target mutu dalam masterplan hanya usulan release gate, bukan klaim sudah dicapai.
- WCAG 2.2 AA sebagai target audit, pengujian keyboard, pembaca layar, dan penyandang disabilitas nyata.

## Kriteria larangan klaim

Jangan tulis “sudah terintegrasi Kirimdev”, “AI Gemini siap produksi”, “backup otomatis”, atau “data di Indonesia” hanya karena demo menampilkan tombol/ikon. Tulis status `SIMULASI`, `BELUM DIVERIFIKASI`, atau `TERUJI` hanya jika terdapat bukti yang bersangkutan.
