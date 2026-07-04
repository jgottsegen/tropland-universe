import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionTag from './fx/SectionTag';
import Reveal from './fx/Reveal';

/**
 * TU·03 — The Field.
 * Live footage rail: vertical reels playing muted, the native format
 * of the audience the numbers come from.
 */
// Sequenced as one universe expanding: the kingdom first, then the big top.
const reels = [
  { src: '/video/reel-temple.mp4', title: 'The Temple Walk', meta: 'LION · CITY OF GOLD' },
  { src: '/video/reel-snow.mp4', title: 'First Snow', meta: 'LION · WINTER FIELD' },
  { src: '/video/reel-river.mp4', title: 'The Living Painting', meta: 'WATERCOLOR WORLD' },
  { src: '/video/reel-leopard.mp4', title: 'The Tightrope', meta: 'BIG TOP SERIES' },
  { src: '/video/reel-elephant.mp4', title: 'The Reveal', meta: 'BIG TOP SERIES · CROWD POV' },
  { src: '/video/reel-giraffe.mp4', title: 'The Showman', meta: 'BIG TOP SERIES · FINALE' },
];

const ReelCard: React.FC<{ src: string; title: string; meta: string }> = ({ src, title, meta }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="tu-frame tu-reel-card flex-shrink-0 snap-start bg-ink-2 border border-bone/10 relative group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
      />
      {/* grade */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent pointer-events-none" />
      <figcaption className="absolute left-0 right-0 bottom-0 px-5 py-4 flex items-end justify-between gap-3">
        <span className="font-display font-bold text-lg text-bone leading-tight">{title}</span>
        <span className="font-mono text-[9px] tracking-[0.18em] text-bone/50 uppercase whitespace-nowrap pb-1">
          {meta}
        </span>
      </figcaption>
      {/* rec dot */}
      <span className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-bone/70 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
        Tropland Original
      </span>
    </figure>
  );
};

const FieldReels: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || e.pointerType !== 'mouse') return;
    drag.current = { down: true, startX: e.clientX, startScroll: rail.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    rail.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => { drag.current.down = false; };

  return (
    <section id="field" className="relative bg-ink py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionTag index="03" label="The Field" className="mb-12 md:mb-16" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-20">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-[10vw] md:text-[4.6vw] leading-[0.95] tracking-[-0.02em] text-bone uppercase">
              Footage from<br />
              <span className="font-edit italic font-light normal-case text-ember tracking-normal">impossible</span> places.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 flex flex-col justify-end" delay={0.15}>
            <p className="font-display font-light text-lg md:text-xl text-bone/65 leading-relaxed max-w-md">
              Vertical-native, story-first, and one beat past what a camera
              could ever catch. This is the format behind the billion views,
              playing exactly as the audience sees it.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Reel rail */}
      <div
        ref={railRef}
        className="tu-reel-rail flex gap-4 md:gap-5 overflow-x-auto snap-x snap-proximity px-6 md:px-12 pb-4 select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {reels.map((reel) => (
          <ReelCard key={reel.src} {...reel} />
        ))}

        {/* The rail ends in a door, not a fade */}
        <a
          href="https://instagram.com/troplanduniverse"
          target="_blank"
          rel="noopener noreferrer"
          className="tu-reel-card tu-ticks text-bone/50 flex-shrink-0 snap-start bg-ink-2 border border-bone/15 relative group flex flex-col items-center justify-center gap-6 px-8 text-center hover:border-ember transition-colors duration-500"
        >
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-bone/45">
            The feed never sleeps
          </span>
          <span className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-bone text-3xl md:text-4xl">
            Follow the<br />
            <span className="font-edit italic font-light normal-case text-ember tracking-normal">universe.</span>
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-bone/60 group-hover:text-ember transition-colors duration-300">
            @troplanduniverse
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </a>
        <span className="flex-shrink-0 w-2" aria-hidden="true" />
      </div>

      <div className="max-w-[1480px] mx-auto px-6 md:px-12 mt-8 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone/35">
          Drag to explore · Sound lives on the socials
        </span>
        <span className="hidden md:block font-mono text-[10px] tracking-[0.22em] uppercase text-bone/35">
          @troplanduniverse
        </span>
      </div>
    </section>
  );
};

export default FieldReels;
