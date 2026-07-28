import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { track } from '@vercel/analytics';

/**
 * /links — the Instagram bio destination.
 *
 * v3. Josh saw v2 live inside the Instagram in-app browser and called the
 * crop: the banner was cutting the top of his head off. He was right, and
 * the cause is structural rather than a bad number. The source is a portrait
 * selfie with two subjects side by side and a lot of headroom, so ANY
 * fixed-height full-bleed band has to guess where to cut it, and the in-app
 * browser (chrome top and bottom) squeezes the viewport enough that the
 * guess lands on foreheads. Retuning the crop would have moved the failure,
 * not removed it.
 *
 * So the photograph appears twice, and neither instance can crop badly:
 *
 *   1. THE PORTRAIT. A circle, framed on a square that holds both faces with
 *      headroom, so the composition is fixed regardless of viewport. Josh's
 *      instinct ("maybe a circle like all socials") is also the right read on
 *      convention: a round portrait is the universal this-is-a-real-account
 *      signal, and every buyer and fan parses it in one glance.
 *   2. THE FIELD. The same photo at 48px, blurred to nothing, scaled to fill
 *      the page behind everything. It carries the picture's colour, gold
 *      against cold blue, across the whole surface with no edge that can crop
 *      badly. Costs 1.5KB, which matters on a majority-India mobile audience.
 *
 * A bare circle on ink is Linktree's default, so it does not stay bare: an
 * ember halo sits behind it and breathes on a six-second cycle. That is the
 * page's one ambient motion and the only thing that moves by itself.
 *
 * ICONS, reconsidered. v2 stripped every icon because a globe standing for
 * "website" and a picture frame standing for "wallpapers" are stock
 * vocabulary. That reasoning holds for concepts and fails for brands: the
 * YouTube, Facebook and Instagram marks are not decoration, they are the
 * fastest recognition available, and this audience is majority non-English.
 * So the three platform rows carry their real marks and the three Tropland
 * rows carry none. The asymmetry is the point: platforms get their logo,
 * Tropland gets its typography.
 *
 * MICRO-INTERACTIONS, one system rather than scattered effects:
 *   - Entrance: portrait, then lockup, then rows at 55ms intervals, all on
 *     the site's own easing curve. One orchestrated move.
 *   - Press: rows sink 1.5% under the finger. Touch has no hover, and a page
 *     that never acknowledges a tap feels dead on a phone.
 *   - Hover: border warms, chevron slides.
 *   - Every one of them is disabled under prefers-reduced-motion.
 *
 * UNCHANGED from v2 and deliberate: Josh's link order verbatim; one screen,
 * no scroll; YouTube featured because the channel sits at 31 of the 4,000
 * valid public watch hours and Shorts are excluded by name; wallpapers point
 * at /#kingdom so the email funnel survives; Patreon absent because a cold
 * paid ask belongs after capture, not before; Contact boxed with the address
 * visible; noindex.
 */

interface Item {
  label: string;
  href: string;
  event: string;
  internal?: boolean;
  featured?: boolean;
  mark?: React.ReactNode;
}

/* Real platform marks. Recognition, not decoration — the reason the generic
   concept-icons were cut and these are not. */
const YouTubeMark = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.5 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
);

const FacebookMark = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
);

const InstagramMark = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
  </svg>
);

/**
 * Ordered by what a tap is WORTH, not by audience size, and re-ordered again
 * 2026-07-26 when Josh flagged that he is sending this page to AGENCIES.
 *
 * The featured slot moved off YouTube. The original argument was that YouTube
 * was "the only tap that changes a business outcome," and the live inventory
 * kills it: Shorts watch time is excluded from the 4,000-hour gate BY NAME,
 * and the library is 108 videos under 60s with only three countable long-form
 * assets. A fan tapping through mostly watches Shorts, so the hours barely
 * move. The shelf is the constraint, not the traffic.
 *
 * Meanwhile the page's single highlighted row was walking the highest-stakes
 * visitor Josh has straight to his weakest asset: a demonetized channel with
 * ~15k inert subs, one tap from a 1.3M Instagram story. An agent who lands
 * there reprices everything they just read.
 *
 * So the ember goes to FREE WALLPAPERS, the email capture. It is the only tap
 * that compounds, the only audience Josh owns rather than rents, and to a rep
 * it reads as a first-party funnel rather than a vanity number.
 *
 * YouTube stays on the page, demoted to a plain row. Removing it from a
 * "digital animal kingdom" page would read as hiding something; a quiet row
 * reads as honest inventory.
 *
 *   1. Free Wallpapers (featured) — the owned audience, the compounding tap.
 *   2. Website — the world, and the door an agency walks through.
 *   3. YouTube — real, present, unemphasized.
 *   4. Facebook — distribution collapsed ~8x against its own baseline.
 *   5. Instagram — last, because it sends the median visitor back where they
 *      came from. It earns its slot for arrivals from a brand, an email, a deck.
 */
