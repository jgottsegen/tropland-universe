import React, { useEffect, useRef, useState } from 'react';
import { Handshake, ShieldCheck, Globe, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
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
    <section id="licensing" ref={sectionRef} className="py-24 md:py-36 bg-brand-cream relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <div className={fade(0)} style={{ transitionDelay: '0ms' }}>
          <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-4">
            Partnerships & Licensing
          </p>
        </div>

        <h2 className={`font-serif text-4xl md:text-6xl tracking-tight text-brand-dark-text leading-[1.1] mb-4 ${fade(0)}`} style={{ transitionDelay: '50ms' }}>
          Built for <span className="italic text-brand-purple">partnership.</span>
        </h2>

        <p className={`text-base md:text-lg text-brand-muted-light font-sans font-light leading-relaxed max-w-2xl mb-12 ${fade(1)}`} style={{ transitionDelay: '100ms' }}>
          Tropland Universe partners with select brands, studios, and organizations on
          co-branded content, campaigns, and licensing. A proven viral IP with massive
          cross-platform reach, seamlessly translatable across physical and digital categories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Handshake,
              title: 'Brand Partnerships',
              description: 'Content collaborations with leading tech, entertainment, and consumer brands. Adobe, Meta, OpenAI, and more.',
            },
            {
              icon: ShieldCheck,
              title: 'Licensing',
              description: 'Represented by All American Licensing. Character IP ready for apparel, lifestyle, home décor, and media.',
            },
            {
              icon: Globe,
              title: 'Global Distribution',
              description: 'Billion+ cumulative views across 50+ countries. Proven audience engagement across all key global markets.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group relative p-8 rounded-2xl bg-white border border-brand-border-light border-shine-light hover:border-brand-accent/30 hover:shadow-[0_8px_30px_rgba(232,93,58,0.08)] hover:-translate-y-1 transition-all duration-500 ${fade(i + 2)}`}
                style={{ transitionDelay: `${(i + 2) * 100}ms` }}
              >
                {/* Hover glow overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={22} className="text-brand-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-brand-dark-text mb-3">
                    {item.title}
                  </h3>
                  <p className="text-brand-dark-text/55 font-sans text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`text-center ${fade(5)}`} style={{ transitionDelay: '500ms' }}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-purple text-white font-sans font-semibold text-sm hover:bg-brand-purple-mid transition-all duration-300 hover:shadow-lg"
          >
            Get in Touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
