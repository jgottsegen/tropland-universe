import React from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTag from './fx/SectionTag';
import ManifestoText from './fx/ManifestoText';
import Odometer from './fx/Odometer';
import Reveal from './fx/Reveal';

const metrics = [
  { value: '5', label: 'Published Books' },
  { value: '267M', label: 'Single Viral Piece' },
  { value: '50K+', label: 'Original Artworks' },
  { value: '20+', label: 'Years of Tropland' },
];

const galleryRow1 = [
  { src: '/images/gallery/home003.jpg', tag: 'TU·F-014' },
  { src: '/images/gallery/lion-peace-1.jpg', tag: 'TU·F-022' },
  { src: '/images/gallery/home1.jpg', tag: 'TU·F-031' },
  { src: '/images/gallery/IMG_2051.jpg', tag: 'TU·F-008' },
  { src: '/images/gallery/home004.jpg', tag: 'TU·F-047' },
  { src: '/images/gallery/jag-shaka-1.jpg', tag: 'TU·F-053' },
];

const galleryRow2 = [
  { src: '/images/gallery/gorilla-thumb.jpg', tag: 'TU·F-061' },
  { src: '/images/gallery/lion-love-2.jpg', tag: 'TU·F-019' },
  { src: '/images/gallery/11home005.jpg', tag: 'TU·F-027' },
  { src: '/images/gallery/home2.jpg', tag: 'TU·F-035' },
  { src: '/images/gallery/11home001.jpg', tag: 'TU·F-042' },
  { src: '/images/gallery/home010-2.jpg', tag: 'TU·F-058' },
];

const GalleryCell: React.FC<{ src: string; tag: string }> = ({ src, tag }) => (
  <div
    className="tu-frame w-64 md:w-80 h-64 md:h-80 flex-shrink-0 bg-ink-2"
    data-cursor
    data-cursor-label="View"
  >
    <img src={src} alt="Tropland original artwork" className="w-full h-full object-cover" loading="lazy" />
    <div className="tu-frame-meta bg-ink/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
      <span className="font-mono text-[10px] tracking-[0.2em] text-white/70">{tag}</span>
      <span className="font-mono text-[10px] tracking-[0.2em] text-ember">ORIGINAL · 4K</span>
    </div>
  </div>
);

const Portfolio: React.FC = () => {
  return (
    <section id="universe" className="relative bg-bone py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-6 md:px-12">

        <Reveal>
          <SectionTag index="01" label="The Universe" dark={false} className="mb-12 md:mb-16" />
        </Reveal>

        {/* Manifesto — words ink in on scroll */}
        <ManifestoText
          className="font-display font-medium text-[7.4vw] md:text-[3.4vw] leading-[1.12] tracking-[-0.015em] text-ink max-w-6xl mb-6"
          text="Tropland began as a children's picture book. Twenty years later, it is a billion-view animal kingdom: original characters, photoreal worlds, and wildlife stories carried by three million followers across fifty countries."
          accents={['billion-view', 'photoreal', 'original']}
        />

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3 mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-bone font-mono text-[11px] uppercase tracking-[0.18em]">
              <Award size={12} className="text-ember" />
              #1 AI Artist Influencer · Feedspot 2025 + 2026
            </span>
            <Link
              to="/licensing"
              className="inline-flex items-center gap-2 px-4 py-2 border border-ink/20 text-ink font-mono text-[11px] uppercase tracking-[0.18em] hover:border-ember-deep hover:text-ember-deep transition-colors duration-300"
            >
              Licensing · All-American Licensing
              <ArrowUpRight size={11} />
            </Link>
          </div>
        </Reveal>

        {/* Metric ledger */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-ink/15 mb-16 md:mb-20">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`py-7 md:py-9 px-2 md:px-8 ${i > 0 ? 'border-l border-ink/10' : ''} ${i >= 2 ? 'border-t border-ink/10 md:border-t-0' : ''} group hover:bg-ink/[0.03] transition-colors duration-500`}
              >
                <div className="font-display font-extrabold text-4xl md:text-[3.4rem] text-ink leading-none tracking-tight">
                  <Odometer value={m.value} />
                </div>
                <div className="font-mono text-[10px] md:text-[11px] text-ink/55 uppercase tracking-[0.22em] mt-3">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* The Field — full-bleed specimen reels */}
      <div className="tu-marquee-pause">
        <div className="overflow-hidden mb-3">
          <div className="animate-marquee flex gap-3 w-max">
            {[...galleryRow1, ...galleryRow1].map((item, i) => (
              <GalleryCell key={i} {...item} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="animate-marquee-reverse flex gap-3 w-max">
            {[...galleryRow2, ...galleryRow2].map((item, i) => (
              <GalleryCell key={i} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Record footnote */}
      <Reveal delay={0.1}>
        <div className="max-w-[1480px] mx-auto px-6 md:px-12 mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/45">
            Field record
          </span>
          <span className="h-px w-10 bg-ink/20 hidden md:block" />
          <p className="font-display text-[15px] text-ink/75">
            A single Tropland reel has reached <span className="font-bold text-ink">267 million views</span> across platforms.
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export default Portfolio;
