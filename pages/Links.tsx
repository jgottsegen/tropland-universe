import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { track } from '@vercel/analytics';

/**
 * /links — the Instagram bio destination.
 *
 * THE THESIS: the photograph is the hero, not an avatar.
 *
 * The most distinctive thing Josh owns is a picture of himself cheek to
 * cheek with a lion, and the entire brand runs on the "is this real?"
 * question that picture provokes. Rendering it as a 112px circle was the
 * template answer — it turned the strongest asset on the page into a
 * profile pic. It now bleeds edge to edge across the top and dissolves into
 * the ink through a gradient, with the lockup set into the dissolve. That
 * is the one place this page spends its boldness; everything below it stays
 * quiet on purpose.
 *
 * WHAT WAS CUT, and why (Josh's bar: must not read as AI slop, must survive
 * a talent agency, a large brand, and a fan):
 *   - Generic outline icons. A globe standing for "website" and a picture
 *     frame standing for "wallpapers" are stock-template vocabulary and the
 *     loudest tell on the page. Type carries the rows now.
 *   - The solid full-width orange button. That is the Linktree default with
 *     a brand color swapped in. YouTube keeps its priority through an ember
 *     rule and ember type, which is hierarchy without a slab.
 *   - Soft 12px radii. The Tropland site is built on sharp frames and
 *     hairlines; the rows now match it at 3px.
 *   - Centered labels with a phantom spacer holding the balance. Rows are
 *     left-aligned and read as an editorial index.
 *
 * STRUCTURE is still Linktree, measured off a live linktr.ee profile at
 * 375x812 rather than recalled: one screen, no scroll, a single stacked
 * column of full-width tap targets, ~347px content width.
 *
 * ORDER is Josh's, verbatim, and YouTube leads for a reason: the channel
 * sits at 31 of the 4,000 valid public watch hours YPP requires and Shorts
 * time is excluded by name, so a human choosing to watch long-form is the
 * single behavior this page exists to cause.
 *
 * Wallpapers point at /#kingdom rather than carrying a form. The email
 * capture is the only thing on the site that converts a viewer into
 * something we own, and one tap keeps it reachable without spending the
 * vertical space a form costs. Patreon is deliberately absent: it lives on
 * the /#kingdom success screen, after capture, because a cold paid ask to a
 * majority-India audience taxes the funnel this page feeds.
 *
 * NO SCROLL is enforced, not hoped for: min-h-100svh with m-auto, which
 * centers when there is room and never pushes content out of reach when
 * there isn't. svh rather than vh because mobile browser chrome makes vh
 * taller than the visible area. The height variants exist because a
 * landscape phone at 740x360 clipped the header off the top and the last
 * row off the bottom.
 *
 * noindex is deliberate: one intended referrer, no site chrome, and a
 * five-link page should never compete with the homepage on brand queries.
 * The meta below is the belt; robots.txt is the braces, because
 * react-helmet-async does not reliably apply under React 19.
 */

interface Item {
  label: string;
  href: string;
  event: string;
  internal?: boolean;
  featured?: boolean;
}

const items: Item[] = [
  { label: 'YouTube', href: 'https://www.youtube.com/@troplanduniverse', event: 'links_youtube', featured: true },
  { label: 'Facebook', href: 'https://facebook.com/troplanduniverse', event: 'links_facebook' },
  { label: 'Instagram', href: 'https://instagram.com/troplanduniverse', event: 'links_instagram' },
  { label: 'Website', href: '/', event: 'links_site', internal: true },
  { label: 'Free Wallpapers', href: '/#kingdom', event: 'links_wallpapers', internal: true },
];

/* A hairline chevron. Thinner than any icon-set default, which is the point. */
const Chevron: React.FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    aria-hidden="true"
    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M3 1.5L8.5 6.5L3 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
  </svg>
);

