import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Award, Globe, ImageIcon, Zap } from 'lucide-react';

const metrics = [
  { end: 5, suffix: '', label: 'Published Books', icon: Award },
  { end: 265, suffix: 'M', label: 'Single Viral Piece', icon: Zap },
  { end: 50, suffix: 'K+', label: 'Original Artworks', icon: ImageIcon },
  { end: 12, suffix: '+', label: 'Years of Storytelling', icon: Globe },
];

const galleryRow1 = [
  'https://troplanduniverse.com/wp-content/uploads/2025/01/home003.jpg',
  'https://troplanduniverse.com/wp-content/uploads/2025/10/lion-peace-1.png',
  'https://troplanduniverse.com/wp-content/uploads/2025/01/home1.png',
  'https://troplanduniverse.com/wp-content/uploads/2025/01/IMG_2051.jpg',
  'https://troplanduniverse.com/wp-content/uploads/2025/01/home004.jpg',
  'https://troplanduniverse.com/wp-content/uploads/2025/10/jag-shaka-1.png',
];

const galleryRow2 = [
  'https://troplanduniverse.com/wp-content/uploads/2025/10/gorilla-thumb.png',
  'https://troplanduniverse.com/wp-content/uploads/2025/01/lion-love-2.png',
  'https://troplanduniverse.com/wp-content/uploads/2025/01/11home005.jpg',
  'https://troplanduniverse.com/wp-content/uploads/2025/01/home2.png',
  'https://troplanduniverse.com/wp-content/uploads/2025/01/11home001.jpg',
  'https://troplanduniverse.com/wp-content/uploads/2025/01/home010-2.png',
];

function AnimatedMetric({ end, suffix, isVisible }: { end: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const step = end / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isVisible, end]);
  return <>{count.toLocaleString()}{suffix}</>;
}

const Portfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fade = (delay: number) =>
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section id="universe" ref={sectionRef} className="relative bg-brand-cream py-24 md:py-36">

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className={fade(0)} style={{ transitionDelay: '0ms' }}>
          <p className="text-[13px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-4">
            The Collection
          </p>
        </div>

        <h2 className={`font-serif text-5xl sm:text-6xl md:text-[6rem] lg:text-[8rem] leading-[0.9] tracking-tight text-brand-dark-text mb-4 ${fade(1)}`} style={{ transitionDelay: '100ms' }}>
          The Digital Animal <span className="italic text-brand-purple">Kingdom.</span>
        </h2>

        <div className={`flex flex-wrap items-center gap-3 mb-12 ${fade(1)}`} style={{ transitionDelay: '150ms' }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-[15px] font-sans font-semibold">
            <Award size={14} />
            #1 AI Artist Influencer, Feedspot 2025 & 2026
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 text-brand-purple text-[15px] font-sans font-semibold">
            Represented by All American Licensing
          </span>
        </div>

        {/* Description + Metrics */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16 ${fade(2)}`} style={{ transitionDelay: '200ms' }}>
          <div className="lg:col-span-3">
            <p className="text-xl md:text-2xl text-brand-muted-light font-sans font-light leading-relaxed mb-5">
              A leading wildlife media brand of the digital era. What started as a publishing IP
              has grown into a global digital animal kingdom, connecting imagination and
              nature through books, cinematic AI art, and licensing-ready IP.
            </p>
            <p className="text-[17px] text-brand-muted font-sans leading-relaxed mb-8">
              Every image and video is crafted for emotional impact and global brand scalability.
              Photorealistic wildlife content viewed over a billion times across 50+ countries.
              Trusted by Adobe, Meta, OpenAI, Topaz Labs, and Kling AI.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://facebook.com/troplanduniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-border-light text-brand-dark-text font-sans font-semibold text-sm hover:bg-brand-cream-dark transition-all duration-300"
              >
                Facebook
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://youtube.com/@troplanduniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-border-light text-brand-dark-text font-sans font-semibold text-sm hover:bg-brand-cream-dark transition-all duration-300"
              >
                YouTube
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-0 border border-brand-border-light rounded-2xl overflow-hidden bg-white">
              {metrics.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className={`p-5 md:p-6 ${i < 2 ? 'border-b border-brand-border-light' : ''} ${i % 2 === 0 ? 'border-r border-brand-border-light' : ''}`}
                  >
                    <Icon size={14} className="text-brand-accent mb-2" />
                    <div className="text-3xl md:text-4xl font-serif text-brand-dark-text leading-none mb-1">
                      <AnimatedMetric end={m.end} suffix={m.suffix} isVisible={isVisible} />
                    </div>
                    <div className="text-[13px] font-sans font-semibold text-brand-muted uppercase tracking-[0.15em]">
                      {m.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling gallery row 1 */}
      <div className="overflow-hidden mb-3">
        <div className="animate-marquee flex gap-3 w-max">
          {[...galleryRow1, ...galleryRow1].map((src, i) => (
            <div key={i} className="w-64 md:w-80 h-64 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden">
              <img src={src} alt="Tropland content" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling gallery row 2 (reverse) */}
      <div className="overflow-hidden mb-8">
        <div className="animate-marquee-reverse flex gap-3 w-max">
          {[...galleryRow2, ...galleryRow2].map((src, i) => (
            <div key={i} className="w-64 md:w-80 h-64 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden">
              <img src={src} alt="Tropland content" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
