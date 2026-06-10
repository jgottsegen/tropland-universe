import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import Scramble from './fx/Scramble';

/**
 * TU·02 — The Flight.
 * Pinned, scroll-scrubbed flythrough: reef → fire → sky → the artist's pen.
 * Scroll drives video.currentTime; mono telemetry mirrors the timecode.
 */
const FlightSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [timecode, setTimecode] = useState('00:00:00');
  const [phase, setPhase] = useState(0); // 0 reef, 1 fire, 2 landing

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Buffer the video only when the section approaches the viewport
  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = 'auto';
          video.load();
          observer.disconnect();
        }
      },
      { rootMargin: '120% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const t = Math.min(p, 0.999) * duration;
    // Throttle seeks to ~half-frame granularity to keep scrubbing smooth
    if (Math.abs(video.currentTime - t) > 0.02) {
      video.currentTime = t;
    }
    const total = Math.floor(t * 24);
    const s = Math.floor(t);
    const f = total % 24;
    setTimecode(
      `00:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(f).padStart(2, '0')}`
    );
    setPhase(p < 0.38 ? 0 : p < 0.8 ? 1 : 2);
  });

  const progressX = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const phases = [
    { tag: 'SEQ A · THE REEF', line: 'One unbroken shot through the kingdom.' },
    { tag: 'SEQ B · THE FIRE', line: 'Generated end to end. No cuts, no cameras.' },
    { tag: 'SEQ C · THE PEN', line: 'Every world leads back to the pen.' },
  ];

  return (
    <section id="flight" ref={containerRef} className="relative bg-ink" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Scrubbed footage */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/tu-flight.mp4"
          poster="/video/tu-flight-poster.jpg"
          preload="metadata"
          muted
          playsInline
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />

        {/* Cinematic grade */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/70 pointer-events-none" />

        {/* Top rail: section tag + timecode */}
        <div className="absolute top-0 left-0 right-0 pt-24 px-6 md:px-12 flex items-start justify-between pointer-events-none">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.22em] text-ember">TU·02</span>
            <Scramble className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/60">
              The Flight
            </Scramble>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1.5">
            <span className="font-mono text-[11px] tracking-[0.18em] text-white/70 tabular-nums">
              TC {timecode}
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
              Scroll to fly · 1 seamless take
            </span>
          </div>
        </div>

        {/* Phase readout — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 px-6 md:px-12 pointer-events-none">
          <div className="flex flex-col gap-4 max-w-4xl">
            <motion.span
              key={`tag-${phase}`}
              className="font-mono text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-ember"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {phases[phase].tag}
            </motion.span>
            <motion.p
              key={`line-${phase}`}
              className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-bone text-[8.5vw] md:text-[4.2vw]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {phase === 2 ? (
                <>Every world leads back to <span className="font-edit italic font-light normal-case text-ember tracking-normal">the pen.</span></>
              ) : (
                phases[phase].line
              )}
            </motion.p>

            {/* Progress hairline */}
            <div className="mt-4 h-px w-full bg-white/15 relative overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 bg-ember" style={{ width: progressX }} />
            </div>
            <div className="flex justify-between font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
              <span>Reef</span>
              <span>Fire</span>
              <span>Sky</span>
              <span>The pen</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightSequence;
