# 13 — BACKUP, MONITORING, INCIDENT RESPONSE DAN KONTINUITAS

## Apa yang harus dapat dipulihkan

Bukan hanya koleksi `cases`: termasuk intake events, case messages original, assignment, history/audit, tracking token hash aktif, identity vault, school/categories/routing policies, SLA versi, outbox, status pesan vendor, storage objects lampiran dan metadata scan. Pemulihan sebagian tanpa referensi dokumen dan vault adalah gagal.

## Dua opsi teknis, keputusan harus eksplisit

**Opsi 1:** Firebase Blaze dengan mekanisme native backup/restore Firestore yang disetujui biaya, lokasi dan retensi, ditambah backup privat storage/secret metadata yang benar. **Opsi 2:** Spark dengan ekspor custom konsisten yang memenuhi high-water mark, replay log/event, manifest/checksum, enkripsi, tujuan terpisah, kebijakan restore dan bukti uji. Opsi 2 **tidak boleh diklaim setara PITR/native backup** tanpa bukti. Jika restore tidak lulus, tahan go-live.

## Runbook pemulihan minimal

1. Deklarasikan insiden: waktu mulai, pemilik komando, status intake, dampak privasi dan keselamatan.
2. Bekukan mutasi berisiko jika diperlukan; pertahankan penerimaan melalui antrean durable yang disetujui.
3. Identifikasi titik pemulihan dari manifest/checksum; verifikasi kunci dan otorisasi restore.
4. Restore ke lingkungan isolasi → validasi referensi kasus↔pesan↔lampiran↔vault↔outbox.
5. Replay perubahan setelah high-water mark dengan idempotency; hindari pengiriman WA ganda.
6. Rekonsiliasi jumlah tiket, timeline, counters, owner, pending messages dan data file.
7. Jalankan tests keamanan dan izin sebelum membuka layanan normal.
8. Catat RPO/RTO aktual, root cause, CAPA dan persetujuan kembali operasional.

Contoh target RPO 24 jam dan RTO 8 jam dalam masterplan **hanya usulan**; target produksi ditetapkan melalui analisis risiko dan kebutuhan layanan darurat. Restore drill minimal kuartalan dan setelah perubahan arsitektur besar, dengan laporan waktu dan checksum.

## Observability

- **Kirimdev:** inbound event, signature failures, ACK latency, dedupe count, retry/429, outbox pending, delivery states, biaya per kategori pesan.
- **Backend:** availability, p95 form intake, p95 webhook ACK, latensi query, transaksi gagal, job stuck, queue depth, CPU/memory, cold start.
- **Firestore:** read/write per fitur, storage, composite indexes, quota headroom, backup success.
- **AI:** enabled/gated, request/429/timeout/schema failure, latency, token dan biaya; PII scrub failures.
- **Keamanan:** denied access, unusual unlock, export volume, secret rotation, object access, account lockout.
- **Pelayanan:** ticket count, unassigned queue, owner backup trigger, SLA deadline, critical intervention, reconciliation dashboard counters.

Log teknis jangan menyimpan isi kronologi, nomor WA, NIK, kode pelacakan, token API, atau nama anak. Correlation ID acak dan status error cukup untuk diagnosis awal.

## Alert dan escalation

| Signal | Tindakan |
|---|---|
| webhook database persist gagal | alarm teknis, retriable failure ke vendor |
| critical case tanpa owner | alarm petugas perlindungan/atasan sesuai SOP |
| outbox menumpuk | alarm pusat, portal status tetap berfungsi |
| Gemini 429 | AI-only fallback, laporan tetap diterima |
| Firestore quota mendekati batas | optimalkan query, alert budget, rencana peningkatan kapasitas |
| backup gagal | perbaiki, uji ulang, evaluasi kelayakan go-live |
| akses privat tidak sah | lock/revoke, catat insiden dan prosedur pemberitahuan hukum |

## Handoff operasional

Serahkan pemilik akun vendor, nomor WA, domain, source repository, service accounts, secret ownership, IAM matrix, rollback playbook, dashboard monitoring, insiden, restore, jadwal rotasi, dan daftar petugas on-call. Tidak cukup hanya menyerahkan ZIP source code.
