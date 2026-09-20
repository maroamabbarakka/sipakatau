/** SIPAKATAU example only, must be integrated/reviewed by developer. */
import { AUDIO_GUIDES } from './audio-guide-catalog.mjs';

export function selectIndonesianVoice(voices = [], preferredName = '') {
  const valid = Array.from(voices).filter(v => /^id(?:-|$)/i.test(String(v?.lang || '')));
  if (!valid.length) return null;
  if (preferredName) {
    const preferred = valid.find(v => v.name === preferredName);
    if (preferred) return preferred;
  }
  return valid.find(v => /^id-id$/i.test(v.lang)) || valid[0];
}

export class IndonesianAudioGuide {
  constructor({ win, catalog = AUDIO_GUIDES, onState = () => {} } = {}) {
    this.win = win;
    this.catalog = catalog;
    this.onState = onState;
    this.synth = win?.speechSynthesis || null;
    this.VoiceUtterance = win?.SpeechSynthesisUtterance || null;
    this.status = 'UNSUPPORTED';
    this.voice = null;
    this.preferredName = '';
    this.activeUtterance = null;
    this.updateVoices = this.refreshVoices.bind(this);
    if (this.synth && this.VoiceUtterance) {
      this.refreshVoices();
      this.synth.addEventListener?.('voiceschanged', this.updateVoices);
    } else { this.report('UNSUPPORTED'); }
  }
  report(status) { this.status = status; this.onState(status); return status; }
  refreshVoices() {
    if (!this.synth) return this.report('UNSUPPORTED');
    const voices = this.synth.getVoices();
    this.voice = selectIndonesianVoice(voices, this.preferredName);
    if (!voices.length) return this.report('LOADING_VOICES');
    if (!this.voice) return this.report('NO_INDONESIAN_VOICE');
    return this.report('READY');
  }
  chooseVoice(name) { this.preferredName = name; return this.refreshVoices(); }
  speak(key, { rate = 0.96 } = {}) {
    // Must be called synchronously from an actual user's click; never during page-load/route-change.
    if (!Object.prototype.hasOwnProperty.call(this.catalog,key)) return this.report('ERROR');
    this.refreshVoices();
    if (!this.voice) return this.status; // no fallback to English/default voice
    this.synth.cancel();
    const utterance = new this.VoiceUtterance(this.catalog[key]);
    utterance.lang = 'id-ID';
    utterance.voice = this.voice;
    utterance.rate = Math.min(1.15,Math.max(0.85,Number(rate)||0.96));
    utterance.pitch = 1; utterance.volume = 1;
    utterance.onend = () => { if (this.activeUtterance === utterance) {this.activeUtterance=null; this.report('DONE');} };
    utterance.onerror = () => { if (this.activeUtterance === utterance) {this.activeUtterance=null; this.report('ERROR');} };
    this.activeUtterance = utterance;
    this.report('SPEAKING');
    this.synth.speak(utterance);
    return this.status;
  }
  pause() {if(this.status==='SPEAKING'){this.synth.pause();this.report('PAUSED');}}
  resume() {if(this.status==='PAUSED'){this.synth.resume();this.report('SPEAKING');}}
  stop() {this.synth?.cancel();this.activeUtterance=null;if(this.synth)this.report(this.voice?'READY':'NO_INDONESIAN_VOICE');}
  dispose() {this.stop();this.synth?.removeEventListener?.('voiceschanged',this.updateVoices);}
}
