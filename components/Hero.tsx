import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Odometer from './fx/Odometer';

const partners = [
  'Adobe', 'Meta', 'OpenAI', 'Topaz Labs', 'Kling AI', 'SORA',
  'All-American Licensing',
];
const partnersTriple = [...partners, ...partners, ...partners];

// One number owns the entrance; the rest live in the section-01 ledger.

const ease = [0.16, 1, 0.3, 1] as const;

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-ink">

      {/* Background image with slow parallax — the lion peace is the brand mark */}
      <div
        className="absolute inset-0 w-full h-[118%] -top-[9%]"
        style={isMobile ? undefined : { transform: `translateY(${scrollY * 0.28}px)` }}
      >
        <motion.img
          src="/images/hero-lion.png"
          alt="Tropland Universe lion"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.08, filter: 'brightness(0.7)' }}
          animate={{ scale: 1, filter: 'brightness(1)' }}
          transition={{ duration: 2.2, ease }}
        />
      </div>

      {/* Cinematic grades */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-transparent to-transparent" />


      {/* Content */}
      <div className="relative z-10 max-w-[1480px] mx-auto px-6 md:px-12 w-full pb-6 pt-36 md:pt-44">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease }}
        >
          <span className="font-mono text-[11px] md:text-xs tracking-[0.32em] uppercase text-ember">
            The Digital Animal Kingdom
          </span>
        </motion.div>

        {/* Display headline */}
        <h1 className="mb-7 select-none">
          <span className="block overflow-hidden">
            <motion.span
              className="block font-display font-extrabold uppercase text-white tracking-[-0.025em] leading-[0.86] text-[17.5vw] md:text-[11.5vw] lg:text-[10vw]"
              initial={{ y: '108%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35, duration: 1.1, ease }}
            >
              Tropland
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block leading-[0.92] text-[15vw] md:text-[10vw] lg:text-[8.6vw]"
              initial={{ y: '108%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1.1, ease }}
            >
              <span className="font-edit italic font-light text-ember" style={{ letterSpacing: '-0.01em' }}>
                Universe
              </span>
              <span className="font-display font-extrabold text-white">.</span>
            </motion.span>
          </span>
        </h1>

        {/* Subline + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <motion.p
            className="lg:col-span-6 text-lg md:text-2xl text-white/80 font-display font-light leading-snug max-w-2xl"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.45)' }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease }}
          >
            Cinema-grade wildlife storytelling, built at the frontier of AI.
            One original universe, <span className="font-edit italic text-white">1.3 billion views</span> and counting.
          </motion.p>

          <motion.div
            className="lg:col-span-6 flex flex-col sm:flex-row lg:justify-end gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 1, ease }}
          >
            <MagneticButton>
              <a
                href="#universe"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ember text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-300"
              >
                Enter the Universe
                <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#field"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/25 text-white font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:border-ember hover:text-ember transition-colors duration-300 backdrop-blur-sm"
              >
                Watch the Reels
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Data strip — one number, full confidence */}
        <motion.div
          className="flex items-end justify-between gap-6 border-t border-white/15 py-5 md:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 1 }}
        >
          <div>
            <div className="font-display font-extrabold text-4xl md:text-[3.4rem] text-white leading-none tracking-tight">
              <Odometer value="1.3B+" />
            </div>
            <div className="font-mono text-[10px] md:text-[11px] text-white/50 uppercase tracking-[0.22em] mt-2.5">
              Content Views · And Counting
            </div>
          </div>
          <span className="hidden md:block font-mono text-[10px] tracking-[0.22em] uppercase text-white/35 pb-1">
            One original universe
          </span>
        </motion.div>
      </div>

      {/* Partner marquee */}
      <motion.div
        className="relative z-10 border-t border-white/10 bg-ink/55 backdrop-blur-xl tu-marquee-pause"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35, duration: 1 }}
      >
        <div className="overflow-hidden py-4">
          <div className="animate-marquee-slow flex items-center whitespace-nowrap w-max">
            {partnersTriple.map((partner, i) => (
              <span key={`${partner}-${i}`} className="flex items-center">
                <span className="font-mono text-[12px] md:text-[13px] uppercase tracking-[0.28em] text-white/55 hover:text-ember transition-colors duration-300 cursor-default select-none">
                  {partner}
                </span>
                <span className="mx-8 md:mx-12 text-ember/60 text-[10px] font-mono">/</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
