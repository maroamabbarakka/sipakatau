# 06 — MATRIKS 17 KATEGORI, OPERATOR, DAN ROUTING

## Master data yang harus ada per kategori

`id`, `name`, `description`, `enabled`, `primary_operator_uid`, `backup_operator_uids`, `owner_role`, `escalation_owner`, `fallback_queue`, `rule_version`, `sla_policy_id`, `privacy_default`, `valid_from`, `valid_until`, `updated_by`, `updated_at`. Tidak boleh hardcode email atau nama pegawai ke kode route. Perubahan tidak mengganti riwayat rule pada kasus lama.

| ID | Kategori | Penanganan fungsional awal | Flag / pengecualian |
|---|---|---|---|
| K01 | Penerimaan Murid Baru | operator SPMB | tenggat pendaftaran dan jalur seleksi |
| K02 | Kekerasan dan Perundungan | perlindungan khusus | SENSITIVE_CHILD, EMERGENCY; jangan ke terlapor |
| K03 | Pungutan dan Biaya Pendidikan | pembinaan/pengawasan | RETALIATION, CONFLICT |
| K04 | Bantuan Pendidikan dan Beasiswa | bantuan pendidikan | FINANCIAL, CHILD_DATA |
| K05 | Proses dan Mutu Pembelajaran | pembinaan pendidikan | LEARNING_ACCESS |
| K06 | Administrasi dan Dokumen | administrasi pendidikan | IDENTITY_DATA, koreksi resmi |
| K07 | Akses Pendidikan dan Putus Sekolah | akses pendidikan | CHILD_RISK |
| K08 | Guru dan Tenaga Kependidikan | ketenagaan | EMPLOYEE, CONFLICT |
| K09 | Dana BOS/BOSP | pengelola BOSP | FINANCIAL, WATCHDOG |
| K10 | Sarana dan Prasarana | sarpras | SAFETY pada gedung berbahaya |
| K11 | Tata Kelola Sekolah | pembinaan sekolah | CONFLICT |
| K12 | PAUD dan Pendidikan Nonformal | PAUD/PNF | CHILD_DATA |
| K13 | Kesehatan dan Lingkungan Sekolah | koordinasi kesehatan sekolah | HEALTH, EMERGENCY |
| K14 | Perizinan dan Kelembagaan | kelembagaan | EXTERNAL_AUTHORITY bila kewenangan di luar dinas |
| K15 | Pelayanan Dinas Pendidikan | pelayanan internal | REPORTED_STAFF: alternatif independen |
| K16 | Kebudayaan dan Pelestarian | bidang sesuai SK aktual | status pending verifikasi struktur |
| K17 | Disabilitas dan Pendidikan Inklusif | inklusi/ULD jika sah | SENSITIVE, ACCESSIBILITY, koordinasi ULD |

Nama di kolom operator adalah **fungsi usulan, bukan pejabat yang telah ditetapkan**. Super admin baru boleh memilih UID nyata setelah SK penugasan tersedia.

## Algoritma routing (pseudo)

```text
intake → durable write → ticket
flags = deterministicSafetyRules(original)
if safety or child/violence: enqueue protection_review now
category = user_selected_or_approved_ai_suggestion_or_UNKNOWN
if category == UNKNOWN: owner = central_triage
else if reported_party conflicts target: owner = alternative_independent_reviewer
else if category requires special review: owner = authorized_special_queue
else: owner = config[category].primary_operator
if primary unavailable: backup operator
store assignment + case status + audit atomically
notify through outbox
```

AI tidak dapat menulis `owner_uid` final dan tidak dapat mengubah rules. Skor confidence tidak boleh menurunkan prioritas keselamatan yang telah ditetapkan deterministic rules.

## Klasifikasi ganda dan privasi

Kasus yang menyebut pungutan sekaligus diskriminasi disabilitas dapat memiliki `category_id=K17` dan `secondary_tags=[K03]`, sesuai keputusan petugas; satu penanggung jawab aktif. Masalah berulang dari beberapa orang tua dapat dihubungkan melalui `case_links` tanpa menggabungkan identitas/akses secara otomatis. Nama sekolah dan isi pesan dapat mengidentifikasi pelapor secara tidak langsung; buat versi redacted yang diperiksa manusia.

## Uji matriks wajib

- 17/17 konfigurasi memiliki owner dan backup berbeda.
- UNKNOWN → pusat; tidak hilang atau dilabel spam otomatis.
- K10 'plafon hampir jatuh' → urgent sebelum AI.
- K02 laporan terhadap kepala sekolah → tidak diarahkan kepada terlapor.
- K17 tentang penolakan murid → operator inklusi/ULD jika sah, bila belum → fallback penanggung jawab resmi, tanpa mengarang unit.
- K16 tidak dibuka produksi sebelum organisasi yang berwenang diverifikasi.
- Pergantian operator K03 berlaku pada tiket baru; tiket lama menyimpan histori penugasan dan versi rule lama.
