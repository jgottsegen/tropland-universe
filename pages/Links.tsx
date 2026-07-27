import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { track } from '@vercel/analytics';
import { ArrowUpRight, Play } from 'lucide-react';

/**
 * /links — the Instagram bio destination.
 *
 * This is NOT a neutral link menu. It is ordered by what we actually need
 * from the traffic, top to bottom:
 *
 *   1. YOUTUBE. The channel sits at 31 of the 4,000 valid public watch hours
 *      YPP requires, and Shorts watch time is excluded by name, so the only
 *      thing that moves that number is a human choosing to watch a long video.
 *      That is the one behavior a bio link can actually cause. It gets the
 *      hero slot and the only art on the page.
 *   2. THE EMAIL LIST. The bio link used to point at /#kingdom, which is the
 *      only asset on the site that converts a viewer into something we own.
 *      Replacing that with a link menu would have quietly cost us the funnel,
 *      so the capture form lives ON this page rather than one tap away.
 *   3. Everything else, in descending order of what it returns.
 *
 * Chrome-free by design (no Navbar, no Footer — see PORTAL_PATHS in App.tsx):
 * this is a phone destination, and every pixel of site furniture is a tap
 * competing with the two things above.
 *
 * Copy is deliberately plain. The audience is majority non-US (India and
 * Brazil are the two largest blocs), so the words stay simple and the
 * cleverness lives in the layout, not the vocabulary.
 */

const YT_CHANNEL = 'https://www.youtube.com/@troplanduniverse';
const YT_VIDEOS = 'https://www.youtube.com/@troplanduniverse/videos';
const YT_SUBSCRIBE = 'https://www.youtube.com/@troplanduniverse?sub_confirmation=1';

type SubStatus = 'idle' | 'submitting' | 'success' | 'error';

interface LinkRow {
  label: string;
  sub: string;
  href: string;
  event: string;
  external?: boolean;
}

const rows: LinkRow[] = [
  {
    label: 'Instagram',
    sub: 'New act every other day',
    href: 'https://instagram.com/troplanduniverse',
    event: 'links_instagram',
  },
  {
    label: 'Facebook',
    sub: 'Same world, second home',
    href: 'https://facebook.com/troplanduniverse',
    event: 'links_facebook',
  },
  {
    label: 'The Inner Kingdom',
    sub: 'Weekly packs, the acts the feed never sees, and a vote on what goes public next',
    href: 'https://patreon.com/troplanduniverse',
    event: 'links_patreon',
  },
  {
    label: 'Threads',
    sub: 'Notes from behind the curtain',
    href: 'https://www.threads.net/@troplanduniverse',
    event: 'links_threads',
  },
  {
    label: 'Enter the world',
    sub: 'troplanduniverse.com',
    href: '/',
    event: 'links_site',
    external: false,
  },
  {
    label: 'Brands and licensing',
    sub: 'Work with Tropland',
    href: '/contact',
    event: 'links_partners',
    external: false,
  },
];

