import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { track } from '@vercel/analytics';
import './Links.css';

const wallpapers = [
  ['tropland-peace', 'The Peace'], ['tropland-heart', 'The Heart'],
  ['tropland-pride', 'The Pride'], ['tropland-center-ring', 'Center Ring'],
  ['tropland-peacock', 'The Peacock'], ['tropland-clown', 'The Clown'],
];

export default function Links() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const openWallpapers = () => { dialog.current?.showModal(); track('links_wallpapers_open'); };
  const trackDestination = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target instanceof Element ? event.target.closest('a') : null;
    if (!target) return;
    const href = target.getAttribute('href') || '';
    const name = (href === '/peace' || href.includes('fourthwall')) ? 'links_peace_shirt' : href.includes('troplandgallery') ? 'links_artwork' : href.includes('youtube') ? 'links_youtube' : href.includes('instagram') ? 'links_instagram' : href.includes('facebook') ? 'links_facebook' : href.startsWith('mailto:') ? 'links_contact' : 'links_site';
    track(name);
  };
  const subscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setSending(true); setError('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!response.ok) throw new Error('signup');
      setDone(true); track('links_kingdom_signup');
    } catch {
      setError('Something went wrong. Please try again.'); track('links_kingdom_error');
    } finally { setSending(false); }
  };
  return <div className="links-page">
    <Helmet><title>Tropland Universe | Links</title><meta name="description" content="Explore Tropland Universe, buy the Peace Shirt and artwork, follow TroplandClips, and get free wallpapers." /><meta name="robots" content="noindex,follow" /><meta name="theme-color" content="#102d25" /><link rel="canonical" href="https://www.troplanduniverse.com/links" /></Helmet>
<main className="hub"><header className="brand"><img className="wordmark" src="/images/brand/tropland-universe-horizontal-white.svg" alt="Tropland Universe" width="1880" height="208" /><div className="tagline"><span>The Digital Animal Kingdom</span></div></header>
<nav aria-label="Explore Tropland Universe" onClick={trackDestination}>
<a className="destination main-site" href="https://www.troplanduniverse.com/"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/></svg><span className="copy"><strong>Explore Tropland Universe</strong></span><svg className="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></a>
<a className="destination feature shirt" href="/peace"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 3-6 4 3 5 3-2v11h8V10l3 2 3-5-6-4c-1 3-7 3-8 0Z"/></svg><span className="copy"><strong>Buy the Peace Shirt</strong></span><svg className="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></a>

<section className="follow" aria-label="Social channels"><div className="social-buttons">
<a href="https://www.instagram.com/troplanduniverse/"><svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: '#a08bdd' }}><defs><linearGradient id="social-0" x2="1" y2="1"><stop stop-color="#a08bdd"/><stop offset="1" stop-color="#cf7ca3"/></linearGradient></defs><g stroke="url(#social-0)"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/></g></svg><span>Instagram</span></a>
<a href="https://www.facebook.com/troplanduniverse/"><svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: '#79a9f3' }}><defs><linearGradient id="social-1" x2="1" y2="1"><stop stop-color="#79a9f3"/><stop offset="1" stop-color="#88c7dd"/></linearGradient></defs><g stroke="url(#social-1)"><path d="M14 22v-9h3l.5-4H14V7c0-1.2.5-2 2-2h2V1.5c-.8-.2-1.8-.3-3-.3-3 0-5 1.8-5 5V9H7v4h3v9Z" fill="currentColor" stroke="none"/></g></svg><span>Facebook</span></a>
<a href="https://www.youtube.com/@TroplandClips" aria-label="YouTube: TroplandClips"><svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: '#d78d83' }}><defs><linearGradient id="social-2" x2="1" y2="1"><stop stop-color="#d78d83"/><stop offset="1" stop-color="#d46b80"/></linearGradient></defs><g stroke="url(#social-2)"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/></g></svg><span>YouTube</span></a>
</div></section>
<a className="destination feature gallery" href="https://troplandgallery.com"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18"/><path d="m3 17 6-7 5 5 3-3 4 5"/><circle cx="16.5" cy="7.5" r="1"/></svg><span className="copy"><strong>Buy the Artwork</strong><span>Tropland Art Gallery</span></span><svg className="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></a>
<div className="more-links">


<button type="button" className="destination wallpapers" onClick={openWallpapers} aria-haspopup="dialog"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6"/></svg><span className="copy"><strong>Get Free Wallpapers</strong><span>Magic and wild for your screen</span></span><svg className="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></button>
</div>
<a className="destination partnership" href="mailto:partnerships@troplanduniverse.com?subject=Partnership%20inquiry"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg><span className="copy"><strong>Partnerships &amp; Licensing</strong></span><svg className="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></a>
</nav>
<footer><p>Created by Josh Gottsegen</p></footer>
</main>
    <dialog ref={dialog} className="wallpaper-dialog" aria-labelledby="wallpaper-title" data-lenis-prevent>
      <button type="button" className="dialog-close" aria-label="Close wallpapers" onClick={() => dialog.current?.close()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
      <h2 id="wallpaper-title">{done ? 'Your wallpapers' : 'Get Free Wallpapers'}</h2>
      {done ? <>
        <p role="status">Open a picture, then press and hold to save it. We’ve also emailed you the pack.</p>
        <div className="wallpaper-grid">{wallpapers.map(([file, label]) => <a key={file} href={`/wallpapers/${file}.jpg`} target="_blank" rel="noopener noreferrer" onClick={() => track('links_wallpaper_open', { wallpaper: label })}><img src={`/wallpapers/thumbs/${file}.jpg`} alt={label} width={180} height={320} /><span>{label}</span></a>)}</div>
        <a className="pack-download" href="/wallpapers/tropland-wallpaper-pack.zip" download onClick={() => track('links_wallpaper_pack_download')}>Download all six wallpapers</a>
      </> : <form onSubmit={subscribe}>
        <p>Six mobile wallpapers, plus new Tropland drops by email.</p>
        <label htmlFor="wallpaper-email">Email address</label>
        <input id="wallpaper-email" type="email" name="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" />
        <button type="submit" className="signup-button" disabled={sending}>{sending ? 'Sending…' : 'Send my wallpapers'}</button>
        {error && <p role="alert" className="signup-error">{error}</p>}
        <p className="signup-note">No spam. Unsubscribe anytime.</p>
      </form>}
    </dialog>
  </div>;
}
