/** Browser STT staging reference only. Do not enable with real complaints before vendor/privacy review. */
export class IndonesianDictation {
  constructor({win,onState=()=>{},onPreview=()=>{},onError=()=>{}}={}){
    this.win=win;this.onState=onState;this.onPreview=onPreview;this.onError=onError;
    this.Constructor=win?.SpeechRecognition||win?.webkitSpeechRecognition||null;
    this.recognition=null;this.consent=false;this.finalText='';this.interim='';this.seen=new Set();
    this.state=this.Constructor?'CONSENT_REQUIRED':'UNSUPPORTED';this.onState(this.state);
  }
  setConsent(granted){this.consent=granted===true;this.setState(this.consent?'READY':'CONSENT_REQUIRED');}
  setState(value){this.state=value;this.onState(value);return value;}
  start(){
    // User click and informed, explicit one-session opt-in are required.
    if(!this.Constructor)return this.setState('UNSUPPORTED');
    if(!this.consent)return this.setState('CONSENT_REQUIRED');
    if(this.win?.isSecureContext===false)return this.setState('ERROR');
    this.abort();this.finalText='';this.interim='';this.seen.clear();
    const recognizer=new this.Constructor();this.recognition=recognizer;
    recognizer.lang='id-ID';recognizer.continuous=false;
    recognizer.interimResults=true;recognizer.maxAlternatives=1;
    recognizer.onstart=()=>this.setState('LISTENING');
    recognizer.onresult=(event)=>{
      let draft='';
      for(let i=event.resultIndex||0;i<event.results.length;i++){
        const result=event.results[i];const candidate=String(result[0]?.transcript||'').trim();
        if(result.isFinal){if(!this.seen.has(i)){this.seen.add(i);this.finalText=[this.finalText,candidate].filter(Boolean).join(' ').trim();}}
        else draft=[draft,candidate].filter(Boolean).join(' ');
      }
      this.interim=draft;this.onPreview({final:this.finalText,interim:this.interim});
      this.setState('TRANSCRIBING');
    };
    recognizer.onerror=(e)=>{this.onError(e?.error||'unknown');this.setState('ERROR');};
    recognizer.onend=()=>{if(this.recognition===recognizer&&this.state!=='ERROR')this.setState(this.finalText?'REVIEW':'STOPPED');};
    this.setState('REQUESTING_PERMISSION');
    try{recognizer.start();}catch(e){this.onError(e.message||'start_failed');this.setState('ERROR');}
    return this.state;
  }
  stop(){try{this.recognition?.stop();}catch{}this.setState(this.finalText?'REVIEW':'STOPPED');}
  abort(){if(this.recognition){const old=this.recognition;this.recognition=null;try{old.abort();}catch{}}}
  useTranscript(){if(!this.finalText)return '';const result=this.finalText.trim();this.abort();this.setState('READY');this.finalText='';this.interim='';this.seen.clear();return result;}
  dispose(){this.abort();this.finalText='';this.interim='';this.seen.clear();this.setState('STOPPED');}
}
