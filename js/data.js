/* Data SINTETIS untuk demo saja. Jangan isi nomor telepon, NIK, atau data penduduk nyata di berkas ini. */
window.SIP_DATA = (() => {
const categories = [
 ['K01','Penerimaan Murid Baru','SPMB','pendaftaran, kuota, jalur, hasil seleksi'],
 ['K02','Kekerasan dan Perundungan','Perlindungan khusus','perundungan, kekerasan, intimidasi'],
 ['K03','Pungutan dan Biaya Pendidikan','Pembinaan dan pengawasan','biaya, pungutan, komite, seragam'],
 ['K04','Bantuan Pendidikan dan Beasiswa','Bantuan pendidikan','PIP, bantuan, beasiswa, penyaluran'],
 ['K05','Proses dan Mutu Pembelajaran','Pembinaan pendidikan','guru, jam pelajaran, pembelajaran'],
 ['K06','Administrasi dan Dokumen','Administrasi pendidikan','NISN, ijazah, rapor, data'],
 ['K07','Akses Pendidikan dan Putus Sekolah','Akses pendidikan','anak putus sekolah, akses, ekonomi'],
 ['K08','Guru dan Tenaga Kependidikan','Ketenagaan','tunjangan, guru, penempatan'],
 ['K09','Dana BOS/BOSP','Pengelola BOSP','pengadaan, laporan, dana BOSP'],
 ['K10','Sarana dan Prasarana','Sarana prasarana','atap, ruang kelas, bangunan, toilet'],
 ['K11','Tata Kelola Sekolah','Pembinaan sekolah','komite, kepala sekolah, keputusan'],
 ['K12','PAUD dan Pendidikan Nonformal','PAUD dan PNF','PAUD, PKBM, kesetaraan'],
 ['K13','Kesehatan dan Lingkungan Sekolah','Koordinasi kesehatan sekolah','sanitasi, pangan, kesehatan'],
 ['K14','Perizinan dan Kelembagaan','Kelembagaan','izin, legalitas, kelembagaan'],
 ['K15','Pelayanan Dinas Pendidikan','Pelayanan internal','layanan dinas, pegawai, keterlambatan'],
 ['K16','Kebudayaan dan Pelestarian','Kebudayaan (validasi struktur)','kebudayaan, pelestarian, kegiatan seni'],
 ['K17','Disabilitas dan Pendidikan Inklusif','Inklusi/ULD (validasi)','akomodasi, aksesibilitas, inklusi, disabilitas']
].map(([id,name,owner,keywords])=>({id,name,owner,keywords:keywords.split(', '),primary:'Operator '+id,backup:'Cadangan '+id,enabled:true,validFrom:'2026-09-19'}));
const schools = [
 {id:'S001',name:'SD Contoh A (fiktif)',level:'SD',district:'Watang Sawitto',verified:false},
 {id:'S002',name:'SMP Contoh B (fiktif)',level:'SMP',district:'Paleteang',verified:false},
 {id:'S003',name:'PAUD Contoh C (fiktif)',level:'PAUD',district:'Mattiro Bulu',verified:false},
 {id:'S004',name:'PKBM Contoh D (fiktif)',level:'NONFORMAL',district:'Duampanua',verified:false}
];
const statuses = {RECEIVED:'Diterima',TRIAGE:'Triase',NEEDS_INFO:'Perlu informasi',ASSIGNED:'Didisposisikan',IN_PROGRESS:'Dalam penanganan',WAITING_EXTERNAL:'Menunggu pihak terkait',ESCALATED:'Dieskalasi',RESOLUTION_REVIEW:'Verifikasi hasil',RESOLVED:'Terselesaikan',CLOSED:'Ditutup',REFERRED:'Dirujuk',REOPENED:'Dibuka kembali',APPEAL_LINKED:'Keberatan diajukan'};
const summary = [
 'Pelapor menyampaikan kendala administrasi yang memerlukan pemeriksaan petugas.',
 'Pelapor mengadukan hambatan pelayanan pendidikan pada satuan pendidikan.',
 'Pelapor meminta pemeriksaan dan informasi tindak lanjut sesuai kewenangan dinas.',
 'Pelapor menyampaikan dugaan masalah. Kebenaran pernyataan belum diverifikasi.'
];
const statusesList=['RECEIVED','TRIAGE','ASSIGNED','IN_PROGRESS','NEEDS_INFO','WAITING_EXTERNAL','RESOLUTION_REVIEW','RESOLVED','CLOSED','ESCALATED'];
const cases=categories.flatMap((cat,i)=>[0,1].map((n)=>{
 const id=`demo-${String(i*2+n+1).padStart(3,'0')}`;
 const priority=cat.id==='K02'||(cat.id==='K10'&&n===0)?'CRITICAL':n===1?'HIGH':'NORMAL';
 const status=statusesList[(i*2+n)%statusesList.length];
 const privacy=(cat.id==='K02'||cat.id==='K03'||cat.id==='K17')?'PROTECTED':n===1?'NO_ID_FORM':'STANDARD_RESTRICTED';
 const received=new Date(Date.UTC(2026,8,14+(i%6),8+(i%7),15));
 return {id,ticket:`SIP-2026-${String(i*2+n+1).padStart(4,'0')}`,category:cat.id,secondary:cat.id==='K17'?['K02']:[],title:cat.name+' — '+(n?'Permintaan tindak lanjut':'Laporan awal'),description:`[DATA FIKTIF] ${summary[(i+n)%summary.length]} Kategori ${cat.name}.`,school:schools[(i+n)%schools.length].id,level:schools[(i+n)%schools.length].level,privacy,priority,status,channel:(i+n)%2?'FORM':'WHATSAPP',owner:status==='RECEIVED'||status==='TRIAGE'?'':'Operator '+cat.id,received:received.toISOString(),updated:received.toISOString(),messages:[{by:'pelapor',text:'[DATA FIKTIF] '+summary[(i+n)%summary.length],at:received.toISOString()}],history:[{action:'Pengaduan diregistrasi',by:'Sistem simulasi',at:received.toISOString()}],ai:null,assigneeConflict:false,tracking:`DEMO-${String(i*2+n+1).padStart(4,'0')}-AMAN`,notice:'Belum dikirim',deadline:'2026-09-24T08:00:00Z'};
}));
const roles=[{id:'PIMPINAN',name:'Pimpinan',description:'Statistik agregat dan eskalasi'},{id:'SUPER_ADMIN',name:'Super Admin',description:'Konfigurasi sistem, bukan identitas privat'},{id:'OPERATOR_PUSAT',name:'Operator Pusat',description:'Triase dan disposisi lintas kategori sesuai tugas'},{id:'OPERATOR_KATEGORI',name:'Operator Kategori',description:'Hanya kasus yang ditugaskan'},{id:'PERLINDUNGAN',name:'Petugas Perlindungan',description:'Kasus sensitif yang ditugaskan'}];
const faqs=[['Apakah NIK atau KTP wajib?','Tidak untuk pengaduan umum. Data tambahan hanya diminta jika benar-benar diperlukan untuk layanan tertentu.'],['Bisakah melapor tanpa identitas?','Bisa melalui formulir daring dengan pilihan tanpa identitas dan kode akses rahasia.'],['Apakah WhatsApp anonim?','Tidak sepenuhnya. Nomor pengirim diketahui oleh layanan komunikasi; mode identitas terlindungi menyembunyikan kontak dari operator kategori.'],['Apa yang terjadi jika AI tidak tersedia?','Tiket tetap dibuat. Pengaduan diproses oleh aturan kategori atau operator pusat.'],['Bagaimana jika anak membutuhkan bantuan segera?','Kasus keselamatan harus dapat diterima/dirujuk tanpa hambatan registrasi. Cari bantuan darurat atau layanan perlindungan resmi yang tersedia.'],['Sekolah SMA/SMK termasuk?','Di luar kewenangan utama kabupaten; laporan terkait diarahkan melalui prosedur rujukan yang disahkan.']];
return {categories,schools,statuses,cases,roles,faqs};
})();
