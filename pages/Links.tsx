import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { track } from '@vercel/analytics';
import { Youtube, Facebook, Instagram, Globe, Image as ImageIcon } from 'lucide-react';

/**
 * /links — the Instagram bio destination.
 *
 * Rebuilt 2026-07-26 to the actual Linktree structure, measured off a live
 * linktr.ee profile at a 375x812 viewport rather than from memory:
 *
 *   container   347px wide (14px gutters)
 *   avatar      96px, fully round, centered
 *   handle      24px / weight 600, centered
 *   buttons     full-width, 64px tall, stacked, equal weight, label centered
 *
 * The hard requirement is ONE SCREEN, NO SCROLL. Five buttons at 60px plus
 * the header lands near 600px, which clears an iPhone SE (667) as well as a
 * 812 viewport, so the page is h-[100svh] with overflow hidden. svh, not vh:
 * mobile browser chrome makes vh taller than the visible area and would
 * reintroduce exactly the scroll this page is not allowed to have.
 *
 * YouTube is the one filled button. Linktree calls this a featured link and
 * it costs nothing structurally, but it matters here: the channel sits at 31
 * of the 4,000 valid public watch hours YPP requires and Shorts time is
 * excluded by name, so a human choosing to watch long-form is the single
 * behavior this page exists to cause.
 *
 * Wallpapers point at /#kingdom rather than carrying an inline form. The
 * email capture is the only thing on the site that converts a viewer into
 * something we own, and one tap to reach it keeps it alive without spending
 * the vertical space a form would cost.
 *
 * Copy stays plain. India and Brazil are the two largest audience blocs, so
 * the words are simple on purpose.
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
    icon: <Youtube size={20} />,
    featured: true,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/troplanduniverse',
    event: 'links_facebook',
    icon: <Facebook size={20} />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/troplanduniverse',
    event: 'links_instagram',
    icon: <Instagram size={20} />,
  },
  {
    label: 'Website',
    href: '/',
    event: 'links_site',
    icon: <Globe size={20} />,
    internal: true,
  },
  {
    label: 'Free Wallpapers',
    href: '/#kingdom',
    event: 'links_wallpapers',
    icon: <ImageIcon size={20} />,
    internal: true,
  },
];

const Links: React.FC = () => (
  <main className="flex min-h-[100svh] bg-ink text-bone">
    <Helmet>
      <title>Tropland Universe | Links</title>
      <meta
        name="description"
        content="Tropland Universe, The Digital Animal Kingdom. YouTube, Facebook, Instagram, the website, and six free wallpapers."
      />
      <meta property="og:title" content="Tropland Universe | Links" />
      <meta property="og:url" content="https://troplanduniverse.com/links" />
    </Helmet>

    {/* m-auto rather than justify-center: it centers when there is room and
        never pushes content out of reach when there isn't. */}
    <div className="m-auto flex w-full max-w-[400px] flex-col items-center px-[14px] py-6 short:py-4">

      {/* Identity — Linktree's exact stack: round avatar, handle, one line */}
      <img
        src="/apple-touch-icon.png"
        alt=""
        aria-hidden="true"
        width={96}
        height={96}
        className="h-24 w-24 shrink-0 rounded-full border border-bone/15 object-cover short:h-16 short:w-16 tiny:hidden"
      />
      <h1 className="mt-4 text-center font-display text-[24px] font-semibold leading-tight tracking-[-0.01em] short:mt-3 short:text-[20px] tiny:mt-0">
        Tropland{' '}
        <span className="font-edit italic font-light text-ember">Universe</span>
      </h1>
      <p className="mt-1 text-center font-display text-[14px] font-light text-bone/55 short:hidden">
        The Digital Animal Kingdom
      </p>

      {/* The stack */}
      <nav
        aria-label="Tropland Universe links"
        className="mt-7 flex w-full flex-col gap-3 short:mt-4 short:gap-2"
      >
        {items.map((item) => {
          const base =
            'group flex h-[60px] w-full items-center gap-3 rounded-2xl px-5 font-display text-[16px] font-bold transition-colors duration-200 short:h-[50px] short:rounded-xl tiny:h-[44px] tiny:text-[15px]';
          const skin = item.featured
            ? 'bg-ember text-ink hover:bg-ember-soft'
            : 'border border-bone/20 text-bone hover:border-ember hover:text-ember';

          const inner = (
            <>
              <span className="shrink-0 opacity-90">{item.icon}</span>
              <span className="flex-1 text-center">{item.label}</span>
              {/* Mirrors the icon so the label sits truly centered, as Linktree does */}
              <span className="w-5 shrink-0" aria-hidden="true" />
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
