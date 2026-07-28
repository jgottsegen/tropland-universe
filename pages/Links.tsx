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
 * UNCHANGED and deliberate: Josh's link order verbatim; ONE SCREEN, NO SCROLL,
 * measured in every state including mid-reveal, and the reason v1 was thrown
 * out; Patreon absent, and as of 2026-07-27 removed site-wide because nothing
 * is being posted there; Contact boxed with the address visible; noindex.
 * Mono is gone from this page on Josh's call.
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
 *   1. Website — the world, and the door an agency walks through.
 *   2. YouTube — real, present, unemphasized.
 *   3. Facebook — distribution collapsed ~8x against its own baseline.
 *   4. Instagram — last, because it sends the median visitor back where they
 *      came from. It earns its slot for arrivals from a brand, an email, a deck.
 *
 * v4 (2026-07-28). The Free Wallpapers ROW is gone, because the capture it
 * pointed at now lives on this page. Every remaining row hands traffic to a
 * platform Josh rents; the capture is the only one that builds an audience he
 * owns, so it stopped being a door and became the thing itself, in the slot
 * the featured row used to hold. It replaces a row rather than adding one, so
 * the page still lands inside a single screen.
 *
 * And it is a GESTURE, not a field. A dormant input is furniture, and a form
 * under this wordmark answered "is this real?" with "it's a mailing list." So
 * a chrome padlock slides, the shackle lifts once the throw is past the
 * threshold, the lock becomes the lion, and only then does anything get asked
 * for. The email is the reward for effort freely given rather than the price
 * of the wallpapers.
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
/* Order matches the pack: the two most recognised images first, then the
   Circus. Thumbs drive the grid; the full-resolution file is what the tap
   opens, because that is the one a press-and-hold actually saves. */
const WALLPAPERS = [
  { file: 'tropland-peace', label: 'The Peace' },
  { file: 'tropland-heart', label: 'The Heart' },
  { file: 'tropland-pride', label: 'The Pride' },
  { file: 'tropland-center-ring', label: 'Center Ring' },
  { file: 'tropland-peacock', label: 'The Peacock' },
  { file: 'tropland-clown', label: 'The Clown' },
];
/**
 * SLIDE TO UNLOCK.
 *
 * An email field on a bio page is a form, and a form is the one thing on this
 * page that looks like every other page. The brand's whole engine is "wait,
 * is this real?", and the row underneath the wordmark was answering "no, it's
 * a mailing list."
 *
 * So the capture is a gesture before it is a field. The knob is the lion, the
 * words shimmer the way the 2007 lock screen's did, and nothing is asked for
 * until the person has physically done something. Three reasons this is more
 * than decoration:
 *
 *   1. It is a COMMITMENT before a cost. Sliding is effort freely given, and
 *      an email typed after effort is worth more than one typed into a box
 *      that was just sitting there. The field is the reward for the gesture,
 *      not the price of the wallpapers.
 *   2. It cannot be skimmed past. A dormant input is furniture. A shimmering
 *      track is the only moving thing on the screen besides the portrait.
 *   3. Everyone already knows how. It is the single most-performed gesture in
 *      the history of the phone this page is being read on.
 *
 * Built for the failure cases, because a gesture that half-works is worse
 * than the button it replaced:
 *   - Pointer events, so one code path covers touch, mouse and stylus.
 *   - touch-action:none on the knob so dragging never scrolls the page under
 *     the finger, which is what makes home-made sliders feel broken.
 *   - Released short of the threshold, the knob springs back. Past it, it
 *     completes on its own. No dead zone where nothing happens.
 *   - The whole track is also a BUTTON. Keyboard, screen reader, anyone who
 *     cannot drag, and anyone who simply taps it: all get through. The slide
 *     is the delight, never the gate.
 *   - prefers-reduced-motion kills the shimmer and the spring; the track
 *     still works.
 */
const UNLOCK_AT = 0.82;