const items: Item[] = [
  { label: 'Website', href: '/', event: 'links_site', internal: true },
  { label: 'YouTube', href: 'https://www.youtube.com/@troplanduniverse', event: 'links_youtube', mark: YouTubeMark },
  { label: 'Facebook', href: 'https://facebook.com/troplanduniverse', event: 'links_facebook', mark: FacebookMark },
  { label: 'Instagram', href: 'https://instagram.com/troplanduniverse', event: 'links_instagram', mark: InstagramMark },
];

/* Hairline chevron, thinner than any icon-set default. */
const Chevron: React.FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    aria-hidden="true"
    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
  >
    <path d="M3 1.5L8.5 6.5L3 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
  </svg>
);

/* The entrance is one sequence, so the delays live in one place. */
const rise = (delayMs: number): React.CSSProperties => ({ animationDelay: `${delayMs}ms` });
const RISE = 'animate-rise motion-reduce:animate-none motion-reduce:opacity-100';

/**
 * Keeps the portrait playing. Three things stop a muted autoplay loop in the
 * wild and none of them throw: React can emit the <video> without the `muted`
 * ATTRIBUTE present at first paint, which is exactly what iOS checks before it
 * allows autoplay; browsers pause video in a backgrounded tab and do not always
 * resume it; and an in-app browser (which is how nearly all of this traffic
 * arrives) can reject the initial play() outright.
 *
 * So: force muted on the element itself, ask it to play, and ask again whenever
 * the tab comes back. Every failure is swallowed on purpose — if it never
 * plays, the poster is still there and the page looks exactly as it did
 * before the loop existed. This is the signature element on a page 1.3M
 * people can reach; it should not depend on a default behaving.
 */
const useKeepPlaying = () => {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const play = () => { void el.play().catch(() => {}); };
    play();
    const onVisible = () => { if (document.visibilityState === 'visible') play(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  return ref;
};

/**
 * The capture, promoted out from behind a tap.
 *
 * It used to be the "Free Wallpapers" row, an ember button whose only job was
 * to carry someone to /#kingdom and the form waiting there. Every other row on
 * this page hands traffic to a platform Josh rents. This is the only one that
 * builds something he owns, so it stops being a door and becomes the thing
 * itself.
 *
 * Deliberately a ROW, not a section. One line of value, one field, one button,
 * inside the same 58px chassis as everything below it. The moment it grows a
 * headline and a paragraph this page turns back into the scrolling landing
 * page that was already rejected once. It replaces a row rather than adding
 * one, so the page still lands inside a single screen.
 */
const KingdomCapture: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'done' : 'error');
      track(res.ok ? 'links_kingdom_signup' : 'links_kingdom_error');
    } catch {
      setStatus('error');
      track('links_kingdom_error');
    }
  };

  /* Success stays ON this page. Sending them away to collect the thing they
     just asked for is the same extra tap this change exists to remove. */
  if (status === 'done') {
    return (
      <div className={`w-full ${RISE}`} style={style}>
        <p className="mb-1.5 text-center font-display text-[10px] font-bold uppercase tracking-[0.24em] text-ember short:mb-1">
          Check your email too
        </p>
        <a
          href="/wallpapers/tropland-wallpaper-pack.zip"
          onClick={() => track('links_wallpaper_pack_download')}
          className="group flex h-[58px] w-full items-center gap-3.5 rounded-[3px] border border-ember/55 bg-ember px-5 font-display text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition-transform duration-300 active:scale-[0.985] motion-reduce:active:scale-100 short:h-[50px] tiny:h-[36px] tiny:text-[12px]"
        >
          <span className="flex-1">Download all six</span>
          <Chevron />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`w-full ${RISE}`} style={style}>
      <label
        htmlFor="links-email"
        className="mb-1.5 block text-center font-display text-[10px] font-bold uppercase tracking-[0.24em] text-ember short:mb-1"
      >
        {status === 'error' ? 'That did not go through, try again' : 'Six free mobile wallpapers'}
      </label>
      <div className="flex h-[58px] w-full items-center rounded-[3px] border border-ember/55 pl-5 pr-1.5 transition-colors duration-300 focus-within:border-ember short:h-[50px] tiny:h-[36px]">
        <input
          id="links-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          autoComplete="email"
          className="h-full min-w-0 flex-1 bg-transparent font-display text-[13px] tracking-[0.04em] text-bone placeholder-bone/35 focus:outline-none tiny:text-[12px]"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="h-[42px] shrink-0 rounded-[2px] bg-ember px-4 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-ink transition-transform duration-300 active:scale-[0.97] disabled:opacity-60 motion-reduce:active:scale-100 short:h-[38px] tiny:h-[28px] tiny:px-3 tiny:text-[11px]"
        >
          {status === 'submitting' ? '...' : 'Get'}
        </button>
      </div>
    </form>
  );
};

