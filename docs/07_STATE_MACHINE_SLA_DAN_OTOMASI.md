# 07 — STATE MACHINE, STANDAR WAKTU, DAN AUTOMATION ENGINE

## Status internal

`RECEIVED → TRIAGE → ASSIGNED → IN_PROGRESS → RESOLUTION_REVIEW → RESOLVED → CLOSED`. Jalur tambahan: `NEEDS_INFO`, `WAITING_EXTERNAL`, `REFERRED`, `ESCALATED`, `APPEAL_LINKED`, `REOPENED`. Semua perubahan harus tercatat `from`, `to`, `actor`, `reason`, `approved_by` bila perlu, `timestamp`, `rule_version`, `request_id`. Tidak ada operasi DELETE untuk jejak asli.

| Transisi | Pelaku | Prasyarat |
|---|---|---|
| RECEIVED → TRIAGE | sistem / pusat | tiket durable dan intake tersimpan |
| TRIAGE → ASSIGNED | rules/pusat | kategori sah, owner aman dan bebas konflik |
| ASSIGNED → IN_PROGRESS | operator assigned | penugasan diakui |
| IN_PROGRESS → NEEDS_INFO | operator assigned | permintaan info relevan dan alasan |
| IN_PROGRESS → WAITING_EXTERNAL | operator | instansi tujuan/bukti rujukan tercatat |
| IN_PROGRESS → RESOLUTION_REVIEW | operator | bukti pekerjaan/hasil dilampirkan |
| RESOLUTION_REVIEW → RESOLVED | reviewer berwenang | verifikasi hasil, reason, approval |
| RESOLVED → CLOSED | sistem/petugas sesuai SOP | pemberitahuan hasil tercatat |
| ANY OPEN → ESCALATED | aturan/pejabat | bahaya, tenggat, konflik atau kebutuhan kewenangan |
| CLOSED → REOPENED | petugas sesuai prosedur | reason dan authority |
| RESOLVED/CLOSED → APPEAL_LINKED | pelapor/role | tiket keberatan baru terkait parent |

Tidak semua panah berarti otomatis diloloskan. Enforcement dilakukan backend per role/assignment/case-version. Optimistic concurrency atau transaksi mencegah dua operator menutup/mengubah owner bersamaan; jawab `409` pada conflict.

## SLA dan notifikasi

Simpan `sla_policy_id`, `sla_version`, `start_event`, `first_response_deadline`, `resolution_deadline`, `work_calendar_id`, `pause_policy`. Syarat dan angka SLA **berasal dari SOP yang disahkan**, bukan dari simulasi UI. Kalender kerja, libur, jam layanan dan on-call kasus kritis harus didefinisikan bersama pemilik layanan. Jangan menjanjikan penyelesaian 24 jam bagi seluruh kategori.

**Scheduler:** tiap interval terukur membaca indeks kasus yang mendekati/melewati deadline, membuat event idempotent, alarm internal; ketika operator tak aktif arahkan ke backup; ketika eskalasi kritis, kirim ke petugas khusus. Jika scheduler mati satu hari, lakukan catch-up berdasarkan `next_due_at`, bukan melewati notifikasi historis tanpa catatan.

## Ketahanan dan fallback

- Intake saved tetapi worker/AI mati: status `PENDING_TRIAGE`, tiket tetap ada, alarm pusat.
- Kirimdev gagal outbound: status `DELIVERY_PENDING` pada outbox, hindari send ganda, informasikan portal pelacakan.
- Firestore gagal sebelum save: jangan beri 2xx webhook atau mengaku tiket sukses.
- Operator salah kategori: transfer dengan riwayat old/new/rule version; jangan overwrite.
- Backup gagal: alarm teknis dan evaluasi go-live; jangan mengklaim tersedia backup teruji.

## Skenario penyalahgunaan dan pencegahannya

Form yang dikirim ulang dengan idempotency key sama harus mengembalikan tiket yang sama. Laporan serupa dari dua korban adalah tiket berbeda dengan potential link (tidak di-merge otomatis). Pesan status WA `read/delivered` tidak membuat tiket. Penutupan oleh AI dilarang. Token pelacakan tidak pernah di URL atau catatan operasional.