const Links: React.FC = () => (
  <main className="relative flex min-h-[100svh] bg-ink text-bone">
    <Helmet>
      <title>Tropland Universe | Links</title>
      <meta name="robots" content="noindex" />
      <meta
        name="description"
        content="Tropland Universe, The Digital Animal Kingdom. YouTube, Facebook, Instagram, the website, and six free wallpapers."
      />
      <meta property="og:title" content="Tropland Universe | Links" />
      <meta property="og:url" content="https://troplanduniverse.com/links" />
    </Helmet>

    {/* The house grain. AppLayout skips it on bare-render paths, so the page
        carries its own or it reads as a different site. */}
    <div className="tu-grain" aria-hidden="true" />

    {/* Top-anchored, not centered. The hero has to bleed off the top edge of
        the screen or the dissolve reads as a gap rather than a decision.
        Slack falls at the bottom, below the last row, where it is invisible. */}
    <div className="mx-auto w-full max-w-[400px] self-start pb-7 short:pb-5 tiny:pb-1">

      {/* ── The hero. Bleeds to the column edges, dissolves into the ink. ── */}
      <header className="relative tiny:hidden">
        {/* Fluid height, not a fixed one. Fixed pixels meant a 200px band on
            an iPhone SE and a 375px square on a Pro Max, so the page looked
            top-heavy on one and balanced on the other. 42svh keeps the same
            proportion on every screen; the 400px cap stops it dominating a
            desktop window. Square source so any crop stays on the faces. */}
        <img
          src="/images/josh-lion-hero.jpg"
          alt="Josh Gottsegen beside a lion of the Tropland Universe"
          width={900}
          height={900}
          className="h-[min(38svh,380px)] w-full object-cover object-center"
        />
        {/* Two stops, not three: a long fade doing the work of a scrim. */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/40 to-ink"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 px-[18px] pb-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-ember">
            The Digital Animal Kingdom
          </p>
          <h1 className="mt-2 font-display text-[32px] font-extrabold uppercase leading-[0.92] tracking-[-0.025em] text-bone short:text-[27px]">
            Tropland{' '}
            <span className="font-edit text-[34px] font-light normal-case italic tracking-normal text-ember short:text-[29px]">
              Universe
            </span>
          </h1>
        </div>
      </header>

      {/* Landscape has no room for the hero, so the lockup stands alone. */}
      <div className="hidden px-[18px] pt-5 tiny:block">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-ember">
          The Digital Animal Kingdom
        </p>
        <h1 className="mt-1.5 font-display text-[24px] font-extrabold uppercase leading-[0.92] tracking-[-0.025em] text-bone">
          Tropland{' '}
          <span className="font-edit text-[26px] font-light normal-case italic tracking-normal text-ember">
            Universe
          </span>
        </h1>
      </div>

      {/* ── The index ─────────────────────────────────────────────────── */}
      <nav
        aria-label="Tropland Universe links"
        className="mt-6 flex flex-col gap-[10px] px-[14px] short:mt-5 short:gap-2 tiny:mt-4 tiny:gap-1.5"
      >
        {items.map((item) => {
          const base =
            'group flex h-[58px] w-full items-center justify-between rounded-[3px] border px-5 font-display text-[13px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 short:h-[50px] tiny:h-[36px] tiny:text-[12px]';
          const skin = item.featured
            ? 'border-ember/55 text-ember hover:bg-ember hover:text-ink hover:border-ember'
            : 'border-bone/15 text-bone hover:border-bone/50 hover:bg-ink-2';

          const inner = (
            <>
              <span>{item.label}</span>
              <Chevron />
            </>
          );

          return item.internal ? (
            <Link key={item.label} to={item.href} onClick={() => track(item.event)} className={`${base} ${skin}`}>
              {inner}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(item.event)}
              className={`${base} ${skin}`}
            >
              {inner}
            </a>
          );
        })}
      </nav>

      {/* ── The business door ──────────────────────────────────────────
          Boxed, like the five above. It was unboxed for one pass on a
          hierarchy argument, and that was wrong twice over: a single
          borderless row under five bordered ones reads as a footer, and
          footers get skipped by exactly the person this exists for. It also
          reads as an oversight rather than a decision, which is the failure
          mode this page is being held to.

          It says "Contact", not "Brands & Partnerships". The narrower name
          quietly turned away the buyer Josh is actually chasing right now:
          an agency reading "Brands & Partnerships" files it as the
          sponsorship inbox and moves on, while representation, studios and
          press have no obvious door at all. "Contact" is the word every one
          of them looks for, and it costs nothing.

          The address is visible rather than hidden behind a mailto. A buyer
          who wants to reach out from a desktop, or forward it to a colleague,
          needs to SEE it. A live address on the page is also the cheapest
          credibility signal there is. The tier below still reads as a
          different kind of thing, but through the hairline and the mono
          address, not by removing the affordance. */}
      <div className="mt-5 px-[14px] short:mt-4 tiny:mt-3">
        <div className="mb-3 h-px w-full bg-bone/10 short:mb-2.5" />
        <a
          href="mailto:partnerships@troplanduniverse.com?subject=Partnership%20inquiry"
          onClick={() => track('links_contact')}
          className="group flex h-[62px] w-full items-center justify-between rounded-[3px] border border-bone/15 px-5 transition-colors duration-300 hover:border-bone/50 hover:bg-ink-2 short:h-[54px] tiny:h-[46px]"
        >
          <span className="min-w-0">
            <span className="block font-display text-[13px] font-bold uppercase tracking-[0.12em] text-bone tiny:text-[12px]">
              Contact
            </span>
            <span className="mt-1 block truncate font-mono text-[10.5px] lowercase tracking-[0.02em] text-bone/45 transition-colors duration-300 group-hover:text-ember tiny:text-[9.5px]">
              partnerships@troplanduniverse.com
            </span>
          </span>
          <Chevron />
        </a>
      </div>
    </div>
  </main>
);

export default Links;