const Links: React.FC = () => {
  const portraitRef = useKeepPlaying();

  return (
  <main className="relative flex min-h-[100svh] overflow-hidden bg-ink text-bone">

    <Helmet>
      <title>Tropland Universe | Links</title>
      <meta name="robots" content="noindex" />
      <meta
        name="description"
        content="Tropland Universe, The Digital Animal Kingdom. YouTube, Facebook, Instagram, the website, and six free mobile wallpapers."
      />
      <meta property="og:title" content="Tropland Universe | Links" />
      <meta property="og:url" content="https://troplanduniverse.com/links" />
    </Helmet>

    {/* ── The field. A 48px thumbnail blown up and blurred: the photograph's
        colour with no edge that can crop badly. 1.5KB. ─────────────────── */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src="/images/josh-lion-ambient.jpg"
        alt=""
        className="h-full w-full scale-125 object-cover opacity-[0.62] blur-[56px]"
      />
      {/* Lighter at the top where the portrait sits, solid ink by the bottom
          so the rows keep their contrast. The field is atmosphere, never a
          surface anything has to be read against. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/75 to-ink" />
    </div>

    <div className="tu-grain" aria-hidden="true" />

    <div className="relative z-10 m-auto flex w-full max-w-[400px] flex-col items-center px-[18px] py-8 short:py-5 tiny:py-3">

      {/* ── The portrait ──────────────────────────────────────────────── */}
      <div className={`relative tiny:hidden ${RISE}`} style={rise(0)}>
        {/* Halo. The page's one ambient motion, six seconds a cycle, so it
            registers as atmosphere rather than as an animation. */}
        <div
          aria-hidden="true"
          className="absolute -inset-5 animate-halo-breathe rounded-full bg-ember/25 blur-2xl motion-reduce:animate-none"
        />
        {/* The living portrait. The brand's whole engine is "is this real?",
            and a still photograph is the one format that cannot ask it. The
            lion breathes and blinks; Josh holds. Nobody else's link page can
            do this, which is the entire reason it is here.

            Shipped as a <video> whose POSTER is the still, so the page is
            never waiting on it: the frame paints immediately, the loop takes
            over when it has arrived, and if the file is missing or the
            connection gives up, what remains is exactly the still we had
            before. muted + playsInline are required for iOS autoplay.

            The clip is Josh's own, shot to loop: first and last frames match,
            so there is no visible seam. 440x440 at CRF 30 is 310KB, which is
            the right trade for a 136px circle on India and Brazil mobile
            data, and the poster is frame 0 of this exact encode rather than a
            separate crop, so nothing jumps when the loop takes over. */}
        <video
          ref={portraitRef}
          src="/video/josh-lion-loop.mp4"
          poster="/images/josh-lion-portrait.jpg"
          width={440}
          height={440}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-label="Josh Gottsegen beside a lion of the Tropland Universe"
          className="relative h-[136px] w-[136px] rounded-full border border-ember/45 object-cover shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)] short:h-[104px] short:w-[104px]"
        />
      </div>

      {/* ── The lockup ────────────────────────────────────────────────── */}
      <p
        className={`mt-6 text-center font-display text-[10px] font-bold uppercase tracking-[0.28em] text-ember short:mt-4 tiny:mt-0 ${RISE}`}
        style={rise(90)}
      >
        The Digital Animal Kingdom
      </p>
      <h1
        className={`mt-2.5 text-center font-display text-[31px] font-extrabold uppercase leading-[0.92] tracking-[-0.025em] text-bone short:mt-2 short:text-[26px] tiny:text-[22px] ${RISE}`}
        style={rise(150)}
      >
        Tropland{' '}
        <span className="font-edit text-[33px] font-light normal-case italic tracking-normal text-ember short:text-[28px] tiny:text-[24px]">
          Universe
        </span>
      </h1>

      {/* ── The capture, first ────────────────────────────────────────── */}
      <div className="mt-7 w-full short:mt-5 tiny:mt-4">
        <KingdomCapture style={rise(220)} />
      </div>

      {/* ── The index ─────────────────────────────────────────────────── */}
      <nav
        aria-label="Tropland Universe links"
        className="mt-[10px] flex w-full flex-col gap-[10px] short:mt-2 short:gap-2 tiny:mt-1.5 tiny:gap-1.5"
      >
        {items.map((item, i) => {
          const base =
            'group flex h-[58px] w-full items-center gap-3.5 rounded-[3px] border px-5 font-display text-[13px] font-bold uppercase tracking-[0.12em] transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.985] motion-reduce:active:scale-100 short:h-[50px] tiny:h-[36px] tiny:text-[12px]';
          const skin = item.featured
            ? 'border-ember/55 text-ember hover:bg-ember hover:text-ink hover:border-ember'
            : 'border-bone/15 text-bone hover:border-bone/45 hover:bg-bone/[0.04]';

          const inner = (
            <>
              {item.mark && <span className="shrink-0">{item.mark}</span>}
              <span className="flex-1">{item.label}</span>
              <Chevron />
            </>
          );

          const cls = `${base} ${skin} ${RISE}`;
          const style = rise(275 + i * 55);

          return item.internal ? (
            <Link key={item.label} to={item.href} onClick={() => track(item.event)} className={cls} style={style}>
              {inner}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(item.event)}
              className={cls}
              style={style}
            >
              {inner}
            </a>
          );
        })}
      </nav>

      {/* ── The business door ─────────────────────────────────────────── */}
      <div className={`mt-5 w-full short:mt-4 tiny:mt-2 ${RISE}`} style={rise(275 + items.length * 55)}>
        <div className="mb-3 h-px w-full bg-bone/10 short:mb-2.5 tiny:mb-2" />
        <a
          href="mailto:partnerships@troplanduniverse.com?subject=Partnership%20inquiry"
          onClick={() => track('links_contact')}
          className="group flex h-[62px] w-full items-center justify-between rounded-[3px] border border-bone/15 px-5 transition-[color,background-color,border-color,transform] duration-300 hover:border-bone/45 hover:bg-bone/[0.04] active:scale-[0.985] motion-reduce:active:scale-100 short:h-[54px] tiny:h-[44px]"
        >
          <span className="min-w-0">
            <span className="block font-display text-[13px] font-bold uppercase tracking-[0.12em] text-bone tiny:text-[12px]">
              Contact
            </span>
            <span className="mt-1 block truncate font-display text-[11.5px] font-light lowercase tracking-[0.01em] text-bone/45 transition-colors duration-300 group-hover:text-ember tiny:text-[9.5px]">
              partnerships@troplanduniverse.com
            </span>
          </span>
          <Chevron />
        </a>
      </div>
    </div>
  </main>
  );
};

export default Links;
