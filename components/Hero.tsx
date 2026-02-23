import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import CometBackground from './CometBackground';

const partners = [
  'Adobe', 'Meta', 'OpenAI', 'Topaz Labs', 'Kling AI',
  'All American Licensing',
];
const partnersTriple = [...partners, ...partners, ...partners];

function AnimatedCounter({ end, suffix, isVisible }: { end: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const step = end / 50;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [isVisible, end]);
  return <>{count.toLocaleString()}{suffix}</>;
}

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => { clearTimeout(timer); window.removeEventListener('resize', checkMobile); };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const fade = (delay: number) =>
    `transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end overflow-hidden">

      {/* Comet animation behind everything */}
      <CometBackground density={5} speed={1.2} />

      {/* Background Image: parallax on desktop, static on mobile */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] md:h-[120%] md:-top-[10%]"
        style={isMobile ? undefined : { transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src="/images/hero-lion.png"
          alt="Tropland Universe"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/60 to-brand-deep/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/70 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-8 pt-40">

        <div className={fade(0)} style={{ transitionDelay: '200ms' }}>
          <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-brand-accent mb-6">
            The Digital Animal Kingdom
          </p>
        </div>

        <h1 className={`mb-6 ${fade(1)}`} style={{ transitionDelay: '400ms' }}>
          <span
            className="block font-serif text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] leading-[0.9] tracking-tight text-white"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 4px 25px rgba(0,0,0,0.4)' }}
          >
            Tropland
          </span>
          <span
            className="block font-serif italic text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] leading-[0.9] tracking-tight text-brand-accent"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 4px 25px rgba(0,0,0,0.4)' }}
          >
            Universe.
          </span>
        </h1>

        <p className={`text-base md:text-lg text-white/70 font-sans font-light leading-relaxed max-w-xl mb-10 ${fade(2)}`} style={{ transitionDelay: '600ms', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
          Where nature meets imagination. A character-driven wildlife media brand<br className="hidden md:block" />
          blending cinematic AI art, original IP, and viral storytelling.
        </p>

        {/* Stats */}
        <div className={`flex gap-10 md:gap-16 mb-10 ${fade(3)}`} style={{ transitionDelay: '800ms' }}>
          {[
            { end: 1, suffix: 'B+', label: 'Content Views' },
            { end: 2.5, suffix: 'M+', label: 'Social Followers' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-5xl font-serif text-white leading-none drop-shadow-lg">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} isVisible={loaded} />
              </div>
              <div className="text-[10px] font-sans font-semibold text-white/40 uppercase tracking-[0.2em] mt-2">
                {stat.label}
              </div>
            </div>
          ))}
          <div>
            <div className="text-3xl md:text-5xl font-serif text-white leading-none drop-shadow-lg">
              50+
            </div>
            <div className="text-[10px] font-sans font-semibold text-white/40 uppercase tracking-[0.2em] mt-2">
              Countries Reached
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-16 ${fade(4)}`} style={{ transitionDelay: '1000ms' }}>
          <a
            href="#universe"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(232,93,58,0.4)]"
          >
            Explore the Universe
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-sans font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
          >
            Partner With Us
          </a>
        </div>
      </div>

      {/* Glassmorphism Partner Bar */}
      <div className="relative z-10 glass">
        <div className="overflow-hidden py-5">
          <div className="animate-marquee-slow flex items-center gap-10 md:gap-16 whitespace-nowrap w-max">
            {partnersTriple.map((partner, i) => (
              <span
                key={`${partner}-${i}`}
                className="text-sm md:text-base lg:text-lg font-sans font-bold text-white/25 tracking-tight cursor-default select-none uppercase"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
