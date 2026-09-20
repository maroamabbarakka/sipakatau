import assert from 'node:assert/strict';
import { selectIndonesianVoice, IndonesianAudioGuide } from '../examples/voice-guide.mjs';
import { IndonesianDictation } from '../examples/voice-dictation.mjs';

const voices=[{name:'English',lang:'en-US'},{name:'Indonesia',lang:'id-ID'},{name:'Indonesian alt',lang:'id'}];
assert.equal(selectIndonesianVoice(voices).name,'Indonesia');
assert.equal(selectIndonesianVoice(voices,'Indonesian alt').name,'Indonesian alt');
assert.equal(selectIndonesianVoice([{name:'English',lang:'en-US'}]),null);
assert.equal(selectIndonesianVoice([{name:'Malay',lang:'ms-MY'}]),null);
let active=null;
class FakeUtterance {constructor(text){this.text=text;}}
const synth={speaks:[], getVoices:()=>voices,cancel(){active=null},speak(u){active=u;this.speaks.push(u)},pause(){},resume(){},addEventListener(){},removeEventListener(){}};
let states=[];
const guide=new IndonesianAudioGuide({win:{speechSynthesis:synth,SpeechSynthesisUtterance:FakeUtterance},onState:s=>states.push(s)});
assert.equal(guide.speak('home'),'SPEAKING');
assert.equal(synth.speaks[0].lang,'id-ID');
assert.equal(synth.speaks[0].voice.lang,'id-ID');
assert.match(synth.speaks[0].text,/Buat Pengaduan/);
guide.stop();assert.equal(active,null);guide.dispose();
let badGuide=new IndonesianAudioGuide({win:{speechSynthesis:{...synth,getVoices:()=>[{lang:'en-US',name:'English'}]},SpeechSynthesisUtterance:FakeUtterance}});
assert.equal(badGuide.speak('home'),'NO_INDONESIAN_VOICE');
class FakeRecognizer { start(){this.onstart?.()}stop(){this.onend?.()}abort(){} }
let preview;
const stt=new IndonesianDictation({win:{SpeechRecognition:FakeRecognizer,isSecureContext:true},onPreview:p=>preview=p});
assert.equal(stt.start(),'CONSENT_REQUIRED');
stt.setConsent(true);stt.start();assert.equal(stt.recognition.lang,'id-ID');
stt.recognition.onresult({resultIndex:0,results:[Object.assign([{transcript:'Sekolah perlu ramp'}],{isFinal:false})]});
assert.equal(stt.finalText,'');
stt.recognition.onresult({resultIndex:0,results:[Object.assign([{transcript:'Sekolah perlu ram'}],{isFinal:true})]});
assert.equal(stt.finalText,'Sekolah perlu ram');
assert.equal(stt.useTranscript(),'Sekolah perlu ram');
assert.equal(stt.finalText,'');
assert.equal(new IndonesianDictation({win:{}}).start(),'UNSUPPORTED');
console.log('VOICE TESTS PASS: TTS id-ID voice selection; no English/Malay fallback; user-triggered guide; STT consent, id-ID, interim not committed, final review, unsupported fallback.');
