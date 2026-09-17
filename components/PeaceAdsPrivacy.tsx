import React, {useEffect, useRef, useState} from 'react';
import {AdsConsent, createPeaceTracker, readAdsConsent, saveAdsConsent} from '../lib/peace-tracking';

export function hasPrivacySignal() {
  return Boolean((navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl);
}
export function currentAdsConsent(): AdsConsent {
  try { return readAdsConsent(window.localStorage, hasPrivacySignal()); } catch { return 'unset'; }
}

export default function PeaceAdsPrivacy({priceCents, reviewMode, onConsent}: {priceCents?: number; reviewMode: boolean; onConsent: (allowed: boolean) => void}) {
  const [choice, setChoice] = useState<AdsConsent>(currentAdsConsent);
  const [gpc, setGpc] = useState(hasPrivacySignal);
  const [open, setOpen] = useState(() => currentAdsConsent() === 'unset' && !hasPrivacySignal());
  const tracker = useRef<ReturnType<typeof createPeaceTracker> | null>(null);
  const panel = useRef<HTMLElement>(null);
  const privacyButton = useRef<HTMLButtonElement>(null);
  const manualOpen = useRef(false);
  if (!tracker.current) tracker.current = createPeaceTracker(window, document, !reviewMode);
  useEffect(() => {
    const allowed = choice === 'allowed' && !gpc;
    onConsent(allowed);
    tracker.current!.consent(allowed);
    if (allowed) tracker.current!.view(priceCents);
  }, [choice, gpc, priceCents, onConsent]);
  useEffect(() => {
    const sync = () => {
      const signal = hasPrivacySignal(), current = currentAdsConsent();
      onConsent(current === 'allowed' && !signal);
      if (current !== 'allowed' || signal) tracker.current!.consent(false);
      setGpc(signal); setChoice(current);
    };
    window.addEventListener('storage', sync); window.addEventListener('focus', sync);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener('focus', sync); tracker.current!.consent(false); };
  }, [onConsent]);
  useEffect(() => { if (open && manualOpen.current) panel.current?.focus(); }, [open]);
  function close() { setOpen(false); if (manualOpen.current) privacyButton.current?.focus(); }
  function choose(next: 'allowed' | 'declined') {
    // Re-read GPC at the action boundary, including checkout's separate check.
    if (next === 'allowed' && hasPrivacySignal()) { onConsent(false); tracker.current!.consent(false); setGpc(true); return; }
    try { saveAdsConsent(window.localStorage, next); } catch { /* Storage can be blocked. */ }
    onConsent(next === 'allowed');
    if (next === 'declined') tracker.current!.consent(false);
    setChoice(next); close();
  }
  if (reviewMode) return null;
  return <>
    <button ref={privacyButton} type="button" className="peace-privacy-link" onClick={() => {setGpc(hasPrivacySignal()); manualOpen.current = true; setOpen(true);}}>Privacy choices</button>
    {open && <aside ref={panel} className="peace-privacy-panel" tabIndex={-1} aria-labelledby="peace-privacy-title">
      <h2 id="peace-privacy-title">Your privacy on this page</h2>
      <p>{gpc ? 'Advertising tracking on this page is off because your browser sends a privacy preference.' : 'Allow optional advertising cookies? Meta can receive information about your visit to this page to help measure and improve our ads. You can shop either way.'}</p>
      <p className="peace-privacy-note">Your choice applies to this page. Fourthwall handles checkout under its <a href="https://fourthwall.com/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>
      <div className="peace-privacy-actions">{gpc ? <button type="button" onClick={close}>Close</button> : <>
        <button type="button" onClick={() => choose('declined')}>Decline</button>
        <button type="button" onClick={() => choose('allowed')}>Allow</button>
      </>}</div>
    </aside>}
  </>;
}
