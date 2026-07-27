import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { track } from '@vercel/analytics';
import { Youtube, Facebook, Instagram, Globe, Image as ImageIcon } from 'lucide-react';

/**
 * /links — the Instagram bio destination.
 *
 * Structure is Linktree, measured off a live linktr.ee profile at 375x812
 * rather than recalled: container ~347px (14px gutters), round avatar,
 * handle at 24px/600, full-width buttons ~64px tall stacked equal-weight
 * with centered labels.
 *
 * Skin is Tropland, per Josh 2026-07-26 ("page should follow tropland
 * branding a little"). What that means concretely, taken from the live site
 * rather than invented: ink ground, the grain overlay every other page
 * carries, a Spline Sans Mono eyebrow at 0.28em tracking (the SectionTag
 * treatment), and the house lockup — Bricolage Grotesque extrabold uppercase
 * with a single Fraunces italic ember word. Buttons keep Linktree's shape,
 * because that is the format Josh asked for, but take the site's uppercase
 * tracked label voice.
 *
 * The avatar is Josh with the lion, his pick. That is the "visibility as
 * JOSH, not just Tropland" edge doing real work: the bio destination for
 * 1.3M followers now has a face on it instead of a logo.
 *
 * HARD REQUIREMENT: one screen, no scroll. min-h-100svh with m-auto rather
 * than a fixed height with overflow hidden — m-auto centers when there is
 * room and never pushes content out of reach when there isn't. svh, not vh:
 * mobile browser chrome makes vh taller than the visible area and would
 * reintroduce the exact scroll this page is not allowed to have. The short/
 * tiny height variants exist because a landscape phone at 740x360 clipped
 * the avatar off the top and the last button off the bottom.
 *
 * YouTube is the one filled button (Linktree calls it a featured link, so it
 * costs nothing structurally). The channel sits at 31 of the 4,000 valid
 * public watch hours YPP requires and Shorts time is excluded by name, so a
 * human choosing to watch long-form is the single behavior this page exists
 * to cause.
 *
 * Wallpapers point at /#kingdom instead of carrying a form. The email
 * capture is the only thing on the site that converts a viewer into
 * something we own, and one tap keeps it reachable without spending the
 * vertical space a form costs. Patreon deliberately does NOT appear here: it
 * lives on the /#kingdom success screen, after capture, because a cold paid
 * ask to a majority-India audience taxes the funnel this page feeds.
 *
 * noindex is deliberate. One intended referrer (the IG bio), no site chrome,
 * and a five-link page should never compete with the homepage on brand
 * queries. It was dropped once by accident; this comment is why it stays.
 *
 * Copy stays plain. India and Brazil are the two largest audience blocs.
 */

interface Item {
  label: string;
  href: string;
  event: string;
  icon: React.ReactNode;
  internal?: boolean;
  featured?: boolean;
}

const items: Item[] = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@troplanduniverse',
    event: 'links_youtube',
    icon: <Youtube size={19} />,
    featured: true,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/troplanduniverse',
    event: 'links_facebook',
    icon: <Facebook size={19} />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/troplanduniverse',
    event: 'links_instagram',
    icon: <Instagram size={19} />,
  },
  {
    label: 'Website',
    href: '/',
    event: 'links_site',
    icon: <Globe size={19} />,
    internal: true,
  },
  {
    label: 'Free Wallpapers',
    href: '/#kingdom',
    event: 'links_wallpapers',
    icon: <ImageIcon size={19} />,
    internal: true,
  },
];

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

    {/* m-auto rather than justify-center: centers when there is room, never
        pushes content out of reach when there isn't. */}
    <div className="m-auto flex w-full max-w-[400px] flex-col items-center px-[14px] py-6 short:py-4">

      <img
        src="/images/josh-lion-avatar.jpg"
        alt="Josh Gottsegen with a lion of the Tropland Universe"
        width={112}
        height={112}
        className="h-28 w-28 shrink-0 rounded-full border border-ember/40 object-cover short:h-[72px] short:w-[72px] tiny:hidden"
      />

      {/* SectionTag treatment: mono, 0.28em, ember */}
      <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-ember short:mt-3">
        The Digital Animal Kingdom
      </p>

      {/* House lockup: Bricolage extrabold uppercase + one Fraunces italic word */}
      <h1 className="mt-2 text-center font-display text-[30px] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-bone short:text-[25px] tiny:mt-0">
        Tropland{' '}
        <span className="font-edit text-[32px] font-light normal-case italic tracking-normal text-ember short:text-[27px]">
          Universe
        </span>
      </h1>

      <nav
        aria-label="Tropland Universe links"
        className="mt-7 flex w-full flex-col gap-3 short:mt-5 short:gap-2"
      >
        {items.map((item) => {
          const base =
            'group flex h-[60px] w-full items-center gap-3 rounded-xl px-5 font-display text-[13px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 short:h-[50px] tiny:h-[44px] tiny:text-[12px]';
          const skin = item.featured
            ? 'bg-ember text-ink hover:bg-ember-soft'
            : 'border border-bone/20 text-bone hover:border-ember hover:text-ember';

          const inner = (
            <>
              <span className="shrink-0 opacity-90">{item.icon}</span>
              <span className="flex-1 text-center">{item.label}</span>
              {/* Mirrors the icon so the label sits truly centered */}
              <span className="w-[19px] shrink-0" aria-hidden="true" />
            </>
          );

          return item.internal ? (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => track(item.event)}
              className={`${base} ${skin}`}
            >
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
    </div>
  </main>
);

export default Links;
