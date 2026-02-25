import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CometBackground from './CometBackground';

const Ventures: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fade = (delay: number) =>
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-36 bg-brand-deep relative overflow-hidden">

      <CometBackground density={2} speed={0.7} />

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/25 rounded-full blur-[300px] pointer-events-none"></div>

      {/* Ghost letterform backdrop */}
      <div className="absolute right-0 top-0 font-serif select-none pointer-events-none leading-[0.8] overflow-hidden"
        style={{ fontSize: 'min(38vw, 480px)', color: 'rgba(255,255,255,0.015)' }}>
        JG
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">

          {/* Left: Bio + stats */}
          <div className={`lg:col-span-5 lg:pt-6 ${fade(0)}`} style={{ transitionDelay: '0ms' }}>
            <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-6">
              The Visionary
            </p>
            <h2 className="font-serif tracking-tight leading-[0.9] text-white mb-9"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)' }}>
              Josh<br />
              <span className="italic text-brand-accent">Gottsegen</span>
            </h2>

            <div className="space-y-5 text-white/55 font-sans text-base leading-relaxed mb-10">
              <p>
                Twenty-five years across design, film production, and entertainment. Credits with Universal Studios, Disney, Fox, IMG, the NFL, IndyCar, Ferrari, and the Vatican Museums.
              </p>
              <p>
                He built Tropland from a picture book to a billion-view global IP, not by following a playbook, but by refusing to write in anyone else's world.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 pt-8 border-t border-white/[0.07] mb-10">
              {[
                { num: '25+', label: 'Years in\nentertainment' },
                { num: '1B+', label: 'Content\nviews' },
                { num: '#1', label: 'AI Art Influencer\n2025 & 2026' },
              ].map(({ num, label }) => (
                <div key={num}>
                  <p className="font-serif text-white leading-none mb-2"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
                    {num}
                  </p>
                  <p className="text-white/30 font-sans text-[10px] leading-snug tracking-wide whitespace-pre-line">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
              className="group inline-flex items-center gap-2 text-sm font-sans font-semibold text-white/50 hover:text-white transition-colors duration-200"
            >
              Full Story
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: Portrait with floating chips */}
          <div className={`lg:col-span-7 ${fade(0)}`} style={{ transitionDelay: '160ms' }}>
            <div className="relative">

              {/* Warm glow behind portrait */}
              <div className="absolute rounded-3xl pointer-events-none"
                style={{
                  inset: '-10%',
                  background: 'radial-gradient(ellipse at 55% 35%, rgba(232,93,58,0.2) 0%, rgba(212,133,26,0.08) 35%, transparent 65%)',
                  filter: 'blur(48px)',
                }} />

              {/* Portrait */}
              <div className="group relative rounded-2xl overflow-hidden border border-white/[0.07]"
                style={{ aspectRatio: '4/5' }}>
                <img
                  src="/images/josh-gottsegen.png"
                  alt="Josh Gottsegen, Founder of Tropland Universe"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                {/* Bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #0D0A1A 0%, rgba(13,10,26,0.6) 50%, transparent 100%)' }} />
                {/* Hover warm wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(232,93,58,0.1) 0%, transparent 55%)' }} />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 p-5 md:p-7">
                  <p className="font-sans text-white/40 text-xs tracking-[0.15em] uppercase">
                    Founder, Tropland Universe
                  </p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ventures;
