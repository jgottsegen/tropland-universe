import React, { useEffect, useRef, useState } from 'react';

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
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-brand-deep relative overflow-hidden">

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">

        <h2 className={`font-serif text-4xl md:text-6xl tracking-tight text-brand-text leading-[1.1] mb-8 ${fade(0)}`} style={{ transitionDelay: '0ms' }}>
          Josh <span className="italic text-brand-muted">Gottsegen</span>
        </h2>

        <div className={`max-w-3xl ${fade(1)}`} style={{ transitionDelay: '100ms' }}>
          <p className="text-base md:text-lg text-white/60 font-sans font-light leading-relaxed">
            Josh Gottsegen is a creative director, published author, and producer with over 25 years
            in design, production, and brand strategy. His client work spans Universal Studios, Disney,
            Warner Bros, Sony Pictures, the NFL, Ferrari, IMG Worldwide, and the Vatican Museums. He
            served as VP of Production at Cinsay, Inc., where he led a creative and marketing team of
            150+. In 2013 he created Tropland Universe, now a billion-view wildlife media property
            represented by All American Licensing. He founded OneLight Studios in 2016.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
