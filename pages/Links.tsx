import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { track } from '@vercel/analytics';
import './Links.css';

const wallpapers = [
  ['tropland-peace', 'The Peace'], ['tropland-heart', 'The Heart'],
  ['tropland-pride', 'The Pride'], ['tropland-center-ring', 'Center Ring'],
  ['tropland-peacock', 'The Peacock'], ['tropland-clown', 'The Clown'],
];

/* The Peace Paw: a drawn glyph, not a photo. Two fingers up, the palm, the folded knuckles. */
const PeacePaw = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="paw">
  <rect x="6.2" y="2.6" width="3.8" height="11.5" rx="1.9" transform="rotate(-14 8.1 8.3)" />
  <rect x="12.4" y="2.6" width="3.8" height="11.5" rx="1.9" transform="rotate(14 14.3 8.3)" />
  <path d="M7.2 12.6c-2.4.4-3.9 2.1-3.9 4.3 0 2.6 2.3 4.5 5.4 4.5h5.6c3.3 0 5.6-1.9 5.6-4.5 0-1.9-1.1-3.4-2.9-4" />
  <path d="M16.9 13.9h1.6a1.4 1.4 0 0 1 0 2.8h-1M17.2 16.7h1.1a1.3 1.3 0 0 1 0 2.6" />
</svg>;

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
    const name = (href === '/peace' || href.includes('fourthwall')) ? 'links_peace_shirt'
      : href.includes('troplandgallery') ? 'links_artwork'
      : href.includes('youtube') ? 'links_youtube'
      : href.includes('instagram') ? 'links_instagram'
      : href.includes('facebook') ? 'links_facebook'
      : href.includes('x.com') ? 'links_x'
      : href.startsWith('mailto:') ? 'links_contact' : 'links_site';
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
    <Helmet><title>Tropland Universe | Links</title><meta name="description" content="Follow Tropland Universe on Instagram, Facebook, YouTube and X, visit the kingdom, buy the Peace Tee and art prints, and get free wallpapers." /><meta name="robots" content="noindex,follow" /><meta name="theme-color" content="#0b1f19" /><link rel="canonical" href="https://www.troplanduniverse.com/links" /></Helmet>
    <main className="window">
      <div className="hero" aria-hidden="true"><img src="/images/links/hero-peace.jpg" alt="" width="900" height="1951" fetchPriority="high" /></div>
      <header className="brand"><img className="wordmark" src="/images/brand/tropland-universe-horizontal-white.svg" alt="Tropland Universe" width="1880" height="208" /><p className="tagline">The Digital Animal Kingdom</p></header>
      <nav className="sheet" aria-label="Follow Tropland Universe" onClick={trackDestination}>
        <p className="follow">Follow the Kingdom</p>
        <div className="grid">
          <a className="glass ig" href="https://www.instagram.com/troplanduniverse/"><i><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" /></svg></i><span><b>Instagram</b><small>@troplanduniverse</small></span></a>
          <a className="glass fb" href="https://www.facebook.com/troplanduniverse/"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V7c0-1.2.5-2 2-2h2V1.5c-.8-.2-1.8-.3-3-.3-3 0-5 1.8-5 5V9H7v4h3v9Z" fill="currentColor" stroke="none" /></svg></i><span><b>Facebook</b><small>Tropland Universe</small></span></a>
          <a className="glass yt" href="https://www.youtube.com/@TroplandClips" aria-label="YouTube: TroplandClips"><i><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" /></svg></i><span><b>YouTube</b><small>@TroplandClips</small></span></a>
          <a className="glass x" href="https://x.com/joshgottsegen"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M20 4 4 20" /></svg></i><span><b>X</b><small>@joshgottsegen</small></span></a>
          <a className="glass web" href="https://www.troplanduniverse.com/"><i><PeacePaw /></i><span><b>Website</b><small>Visit the Kingdom</small></span></a>
          <a className="glass mail" href="mailto:partnerships@troplanduniverse.com?subject=Partnership%20inquiry"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></i><span><b>Contact</b><small>partnerships@</small></span></a>
        </div>
        <p className="shop"><a href="/peace">Peace Tee</a><span>·</span><a href="https://troplandgallery.com">Art Prints</a><span>·</span><button type="button" className="gold" onClick={openWallpapers} aria-haspopup="dialog">Free Wallpapers</button></p>
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
