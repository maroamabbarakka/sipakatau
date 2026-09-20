# 05 — DASHBOARD, PENUGASAN, HAK AKSES DAN PERJALANAN PETUGAS

## Matriks peran

| Peran | Baca rekap | Detail kasus | Kontak privat | Kelola rule | Penutupan |
|---|---|---|---|---|---|
| Pimpinan | seluruh agregat berwenang | hanya jika ditugaskan formal | tidak default | tidak | persetujuan sesuai SOP |
| Super admin | statistik teknis | **tidak default** | tidak default | ya, review perubahan | tidak otomatis |
| Operator pusat | antrean pusat dan kasus yang ditugaskan | sesuai penugasan | seperlunya sesuai policy | koreksi/assign sesuai delegasi | reviewer jika didelegasikan |
| Operator kategori Kxx | kategori dan kasus assigned | assigned saja | **tidak** pada mode PROTECTED | usulan | usulkan selesai |
| Petugas perlindungan | kasus sensitif yang ditugaskan | sesuai penugasan dan tujuan | proses khusus | rujukan khusus | sesuai SOP |
| Identity custodian | seperlunya | hanya untuk proses identitas | boleh unlock terbatas + reason | tidak | tidak |

Demo mencakup lima peran pertama; identity custodian harus diimplementasikan produksi sebagai peran terpisah dengan 2-person review bila diperlukan. Role selector pada `#/login` hanya kontrol UX untuk menguji variasi. Di produksi role bukan pilihan pengguna dan tidak bisa disimpan di localStorage.

## Skenario pimpinan

Login PIMPINAN → KPI kasus unik, open, kritis, selesai → distribusi kategori → daftar prioritas aman → laporan agregat → simulasi biaya. Pada akses langsung `#/dashboard/cases/demo-001`, aplikasi harus menampilkan akses ditolak; backend `GET /v1/cases/{id}` wajib menolak pula. Jangan tampilkan nama anak, alamat, kronologi privat atau ranking sekolah dari tuduhan.

## Skenario operator pusat

Login OPERATOR_PUSAT → Kotak Masuk → buka kasus status TRIAGE → periksa tab pesan asli/privasi/risk → koreksi kategori jika perlu → tentukan owner sesuai kategori+konflik kepentingan → assign → operator melakukan tindakan. Untuk kategori UNKNOWN, kasus tetap tercatat dan menunggu triase, bukan error 422 karena kategori belum diisi. Untuk kasus K02/K17 sensitif, petugas pusat harus memeriksa jalur khusus sebelum menyerahkan detail.

## Skenario operator kategori

Login OPERATOR_KATEGORI dan pilih K03 (demo) → daftar hanya kasus `category=K03` dan `owner=Operator K03` → detail K03 → mulai pekerjaan → menyusun balasan → ajukan verifikasi hasil. Akses K10 atau kasus K03 yang bukan assigned harus ditolak. Operator tidak boleh memperoleh nomor WA melalui respons JSON, ekspor, attachment metadata, error debug atau log.

## Skenario petugas perlindungan

Login PERLINDUNGAN → kasus K02 yang ditugaskan atau multi-tag terkait K02 → penilaian risiko → koordinasi sesuai prosedur → progres terbatas. Jangan menampilkan detail kepada operator umum yang berkaitan dengan terlapor. Jika sumber utama K17 sekaligus K02, sediakan satu pemilik penanganan dan multi-tag; jangan membuat dua perkara otomatis untuk satu kejadian.

## Detail kasus: interaksi yang wajib diuji

Header: nomor tiket, badge status, risk, channel, privacy, category, owner, deadline versi SOP. Tab Ringkasan, Pesan Asli, Riwayat, Bukti, Penugasan, Balasan, Aturan/AI. Sediakan opsi `claim`, `assign`, `transfer`, `request info`, `reply`, `escalate`, `propose resolution`, `approve`, `close`, `reopen`, `appeal`, `refer` sesuai kewenangan. **Demo menampilkan subset aksi yang bisa dilakukan**; fungsi `refer`, `unlock identity`, pengecekan lampiran, dan persetujuan dua orang wajib dibangun pada produksi sesuai persyaratan, tidak boleh diklaim telah jadi berdasarkan demo.

## Conflict of interest dan tidak adanya penanggung jawab

Setiap assignment melakukan pemeriksaan pihak terlapor, unit, pengelola, dan operator tujuan; apabila konflik ditemukan, masukkan antrean pejabat alternatif. Jika owner cuti/nonaktif atau waktu habis, sistem mengirim alarm ke backup/escalation owner, tetapi tidak menghapus kepemilikan historis. Satu kasus hanya satu pemilik aktif dengan banyak tugas pendukung.

## Laporan pimpinan

KPI: messages_received, unique_cases, open_cases, resolved_cases, late_cases, first_response_median, resolution_median, routing_corrections, escalation_count, privacy_incidents. Definisikan denominator, periode, timezone, tanggal pembaruan, dan kebijakan suppress kelompok kecil. Grafik hanya memakai hasil query database yang berhak diakses; Gemini tidak boleh mengarang angka.
