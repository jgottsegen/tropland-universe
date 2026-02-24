import React, { useEffect, useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';
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

      {/* Comet animation */}
      <CometBackground density={3} speed={0.8} />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/30 rounded-full blur-[300px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: Heading + Bio */}
          <div>
            <div className={fade(0)} style={{ transitionDelay: '0ms' }}>
              <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-4">
                About the Creator
              </p>
            </div>

            <h2 className={`font-serif text-4xl md:text-5xl lg:text-[4.5rem] tracking-tight text-brand-text leading-[1.05] mb-6 ${fade(1)}`} style={{ transitionDelay: '100ms' }}>
              Josh <span className="italic text-brand-accent">Gottsegen</span>
            </h2>

            <div className={`${fade(2)}`} style={{ transitionDelay: '200ms' }}>
              <p className="text-white/65 font-sans text-lg leading-relaxed">
                Josh Gottsegen is a creative entrepreneur and the founder of Tropland Universe,
                with over 25 years of experience in design, marketing, and production. His
                industry credits include campaigns for NBC Universal, Warner Bros, Disney,
                Sony Pictures, Ferrari, and the Vatican Museums. He developed Tropland as a
                publishing IP before expanding it into the global Digital Animal Kingdom.
              </p>
            </div>
          </div>

          {/* Right: Josh photo */}
          <div className={`${fade(3)} flex justify-center`} style={{ transitionDelay: '350ms' }}>
            <div className="relative group max-w-xs w-full">
              {/* Glow ring behind the image */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-accent/20 via-brand-purple/30 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative aspect-square rounded-3xl overflow-hidden glass border-white/10 hover:border-brand-accent/20 transition-all duration-500">
                <img
                  src="/images/josh-gottsegen.png"
                  alt="Josh Gottsegen - Founder of Tropland Universe"
                  className="w-full h-full object-cover"
                />

                {/* Decorative corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand-accent/30 rounded-tl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand-accent/30 rounded-br-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ventures;
