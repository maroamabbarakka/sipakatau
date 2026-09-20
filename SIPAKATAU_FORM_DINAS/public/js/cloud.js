/* Modul penyimpanan internal. Tidak aktif ketika firebase-config.js berisi null. */
const cfg=window.SIP_FIREBASE_CONFIG;
if(cfg?.apiKey&&cfg?.projectId&&cfg?.appId){
  const [{initializeApp},A,F]=await Promise.all([
    import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js')
  ]);
  const app=initializeApp(cfg),auth=A.getAuth(app),db=F.getFirestore(app);
  const bridge=window.SIP_REQUIREMENTS;
  const gate=document.getElementById('login-gate'),form=document.getElementById('login-form'),msg=document.getElementById('login-error'),save=document.getElementById('cloud-save');
  let user=null;
  A.onAuthStateChanged(auth,async u=>{
    user=null;gate.hidden=false;
    if(!u)return;
    try{
      const acc=await F.getDoc(F.doc(db,'staff_access',u.uid));
      if(!acc.exists()||acc.data().active!==true||!['editor','admin'].includes(acc.data().role)){
        msg.textContent='Akun ini belum diberi izin. Hubungi pengelola.';await A.signOut(auth);return;
      }
      user=u;const snap=await F.getDoc(F.doc(db,'discovery_forms','main'));
      if(snap.exists()){
        bridge.setData(snap.data().payload);
        bridge.setRevision(snap.data().revision||0);
        bridge.setCloudState('Jawaban sebelumnya berhasil dimuat.');
      }else bridge.setCloudState('Belum ada jawaban tersimpan. Isi lalu simpan.');
      gate.hidden=true;
    }catch(e){msg.textContent='Belum berhasil memuat data. Periksa koneksi dan hak akses.';console.warn('Firebase load',e.code||e.message)}
  });
  form.addEventListener('submit',async e=>{e.preventDefault();msg.textContent='';const btn=form.querySelector('button');btn.disabled=true;try{await A.signInWithEmailAndPassword(auth,document.getElementById('login-email').value.trim(),document.getElementById('login-password').value);document.getElementById('login-password').value=''}catch(e){msg.textContent='Email atau kata sandi tidak sesuai, atau akses belum tersedia.'}finally{btn.disabled=false}});
  save.addEventListener('click',async()=>{
    if(!user){bridge.setCloudState('Silakan masuk terlebih dahulu.');return}
    const payload=bridge.getData();const bytes=new TextEncoder().encode(JSON.stringify(payload)).length;
    if(bytes>180000){bridge.setCloudState('Isian terlalu panjang. Kurangi catatan sebelum menyimpan.');return}
    save.disabled=true;bridge.setCloudState('Menyimpan ...');
    try{
      const ref=F.doc(db,'discovery_forms','main');
      const rev=await F.runTransaction(db,async tx=>{
        const snap=await tx.get(ref),prev=snap.exists()?(snap.data().revision||0):0;
        if(prev!==bridge.getRevision())throw Error('CONFLICT');
        tx.set(ref,{schema_version:'2.0',payload,revision:prev+1,updated_at:F.serverTimestamp(),updated_by:user.uid});return prev+1;
      });
      bridge.setRevision(rev);bridge.setCloudState('Tersimpan di Firebase. Ini masih draf, bukan persetujuan resmi.');
    }catch(e){bridge.setCloudState(e.message==='CONFLICT'?'Jawaban telah diperbarui petugas lain. Salin jawaban Anda melalui unduh JSON, lalu muat ulang halaman untuk menghindari penimpaan.':'Gagal menyimpan. Unduh JSON sebagai salinan, lalu periksa koneksi dan hak akses.');}
    finally{save.disabled=false}
  });
}
