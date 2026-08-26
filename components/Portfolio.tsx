import React from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTag from './fx/SectionTag';
import ManifestoText from './fx/ManifestoText';
import Odometer from './fx/Odometer';
import Reveal from './fx/Reveal';

const metrics = [
  { value: '3M+', label: 'Followers · Instagram + Facebook' },
  { value: '50+', label: 'Countries Reached' },
  { value: '#1', label: 'AI Artist Influencer · Feedspot 2026' },
  { value: '267M', label: 'Single Viral Piece' },
  { value: '5', label: 'Published Books' },
  { value: '20+', label: 'Years of Tropland' },
];

const galleryRow1 = [
  '/images/gallery/home003.jpg',
  '/images/gallery/lion-peace-1.jpg',
  '/images/gallery/home1.jpg',
  '/images/gallery/IMG_2051.jpg',
  '/images/gallery/home004.jpg',
  '/images/gallery/jag-shaka-1.jpg',
];

const galleryRow2 = [
  '/images/gallery/gorilla-thumb.jpg',
  '/images/gallery/lion-love-2.jpg',
  '/images/gallery/11home005.jpg',
  '/images/gallery/home2.jpg',
  '/images/gallery/11home001.jpg',
  '/images/gallery/home010-2.jpg',
];

const GalleryCell: React.FC<{ src: string }> = ({ src }) => (
  <div className="tu-frame w-64 md:w-80 h-64 md:h-80 flex-shrink-0 bg-ink-2">
    <img src={src} alt="Tropland original artwork" className="w-full h-full object-cover" loading="lazy" decoding="async" />
  </div>
);

const Portfolio: React.FC = () => {
  return (
    <section id="universe" className="relative bg-bone py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-6 md:px-12">

        <Reveal>
          <SectionTag label="The Universe" dark={false} className="mb-12 md:mb-16" />
        </Reveal>

        {/* Manifesto — words ink in on scroll */}
        <ManifestoText
          className="font-display font-medium text-[7.4vw] md:text-[3.4vw] leading-[1.12] tracking-[-0.015em] text-ink max-w-6xl mb-6"
          text="Tropland began as a children's picture book. Twenty years later, it is an animal kingdom with billions of views: original characters, photoreal worlds, and wildlife stories carried by more than 3 million followers on Instagram and Facebook, across fifty countries."
          accents={['billions', 'photoreal', 'original']}
        />

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3 mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-bone font-mono text-[11px] uppercase tracking-[0.18em]">
              <Award size={12} className="text-ember" />
              #1 AI Artist Influencer · Feedspot 2026
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
          <div className="grid grid-cols-2 md:grid-cols-3 border-t border-b border-ink/15 mb-16 md:mb-20">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`py-7 md:py-9 px-2 md:px-8 ${i % 2 === 1 ? 'border-l border-ink/10' : ''} ${i % 3 !== 0 ? 'md:border-l md:border-ink/10' : 'md:border-l-0'} ${i >= 2 ? 'border-t border-ink/10' : ''} ${i >= 3 ? 'md:border-t md:border-ink/10' : 'md:border-t-0'} group hover:bg-ink/[0.03] transition-colors duration-500`}
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
            {[...galleryRow1, ...galleryRow1].map((src, i) => (
              <GalleryCell key={i} src={src} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="animate-marquee-reverse flex gap-3 w-max">
            {[...galleryRow2, ...galleryRow2].map((src, i) => (
              <GalleryCell key={i} src={src} />
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
            Four Tropland videos have each passed <span className="font-bold text-ink">100 million views</span> across platforms. The digital circus series passed <span className="font-bold text-ink">150 million</span> in its first three weeks.
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export default Portfolio;
