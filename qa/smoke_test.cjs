/* Node smoke test for the synthetic, dependency-free SIPAKATAU SPA.
 * Tests actual render output and key deterministic rules with a lightweight DOM stub.
 * Browser visual/UAT testing remains a separate developer obligation. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const dir = path.resolve(__dirname, '..');
const store = new Map();
const listeners = {};
const actions = {};
const root = {innerHTML:'', addEventListener(event, handler){actions[event] = handler;}};
const location = {hash:'#/'};
const doc = {
  getElementById(id){return id==='app'?root:null;},
  querySelectorAll(){return [];},
  querySelector(){return null;},
  createElement(){return {className:'',style:{},setAttribute(){},remove(){},click(){},textContent:'',href:'',download:''};},
  body:{appendChild(){}},
};
const context = vm.createContext({
  window:{addEventListener(event,handler){listeners[event] = handler;},scrollTo(){}},
  document:doc,location,
  localStorage:{getItem:key=>store.get(key)||null,setItem:(key,v)=>store.set(key,v)},
  crypto:require('node:crypto').webcrypto,structuredClone,
  requestAnimationFrame:(handler)=>handler(),
  setTimeout:(handler)=>{},
  console,URL,Blob,Date,Math,Number,String,Array,Object,JSON,
  navigator:{clipboard:null},confirm:()=>true,prompt:()=> 'Keterangan contoh pengaduan',
  FormData:class FormData{constructor(f){this.store=new Map(Object.entries(f?.data||{}))}get(key){return this.store.get(key)||null}},
});
function check(name, fn){try{fn();console.log('PASS',name);}catch(e){console.error('FAIL',name,'—',e.message);process.exitCode=1;}}
vm.runInContext(fs.readFileSync(path.join(dir,'js/data.js'),'utf8'),context,{filename:'data.js'});
vm.runInContext(fs.readFileSync(path.join(dir,'js/app.js'),'utf8'),context,{filename:'app.js'});
function navigate(route){location.hash='#'+route;listeners.hashchange();return root.innerHTML;}
let test=context.window.SIPAKATAU_TEST;
check('17 distinct categories, 34 synthetic initial cases',()=>{
 assert.equal(test.categories().length,17);
 assert.equal(new Set(test.categories().map(c=>c.id)).size,17);
 assert.equal(test.getState().cases.length,34);
});
const publicRoutes=['/','/pengaduan','/lacak','/panduan','/bantuan-anak','/aksesibilitas','/privasi','/demo-whatsapp','/login'];
check('all nine public routes render branded content',()=>{
 for(const route of publicRoutes){const html=navigate(route);assert.match(html,/SIPAKATAU|Sipakatau/i,route);assert.ok(html.length>800,route+' '+html.length)}
});
check('public form has four stages and anonymous option',()=>{
 test.getState().step=0;let html=navigate('/pengaduan');assert.match(html,/kategori|masalah/i);test.getState().step=2;html=navigate('/pengaduan');assert.match(html,/NO_ID_FORM|Tanpa identitas/i);test.getState().step=3;html=navigate('/pengaduan');assert.ok(html.length>1000);
});
check('dashboard routes covered for operator pusat',()=>{
 test.getState().role='OPERATOR_PUSAT';
 for(const route of ['/dashboard','/dashboard/inbox','/dashboard/cases','/dashboard/assignments','/dashboard/escalations','/dashboard/whatsapp','/dashboard/reports','/dashboard/ai']){
 const html=navigate(route);assert.ok(html.length>900,route);assert.doesNotMatch(html,/Halaman ini tidak tersedia untuk peran demo/,route)}
});
check('all available staff roles render dashboard',()=>{
 for(const role of context.window.SIP_DATA.roles){test.getState().role=role.id;assert.ok(navigate('/dashboard').length>800,role.id)}
});
check('super-admin configuration routes render and role restrictions apply',()=>{
 test.getState().role='SUPER_ADMIN';
 for(const route of ['/dashboard/admin/categories','/dashboard/admin/schools','/dashboard/admin/users','/dashboard/admin/settings','/dashboard/admin/backup','/dashboard/admin/audit']){
 assert.ok(navigate(route).length>700,route)}
 test.getState().role='PIMPINAN';assert.match(navigate('/dashboard/admin/categories'),/Akses dibatasi/);
 assert.equal(test.canBrowse(test.getState().cases[0]),false);
});
check('operator cannot see another category and sensitive K02 protected',()=>{
 test.getState().role='OPERATOR_KATEGORI';test.getState().operatorCategory='K03';
 assert.equal(test.canBrowse(test.getState().cases.find(c=>c.category==='K02')),false);
 assert.equal(test.canBrowse(test.getState().cases.find(c=>c.category==='K03')),true);
 const k02=test.getState().cases.find(c=>c.category==='K02');
 assert.match(navigate('/dashboard/cases/'+k02.id),/akses kasus dibatasi|permission denied|Akses ditolak/i);
});
check('cost baseline and paid-service floor',()=>{
 const params={...test.getState().cost,aiEligible:0};
 let r=test.calculate(params);assert.equal(Math.round(r.total),316250);
 params.n=3000;params.wa=100;params.service=2;params.utility=1;
 r=test.calculate(params);assert.equal(r.paid,5000);assert.equal(Math.round(r.meta),2853200);
});
check('four-step form creates one simulated ticket before any AI run',()=>{
 test.reset();const state=test.getState();state.formDraft.category='K10';state.formDraft.description='[FIKTIF] Toilet sekolah contoh rusak dan fasilitas tidak berfungsi.';state.formDraft.adult=true;state.formDraft.ack=true;state.step=3;
 const before=state.cases.length;const old=state.lastTicket;
 actions.click({target:{closest:(sel)=>sel==='[data-action]'?{dataset:{action:'wizard-next'}}:null},preventDefault(){}});
 assert.equal(state.cases.length,before+1);assert.notEqual(state.lastTicket,old);
 assert.equal(state.cases[0].ai,null);assert.equal(state.cases[0].category,'K10');
 assert.match(navigate('/pengaduan'),/Nomor tiket Anda/);
});
check('WhatsApp two messages group into one ticket; delivery does not create case',()=>{
 test.reset();const state=test.getState();state.role='OPERATOR_PUSAT';navigate('/dashboard/whatsapp');
 const firstCount=state.cases.length;
 const send=text=>actions.submit({target:{id:'wa-form',data:{text}},preventDefault(){}});
 send('[FIKTIF] Atap sekolah contoh rusak hampir jatuh, membutuhkan pemeriksaan.');
 assert.equal(state.cases.length,firstCount+1);const firstId=state.cases[0].id;
 send('Pesan tambahan: sudah dicatat pihak sekolah.');
 assert.equal(state.cases.length,firstCount+1);assert.equal(state.cases[0].id,firstId);
 assert.equal(state.cases[0].messages.length,2);
 actions.click({target:{closest:(sel)=>sel==='[data-action]'?{dataset:{action:'wa-delivery'}}:null},preventDefault(){}});
 assert.equal(state.cases.length,firstCount+1);
});
check('staging-only signals: no live credentials or external JavaScript dependencies',()=>{
 const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
 assert.match(html,/data simulasi/i);
 const htmlWithoutOwnedPreviewMeta=html.replace(/https:\/\/sipakatau-uiux-v21\.web\.app[^"']*/gi,'');
 assert.doesNotMatch(htmlWithoutOwnedPreviewMeta,/https?:\/\//);
 assert.doesNotMatch(fs.readFileSync(path.join(dir,'js/app.js'),'utf8'),/fetch\s*\(/);
});
if(process.exitCode){console.error('Smoke tests failed.');process.exit(process.exitCode)}
console.log('SEMUA UJI SMOKE LULUS. Ini bukan pengganti uji browser, keamanan, aksesibilitas atau produksi.');
