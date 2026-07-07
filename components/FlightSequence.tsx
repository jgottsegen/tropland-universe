import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';

/**
 * TU·02 — The Flight.
 * Full-screen autoplaying flythrough: reef → fire → sky → the artist's pen.
 * Plays once when it enters the viewport, holds on the final frame.
 */
const FlightSequence: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState(0); // 0 reef, 1 flight, 2 the pen
  const [timecode, setTimecode] = useState('00:00:00');
  const [progress, setProgress] = useState(0);
  const [ended, setEnded] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) {
          video.preload = 'auto';
          if (!reducedMotion && !ended) {
            if (!startedRef.current) startedRef.current = true;
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.35] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ended]);

  const handleTime = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const p = video.currentTime / video.duration;
    setProgress(p);
    setPhase(p < 0.4 ? 0 : p < 0.86 ? 1 : 2);
    const s = Math.floor(video.currentTime);
    const f = Math.floor(video.currentTime * 24) % 24;
    setTimecode(
      `00:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(f).padStart(2, '0')}`
    );
  };

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    setEnded(false);
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const lines = [
    'One unbroken shot through the kingdom.',
    'Generated end to end. No cuts, no cameras.',
  ];

  return (
    <section id="flight" ref={sectionRef} className="relative h-screen bg-ink overflow-hidden">

      {/* Footage */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/tu-flight.mp4"
        poster="/video/tu-flight-poster.jpg"
        preload="metadata"
        muted
        playsInline
        onTimeUpdate={handleTime}
        onEnded={() => setEnded(true)}
      />

      {/* Cinematic grade */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/60 pointer-events-none" />

      {/* Top rail */}
      <div className="absolute top-0 left-0 right-0 pt-24 px-6 md:px-12 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-ember">The Flight</span>
        </div>
        <span className="hidden md:block font-mono text-[11px] tracking-[0.18em] text-white/60 tabular-nums">
          TC {timecode}
        </span>
      </div>

      {/* Bottom: caption + progress */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 px-6 md:px-12">
        <div className="flex flex-col gap-5 max-w-4xl">

          <AnimatePresence mode="wait">
            <motion.p
              key={phase === 2 || ended ? 'pen' : `line-${phase}`}
              className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-bone text-[8.5vw] md:text-[4.2vw]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {phase === 2 || ended ? (
                <>Every world leads back to <span className="font-edit italic font-light normal-case text-ember tracking-normal">the pen.</span></>
              ) : (
                lines[phase]
              )}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-5">
            {/* Playback hairline */}
            <div className="h-px flex-1 bg-white/15 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-ember" style={{ width: `${progress * 100}%` }} />
            </div>
            <button
              onClick={replay}
              className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-500 ${ended ? 'text-bone hover:text-ember opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-label="Replay the flight"
            >
              <RotateCcw size={11} />
              Replay
            </button>
          </div>

          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
            One seamless generated take · Reef to the artist's table
          </span>
        </div>
      </div>
    </section>
  );
};

export default FlightSequence;
