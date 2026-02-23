import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';

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
    <section id="ventures" ref={sectionRef} className="py-24 md:py-32 bg-brand-deep relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/30 rounded-full blur-[300px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <div className={fade(0)} style={{ transitionDelay: '0ms' }}>
          <span className="inline-flex items-center gap-3 text-xs font-sans font-semibold tracking-[0.25em] uppercase text-brand-accent mb-4 block">
            <span className="w-10 h-[2px] bg-brand-accent"></span>
            OneLight Ventures
          </span>
        </div>

        <h2 className={`font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-brand-text leading-[1.1] mb-4 ${fade(1)}`} style={{ transitionDelay: '100ms' }}>
          Building at the <span className="italic text-brand-accent">edge of AI.</span>
        </h2>
        <p className={`text-base text-white/50 font-sans font-light leading-relaxed max-w-2xl mb-14 ${fade(1)}`} style={{ transitionDelay: '150ms' }}>
          OneLight Ventures incubates AI-native products and platforms.
          Launched from two decades of production experience and a front-row seat
          to how artificial intelligence is reshaping creative industries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* MerchDNA Card */}
          <div className={`group glass rounded-3xl p-8 md:p-10 hover:border-brand-accent/20 transition-all duration-500 ${fade(2)}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-white mb-1">MerchDNA</h3>
                <span className="text-xs font-sans font-semibold text-brand-accent uppercase tracking-wider">AI Platform</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <p className="text-white/50 font-sans text-sm leading-relaxed mb-6">
              AI-powered merchandise mockup and visualization platform built for
              the licensing industry. Turning IP into product-ready visuals at scale.
            </p>
            <div className="flex flex-wrap gap-2">
              {['AI/ML', 'SaaS', 'Licensing Tech', 'Product Viz'].map(tag => (
                <span key={tag} className="text-[10px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 text-white/40">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stealth Card */}
          <div className={`group glass rounded-3xl p-8 md:p-10 hover:border-white/10 transition-all duration-500 ${fade(3)}`} style={{ transitionDelay: '300ms' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-white/20 mb-1">In Development</h3>
                <span className="text-xs font-sans font-semibold text-white/20 uppercase tracking-wider">Stealth</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/10">
                <Lock size={16} />
              </div>
            </div>
            <p className="text-white/20 font-sans text-sm leading-relaxed mb-6">
              Multiple AI-native products in active development. Focused on creative
              tools, content infrastructure, and the intersection of IP and technology.
            </p>
            <div className="flex flex-wrap gap-2">
              {['AI Tools', 'Creative Infrastructure', 'NDA'].map(tag => (
                <span key={tag} className="text-[10px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/5 text-white/15">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Ventures;
