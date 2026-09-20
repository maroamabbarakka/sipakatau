/* G4 TTS adapter. User-triggered only; no English fallback and no case-content speech. */
(() => {
  'use strict';
  const catalog = window.SIP_AUDIO_GUIDES || {};
  const state = { status: 'UNSUPPORTED', voice: null, utterance: null };
  const synth = window.speechSynthesis;
  const Utterance = window.SpeechSynthesisUtterance;
  const validVoice = voice => /^id(?:-|$)/i.test(String(voice?.lang || ''));
  const report = value => { state.status = value; window.dispatchEvent(new CustomEvent('sip-audio-state', { detail: value })); return value; };
  const refresh = () => {
    if (!synth || !Utterance) return report('UNSUPPORTED');
    const voices = synth.getVoices();
    state.voice = voices.filter(validVoice).find(v => /^id-id$/i.test(v.lang)) || voices.find(validVoice) || null;
    if (!voices.length) return report('LOADING_VOICES');
    return report(state.voice ? 'READY' : 'NO_INDONESIAN_VOICE');
  };
  const stop = () => { synth?.cancel(); state.utterance = null; return refresh(); };
  const speak = key => {
    if (!Object.prototype.hasOwnProperty.call(catalog, key)) return report('ERROR');
    refresh(); if (!state.voice) return state.status; stop();
    const utterance = new Utterance(catalog[key]);
    utterance.lang = 'id-ID'; utterance.voice = state.voice; utterance.rate = .96; utterance.pitch = 1; utterance.volume = 1;
    utterance.onend = () => { if (state.utterance === utterance) { state.utterance = null; report('DONE'); } };
    utterance.onerror = () => { if (state.utterance === utterance) { state.utterance = null; report('ERROR'); } };
    state.utterance = utterance; report('SPEAKING'); synth.speak(utterance); return state.status;
  };
  window.SIPAudioGuide = Object.freeze({ refresh, speak, pause: () => { synth?.pause(); report('PAUSED'); }, resume: () => { synth?.resume(); report('SPEAKING'); }, stop, state });
  if (synth && Utterance) { synth.addEventListener?.('voiceschanged', refresh); refresh(); } else report('UNSUPPORTED');
  window.addEventListener('pagehide', stop);
  window.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
})();
