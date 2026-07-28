import React, { useState } from 'react';
import { track } from '@vercel/analytics';
import { ArrowRight, Download } from 'lucide-react';
import SectionTag from './fx/SectionTag';
import Reveal from './fx/Reveal';

/**
 * The fan door. IG traffic lands on a partner-facing site; this section is
 * the one thing a fan can DO: trade an email for the wallpaper pack and
 * first look at new drops. Owned audience is the asset.
 */
/**
 * `src` is the full-resolution file: it is what a long-press saves and what
 * goes in the zip, so it stays phone-native (1290x2796 and up). `thumb` is a
 * 420px copy used only for the decorative strip shown before signup, so the
 * idle page does not pull ~4MB of wallpaper to render six postage stamps.
 */
const wallpapers = [
  { src: '/wallpapers/tropland-peace.jpg', thumb: '/wallpapers/thumbs/tropland-peace.jpg', label: 'The Peace' },
  { src: '/wallpapers/tropland-heart.jpg', thumb: '/wallpapers/thumbs/tropland-heart.jpg', label: 'The Heart' },
  { src: '/wallpapers/tropland-pride.jpg', thumb: '/wallpapers/thumbs/tropland-pride.jpg', label: 'The Pride' },
  { src: '/wallpapers/tropland-center-ring.jpg', thumb: '/wallpapers/thumbs/tropland-center-ring.jpg', label: 'Center Ring' },
  { src: '/wallpapers/tropland-peacock.jpg', thumb: '/wallpapers/thumbs/tropland-peacock.jpg', label: 'The Peacock' },
  { src: '/wallpapers/tropland-clown.jpg', thumb: '/wallpapers/thumbs/tropland-clown.jpg', label: 'The Clown' },
];

type SubStatus = 'idle' | 'submitting' | 'success' | 'error';

const JoinKingdom: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        track('kingdom_signup');
      } else {
        setStatus('error');
        track('kingdom_signup_error');
      }
    } catch {
      setStatus('error');
      track('kingdom_signup_error');
    }
  };

  return (
    <section id="kingdom" className="relative bg-ink-2 py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionTag label="Join the Kingdom" className="mb-12 md:mb-16" />
        </Reveal>

        {status === 'success' ? (
          <Reveal>
            <div>
              <h2 className="font-display font-extrabold text-[10vw] md:text-[4vw] leading-[0.95] tracking-[-0.02em] text-bone uppercase mb-4">
                Welcome to the{' '}
                <span className="font-edit italic font-light normal-case text-ember tracking-normal">kingdom.</span>
              </h2>
              <p className="font-display font-light text-lg text-bone/60 mb-10 max-w-xl">
                Tap a wallpaper and long-press to save it to your phone.
                The full pack is also on its way to your inbox.
              </p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
                {wallpapers.map((wp) => (
                  <a
                    key={wp.src}
                    href={wp.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('wallpaper_open', { wallpaper: wp.label })}
                    className="group block"
                  >
                    <div className="tu-frame bg-ink overflow-hidden" style={{ aspectRatio: '9/16' }}>
                      <img
                        src={wp.src}
                        alt={`Tropland wallpaper: ${wp.label}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <span className="block mt-2 font-mono text-[9px] tracking-[0.2em] uppercase text-bone/50 group-hover:text-ember transition-colors">
                      {wp.label}
                    </span>
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/wallpapers/tropland-wallpaper-pack.zip"
                  onClick={() => track('wallpaper_pack_download')}
                  className="inline-flex items-center gap-3 px-8 py-4 border border-bone/25 text-bone font-display font-bold text-[14px] uppercase tracking-[0.08em] hover:border-ember hover:text-ember transition-colors duration-300"
                >
                  <Download size={15} />
                  Download all six
                </a>
              </div>

              {/*
                What used to sit here was a Patreon rung promising a weekly
                wallpaper pack, the Lost Acts, and votes on the next Circus act.
                None of that is being made, so it was a promise breaking at the
                one moment the reader is most inclined to believe us. Replaced
                with the only thing we can actually keep: they are on the list,
                and the list gets the next pack first. One broadcast fulfils it.
              */}
              <div className="mt-12 border-t border-bone/10 pt-10 max-w-2xl">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ember mb-3">
                  What happens next
                </p>
                <p className="font-display font-light text-lg text-bone/70 leading-relaxed">
                  When the next act drops, the pack that comes with it lands in
                  your inbox before the feed sees it.
                </p>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-[10vw] md:text-[4.6vw] leading-[0.95] tracking-[-0.02em] text-bone uppercase mb-6">
                Take the kingdom<br />
                <span className="font-edit italic font-light normal-case text-ember tracking-normal">with you.</span>
              </h2>
              <p className="font-display font-light text-lg md:text-xl text-bone/65 leading-relaxed max-w-xl">
                Six free mobile wallpapers from the world's favorite moments: the peace sign,
                the heart, and three from the Circus. Plus first look at new drops
                before the feed gets them.
              </p>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.15}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="kingdom-email" className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone/45">
                  Email
                </label>
                <input
                  id="kingdom-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-b border-bone/20 px-0 py-4 text-bone font-display text-lg placeholder-bone/30 focus:outline-none focus:border-ember transition-colors duration-300"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ember text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {status === 'submitting' ? 'Opening the gates...' : 'Get the pack'}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                {status === 'error' && (
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ember">
                    Something broke. Try again, or find us @troplanduniverse.
                  </p>
                )}
                <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone/30">
                  No spam. Just the kingdom. Unsubscribe anytime.
                </p>
              </form>
            </Reveal>
          </div>
        )}

        {/* Preview strip while idle */}
        {status !== 'success' && (
          <Reveal delay={0.2}>
            <div className="grid grid-cols-6 gap-3 mt-14 opacity-80">
              {wallpapers.map((wp) => (
                <div key={wp.src} className="bg-ink overflow-hidden" style={{ aspectRatio: '9/16' }}>
                  <img
                    src={wp.thumb}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default JoinKingdom;
