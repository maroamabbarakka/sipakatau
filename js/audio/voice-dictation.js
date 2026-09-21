/* G5 staging-only STT. Disabled by default; no raw audio persistence or auto-submit. */
(() => {
  'use strict';
  const enabled = window.SIP_FEATURE_VOICE_DICTATION === true;
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  const state = { status: enabled && Ctor ? 'CONSENT_REQUIRED' : 'UNSUPPORTED', finalText: '', interim: '' };
  let recognition = null; let consent = false; const seen = new Set();
  const report = value => { state.status = value; window.dispatchEvent(new CustomEvent('sip-dictation-state', { detail: value })); return value; };
  const abort = () => { try { recognition?.abort(); } catch {} recognition = null; };
  const setConsent = value => { consent = value === true; return report(consent ? 'READY' : 'CONSENT_REQUIRED'); };
  const start = () => {
    if (!enabled || !Ctor) return report('UNSUPPORTED');
    if (!consent) return report('CONSENT_REQUIRED');
    if (window.isSecureContext === false) return report('ERROR');
    abort(); state.finalText = ''; state.interim = ''; seen.clear();
    const active = new Ctor(); recognition = active; active.lang = 'id-ID'; active.continuous = true; active.interimResults = true; active.maxAlternatives = 1;
    active.onstart = () => report('LISTENING');
    active.onresult = event => {
      let interim = '';
      for (let i = event.resultIndex || 0; i < event.results.length; i += 1) {
        const result = event.results[i]; const text = String(result[0]?.transcript || '').trim();
        if (result.isFinal && !seen.has(i)) { seen.add(i); state.finalText = [state.finalText, text].filter(Boolean).join(' ').trim(); }
        else if (!result.isFinal) interim = [interim, text].filter(Boolean).join(' ');
      }
      state.interim = interim; window.dispatchEvent(new CustomEvent('sip-dictation-preview', { detail: { final: state.finalText, interim } })); report('TRANSCRIBING');
    };
    active.onerror = () => report('ERROR');
    active.onend = () => { if (recognition === active) report(state.finalText ? 'REVIEW' : 'STOPPED'); };
    report('REQUESTING_PERMISSION'); try { active.start(); } catch { report('ERROR'); }
    return state.status;
  };
  const stop = () => { try { recognition?.stop(); } catch {} return report(state.finalText ? 'REVIEW' : 'STOPPED'); };
  const useTranscript = () => { const value = state.finalText.trim(); abort(); state.finalText = ''; state.interim = ''; seen.clear(); report('READY'); return value; };
  window.SIPDictation = Object.freeze({ state, setConsent, start, stop, abort, useTranscript });
  window.addEventListener('pagehide', abort); window.addEventListener('visibilitychange', () => { if (document.hidden) abort(); });
})();