const Links: React.FC = () => {
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
        track('kingdom_signup', { source: 'links' });
      } else {
        setStatus('error');
        track('kingdom_signup_error', { source: 'links' });
      }
    } catch {
      setStatus('error');
      track('kingdom_signup_error', { source: 'links' });
    }
  };

  return (
    <main className="min-h-screen bg-ink text-bone">
      <Helmet>
        <title>Tropland Universe | Links</title>
        <meta
          name="description"
          content="Watch the long ones on YouTube, grab six free wallpapers, and find Tropland Universe everywhere else."
        />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Tropland Universe | Links" />
        <meta property="og:url" content="https://troplanduniverse.com/links" />
      </Helmet>

      <div className="mx-auto w-full max-w-[560px] px-5 pt-14 pb-20 sm:pt-20">

        {/* ── Identity ─────────────────────────────────────────── */}
        <header className="text-center mb-10">
          {/* The lion face, not the OneLight wordmark. This page is fan-facing;
              the studio brand means nothing to someone arriving from a reel. */}
          <img
            src="/apple-touch-icon.png"
            alt=""
            aria-hidden="true"
            width={72}
            height={72}
            className="mx-auto mb-5 h-[72px] w-[72px] rounded-full border border-bone/15 object-cover"
          />
          <h1 className="font-display font-extrabold text-[34px] sm:text-[42px] leading-[0.95] tracking-[-0.02em] uppercase">
            Tropland{' '}
            <span className="font-edit italic font-light normal-case text-ember tracking-normal">
              Universe
            </span>
          </h1>
          <p className="mt-3 font-display font-light text-[15px] text-bone/60">
            The Digital Animal Kingdom
          </p>
        </header>

        {/* ── 1. YouTube. The whole reason this page exists. ────── */}
        <a
          href={YT_VIDEOS}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('links_youtube_hero')}
          className="group block mb-3 overflow-hidden border border-ember/40 bg-ink-2 transition-colors duration-300 hover:border-ember"
        >
          {/* Still, not video, on purpose. The audience is majority India and
              Brazil on mobile data; a 1MB autoplay loop is a real cost to them
              and buys nothing a poster frame doesn't already sell. */}
          <div className="relative aspect-[4/3] overflow-hidden bg-ink-3 sm:aspect-video">
            <img
              className="h-full w-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
              src="/video/reel-pond-poster.jpg"
              alt=""
              aria-hidden="true"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ember text-ink transition-transform duration-300 group-hover:scale-110">
                <Play size={24} fill="currentColor" />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 px-5 py-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
                Watch on YouTube
              </p>
              <p className="mt-2 font-display text-[19px] font-bold leading-tight text-bone">
                The long ones live here
              </p>
              <p className="mt-1 font-display text-[14px] font-light leading-snug text-bone/60">
                Full circus acts and hours of calm animal worlds. Made to sit with, not to scroll.
              </p>
            </div>
            <ArrowUpRight
              size={22}
              className="shrink-0 text-bone/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember"
            />
          </div>
        </a>

        <a
          href={YT_SUBSCRIBE}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('links_youtube_subscribe')}
          className="mb-10 block bg-ember px-5 py-4 text-center font-display text-[14px] font-bold uppercase tracking-[0.08em] text-ink transition-colors duration-300 hover:bg-ember-soft"
        >
          Subscribe on YouTube
        </a>

        {/* ── 2. The email door. Never lost to the menu. ────────── */}
        <section className="mb-10 border-t border-bone/10 pt-9">
          {status === 'success' ? (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
                You are in
              </p>
              <h2 className="mt-3 font-display text-[24px] font-extrabold uppercase leading-[1] tracking-[-0.02em]">
                Welcome to the{' '}
                <span className="font-edit italic font-light normal-case text-ember tracking-normal">
                  kingdom.
                </span>
              </h2>
              <p className="mt-3 font-display text-[15px] font-light leading-relaxed text-bone/65">
                Your six wallpapers are on the way to your inbox.
              </p>
              <a
                href="/wallpapers/tropland-wallpaper-pack.zip"
                onClick={() => track('wallpaper_pack_download', { source: 'links' })}
                className="mt-5 inline-flex items-center gap-2 border border-bone/25 px-6 py-3 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-bone transition-colors duration-300 hover:border-ember hover:text-ember"
              >
                Get them now
              </a>
            </div>
          ) : (
            <>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
                Free
              </p>
              <h2 className="mt-3 font-display text-[24px] font-extrabold uppercase leading-[1] tracking-[-0.02em]">
                Six wallpapers for{' '}
                <span className="font-edit italic font-light normal-case text-ember tracking-normal">
                  your phone.
                </span>
              </h2>
              <p className="mt-3 font-display text-[15px] font-light leading-relaxed text-bone/65">
                The peace sign, the heart, the couple, the roar. Plus you see new
                drops before the feed does.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                <label htmlFor="links-email" className="sr-only">
                  Email
                </label>
                <input
                  id="links-email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border-b border-bone/20 bg-transparent px-0 py-3 font-display text-[17px] text-bone placeholder-bone/30 transition-colors duration-300 focus:border-ember focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="border border-bone/25 px-6 py-4 font-display text-[14px] font-bold uppercase tracking-[0.08em] text-bone transition-colors duration-300 hover:border-ember hover:text-ember disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'submitting' ? 'One moment...' : 'Send me the pack'}
                </button>
                {status === 'error' && (
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember">
                    That did not go through. Try again.
                  </p>
                )}
              </form>
            </>
          )}
        </section>

        {/* ── 3. Everything else ───────────────────────────────── */}
        <nav aria-label="More from Tropland Universe" className="border-t border-bone/10">
          {rows.map((row) => {
            const isExternal = row.external !== false;
            return (
              <a
                key={row.href}
                href={row.href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => track(row.event)}
                className="group flex items-center justify-between gap-4 border-b border-bone/10 py-5 transition-colors duration-300 hover:bg-ink-2"
              >
                <span className="min-w-0">
                  <span className="block font-display text-[17px] font-bold leading-tight text-bone transition-colors duration-300 group-hover:text-ember">
                    {row.label}
                  </span>
                  <span className="mt-1 block font-display text-[13px] font-light leading-snug text-bone/50">
                    {row.sub}
                  </span>
                </span>
                <ArrowUpRight
                  size={19}
                  className="shrink-0 text-bone/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember"
                />
              </a>
            );
          })}
        </nav>

        <p className="mt-12 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-bone/25">
          Tropland Universe
        </p>
      </div>
    </main>
  );
};

export default Links;