const KingdomCapture: React.FC<{ style: React.CSSProperties; onUnlock: () => void; onDone: () => void }> = ({ style, onUnlock, onDone }) => {
  const [phase, setPhase] = React.useState<'locked' | 'open' | 'done'>('locked');
  const [armed, setArmed] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  const trackRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [x, setX] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const startX = React.useRef(0);
  /* Mirrored in a ref because a fast flick can deliver pointermove in the same
     frame as pointerdown, before React has committed dragging=true, and a move
     read off stale state is silently dropped. The state copy only drives the
     transition styling, where a frame late is invisible. */
  const draggingRef = React.useRef(false);
  /* Position needs the same treatment for the same reason, and this one is
     worse: a fast flick can deliver the last pointermove and the pointerup in
     one batch, so the release handler reads a stale x, decides the throw fell
     short of the threshold, and springs a completed gesture back to zero. The
     user did it right and the control said no. */
  const xRef = React.useRef(0);

  const moveTo = (next: number) => {
    xRef.current = next;
    setX(next);
  };

  /* Knob travel: the track's inner width less the knob and its inset. Measured
     rather than assumed, because this page has three viewport size bands. */
  const travel = () => {
    const el = trackRef.current;
    return el ? Math.max(el.clientWidth - 54 - 8, 0) : 0;
  };

  const unlock = () => {
    moveTo(travel());
    setArmed(true);
    onUnlock();
    /* The morph gets 300ms to itself. The first cut fired the panel at 160 and
       it covered the lion before the cross-fade had resolved, so the payoff of
       the whole gesture, the lock BECOMING the brand, was never actually seen.
       Overlapping is not free when the thing being overlapped is the point.
       Typing is still live at ~380ms, which is under the threshold where a
       reveal starts to feel like a wait. */
    window.setTimeout(() => setPhase('open'), 300);
    track('links_kingdom_unlock');
    /* Let the layout settle before focusing, or iOS scrolls the page to chase
       the caret and the one-screen rule dies on the spot. */
    window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 380);
  };

  const onDown = (e: React.PointerEvent) => {
    if (phase !== 'locked') return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX - xRef.current;
    draggingRef.current = true;
    setDragging(true);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || phase !== 'locked') return;
    moveTo(Math.min(Math.max(e.clientX - startX.current, 0), travel()));
  };

  const onUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    if (xRef.current >= travel() * UNLOCK_AT) unlock();
    else moveTo(0);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFailed(false);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setPhase('done');
        onDone();
        track('links_kingdom_signup');
      } else {
        setFailed(true);
        track('links_kingdom_error');
      }
    } catch {
      setFailed(true);
      track('links_kingdom_error');
    }
    setSending(false);
  };

  /* The reward. Images, not a zip: a zip is a desktop object, and on the phone
     this audience actually uses it lands in Files and costs unzip, find, save
     to Photos, then set. Press-and-hold on a picture is one gesture. */
  if (phase === 'done') {
    return (
      <div className={`w-full ${RISE}`} style={style}>
        <p className="mb-2.5 text-center font-display text-[10px] font-bold uppercase tracking-[0.24em] text-ember short:mb-2">
          Press and hold to save
        </p>
        <div className="grid grid-cols-3 gap-2 short:gap-1.5">
          {WALLPAPERS.map((w) => (
            <a
              key={w.file}
              href={`/wallpapers/${w.file}.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('links_wallpaper_open', { wallpaper: w.label })}
              className="block overflow-hidden rounded-[3px] border border-bone/15 transition-colors duration-300 hover:border-ember"
              style={{ aspectRatio: '9/16' }}
            >
              <img
                src={`/wallpapers/thumbs/${w.file}.jpg`}
                alt={`Tropland wallpaper: ${w.label}`}
                className="h-full w-full object-cover"
              />
            </a>
          ))}
        </div>
        <a
          href="/wallpapers/tropland-wallpaper-pack.zip"
          onClick={() => track('links_wallpaper_pack_download')}
          className="mt-2.5 block text-center font-display text-[10.5px] font-light lowercase tracking-[0.02em] text-bone/40 underline-offset-4 transition-colors duration-300 hover:text-ember hover:underline short:mt-2"
        >
          or download all six as a zip
        </a>
      </div>
    );
  }

  const pct = travel() ? x / travel() : 0;

  return (
    <div className={`w-full ${RISE}`} style={style}>
      {/* One stage, fixed height, holding both the lock and the panel it opens
          into. Sized to the TALLER of the two so the rows underneath never
          shift by a pixel during the reveal. A layout jump mid-animation is
          the single thing that makes a custom control read as homemade. */}
      <div className="relative h-[108px] w-full short:h-[94px] tiny:h-[80px]">

      {/* ── The lock ───────────────────────────────────────────────────── */}
      <div
        ref={trackRef}
        className={`absolute inset-x-0 top-0 h-[62px] overflow-hidden rounded-full border transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,1,1)] short:h-[54px] tiny:h-[46px] ${
          phase === 'open'
            ? 'pointer-events-none -translate-y-2 scale-[0.96] border-ember/0 opacity-0'
            : 'border-ember/45'
        }`}
        aria-hidden={phase === 'open'}
      >
        {/* Ember fills in behind the knob as it travels, so the gesture has a
            progress reading and the last third feels inevitable. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 bg-ember/20"
          style={{ width: `${pct * 100}%`, transition: dragging ? 'none' : 'width 300ms ease-out' }}
        />

        <span
          className={`tu-shimmer pointer-events-none absolute inset-0 flex items-center justify-center pl-10 text-center font-display text-[12.5px] font-bold uppercase tracking-[0.16em] transition-opacity duration-200 tiny:text-[11px] ${
            pct > 0.12 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Slide for free wallpapers
        </span>

        {/* The knob is a real button so the whole thing survives a tap, a
            keyboard, and a screen reader without the drag ever happening. */}
        <button
          type="button"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onClick={() => { if (!draggingRef.current && xRef.current === 0) unlock(); }}
          aria-label="Slide to unlock six free mobile wallpapers"
          className={`absolute left-1 top-1 h-[54px] w-[54px] touch-none select-none overflow-hidden rounded-full border shadow-[0_6px_18px_-4px_rgba(0,0,0,0.85)] transition-colors duration-300 ${armed ? 'border-ember/60' : 'border-bone/30'} active:scale-[0.97] motion-reduce:active:scale-100 short:h-[46px] short:w-[46px] tiny:h-[38px] tiny:w-[38px]`}
          style={{
            transform: `translateX(${x}px)`,
            transition: dragging ? 'none' : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
            cursor: 'grab',
          }}
        >
          {/* Two layers in one circle. The lock is what you grab; the lion is
              what it becomes. Cross-fading them at the end of the travel makes
              the gesture pay off in the brand rather than in a state change:
              you did not submit a form, you opened something. */}

          {/* Brushed metal, faked the way real chrome reads: a hard light band
              across the upper third, a dark roll underneath it, and a second
              lift at the bottom edge for the bounce light. A flat grey circle
              would look like a disabled button. */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 flex items-center justify-center rounded-full transition-[opacity,transform] duration-[260ms] ease-out ${
              armed ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
            }`}
            style={{
              background:
                'linear-gradient(145deg,#fdfdfe 0%,#dcdee3 18%,#a8abb3 42%,#7f838c 58%,#c6c9d0 82%,#8f939b 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.85), inset 0 -2px 4px rgba(0,0,0,0.35)',
            }}
          >
            {/* The shackle lifts once the throw is past the threshold, so the
                control tells you it has caught BEFORE you let go. */}
            <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px] tiny:h-[17px] tiny:w-[17px]">
              <path
                d="M8 10V7.5a4 4 0 0 1 8 0V10"
                stroke="#4a4d55"
                strokeWidth="1.9"
                strokeLinecap="round"
                style={{
                  transform: pct > UNLOCK_AT ? 'translateY(-2.5px)' : 'none',
                  transition: 'transform 220ms cubic-bezier(0.34,1.4,0.64,1)',
                }}
              />
              <rect x="4.75" y="10" width="14.5" height="9.5" rx="2.2" fill="#4a4d55" />
            </svg>
          </span>

          <img
            src="/wallpapers/thumbs/tropland-peace.jpg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className={`pointer-events-none h-full w-full rounded-full object-cover transition-[opacity,transform] duration-[280ms] ease-[cubic-bezier(0.34,1.4,0.64,1)] ${
              armed ? 'scale-100 opacity-100' : 'scale-[0.72] opacity-0'
            }`}
          />
        </button>
      </div>

      {/* ── The box it opens ───────────────────────────────────────────────
          Drops from behind the lock on a curve that overshoots slightly and
          settles, so it reads as a panel falling into place rather than a div
          fading in. 380ms, and the focus call fires at 240 — the keyboard is
          already rising while this is still settling, which is the whole
          point. An animation you have to wait out is friction in costume. */}
      <form
        onSubmit={submit}
        style={{ transformOrigin: 'top center' }}
        className={`absolute inset-x-0 top-0 transition-all duration-[380ms] ease-[cubic-bezier(0.34,1.4,0.64,1)] ${
          phase === 'open'
            ? 'translate-y-0 scale-y-100 opacity-100'
            : 'pointer-events-none -translate-y-5 scale-y-[0.82] opacity-0'
        }`}
      >
        {/* "Where should they go?" put the ASK first, which is the one thing
            this moment cannot do. They just slid a lock to get wallpapers; if
            the next screen opens with a request it reads as a toll, and a toll
            after a promise is worse than a plain form, because a plain form
            never promised anything.

            So the win is stated first and in the past tense. The wallpapers
            are already unlocked, already theirs; the field is a delivery
            address, not a price. The ask itself moves into the placeholder,
            where it costs no vertical space and sits exactly where the thumb
            is already going. */}
        <p
          className={`mb-1.5 text-center font-display text-[11px] font-bold uppercase tracking-[0.22em] text-ember transition-opacity duration-300 short:mb-1 ${
            phase === 'open' ? 'opacity-100 delay-150' : 'opacity-0'
          }`}
        >
          {failed ? 'That did not send, try again' : 'Wallpapers unlocked'}
        </p>
        <div className="flex h-[58px] w-full items-center rounded-[3px] border border-ember/55 pl-5 pr-1.5 transition-colors duration-300 focus-within:border-ember short:h-[50px] tiny:h-[42px]">
          <input
            ref={inputRef}
            id="links-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="where should we send them?"
            autoComplete="email"
            className="h-full min-w-0 flex-1 bg-transparent font-display text-[13px] tracking-[0.04em] text-bone placeholder-bone/35 focus:outline-none tiny:text-[12px]"
          />
          <button
            type="submit"
            disabled={sending}
            className="h-[42px] shrink-0 rounded-[2px] bg-ember px-4 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-ink transition-transform duration-300 active:scale-[0.97] disabled:opacity-60 motion-reduce:active:scale-100 short:h-[38px] tiny:h-[32px] tiny:px-3 tiny:text-[11px]"
          >
            {sending ? '...' : 'Send'}
          </button>
        </div>
        {/* The line that answers the question nobody types. Plain enough to
            survive a non-native read, and it is the site's existing promise
            rather than a new one. */}
        <p
          className={`mt-2 text-center font-display text-[9.5px] font-light uppercase tracking-[0.16em] text-bone/35 transition-opacity duration-300 short:mt-1.5 ${
            phase === 'open' ? 'opacity-100 delay-300' : 'opacity-0'
          }`}
        >
          No spam. Unsubscribe anytime.
        </p>
      </form>
      </div>
    </div>
  );
};

const Links: React.FC = () => {
  const portraitRef = useKeepPlaying();
  /* Once they have converted the grid needs the height the rows were using,
     and the rows have done their job. Back-tap restores them. */
  const [converted, setConverted] = React.useState(false);
  /* The portrait yields its height the moment the lock opens, not when the
     send lands, because that is when the panel needs the room. */
  const [unlocked, setUnlocked] = React.useState(false);

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

    {/* ── The field ──────────────────────────────────────────────────────
        Four layers, because one flat wash is what made this read cheap. The
        blurred photograph was carrying the whole background alone and a single
        orange-to-black gradient is the most generic surface on the web.

        What replaces it is LIGHT rather than colour. The circus is the live
        lane, so the page is lit like a tent: one hard source above, everything
        falling away into black at the edges. That does two things a gradient
        cannot. It gives the portrait a reason to be bright, so it reads as lit
        instead of pasted onto a background. And it puts the darkest part of
        the page at the rim, which is where the eye stops looking.

        Over the top sits a woven thread at very low opacity. This is the part
        that actually sells "premium": expensive print surfaces are never
        perfectly smooth, and a surface with grain in it reads as a material
        while a pure gradient reads as a screen. It costs nothing, no image,
        no request, just two repeating gradients a degree or two off-axis so
        they never form a visible moiré.

        Scoped to /links deliberately (Josh, 2026-07-28). ────────────────── */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* The photograph, now far back: colour temperature only, no shape. */}
      <img
        src="/images/josh-lion-ambient.jpg"
        alt=""
        className="h-full w-full scale-125 object-cover opacity-[0.30] blur-[78px] saturate-[1.25]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/[0.82] to-ink/[0.97]" />

      {/* The source. Warm, high, and wide enough that its falloff is the
          gradient rather than a visible disc. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 62% at 50% -6%, rgba(255,196,140,0.20) 0%, rgba(255,150,80,0.07) 34%, rgba(0,0,0,0) 66%), radial-gradient(70% 44% at 50% 4%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 60%)',
        }}
      />

      {/* The weave. Two threads a few degrees apart so they cross instead of
          banding, one catching light and one holding shadow. */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(48deg, rgba(255,255,255,0.030) 0px, rgba(255,255,255,0.030) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px), repeating-linear-gradient(-42deg, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0.16) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 5px)',
        }}
      />

      {/* The rim. Last, so it darkens everything above it including the weave,
          which is what keeps the corners from looking textured-but-flat. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 78% at 50% 34%, rgba(0,0,0,0) 32%, rgba(0,0,0,0.55) 74%, rgba(0,0,0,0.90) 100%)',
        }}
      />
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
          className={`relative rounded-full border border-ember/45 object-cover shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)] transition-[height,width] duration-500 short:h-[104px] short:w-[104px] ${unlocked || converted ? 'h-[96px] w-[96px]' : 'h-[136px] w-[136px]'}`}
        />
      </div>

      {/* ── The lockup ────────────────────────────────────────────────── */}
      <p
        className={`text-center font-display text-[10px] font-bold uppercase tracking-[0.28em] text-ember short:mt-4 tiny:mt-0 ${unlocked || converted ? 'mt-4' : 'mt-6'} ${RISE}`}
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
      <div className={`w-full short:mt-5 tiny:mt-4 ${converted ? 'mt-5' : 'mt-7'}`}>
        <KingdomCapture style={rise(220)} onUnlock={() => setUnlocked(true)} onDone={() => setConverted(true)} />
      </div>

      {/* ── The index ─────────────────────────────────────────────────── */}
      {!converted && (
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
      )}

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
