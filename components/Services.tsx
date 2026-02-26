import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import CometBackground from './CometBackground';
import TextReveal from './TextReveal';

const books = [
  { src: '/images/rth.png', title: 'The Adventures of Rockford T. Honeypot', subtitle: 'Amazon #1 Bestseller', genre: 'Fantasy / Adventure', url: 'https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075', featured: true },
  { src: '/images/jjb-01.png', title: 'Snackbook Adventures', subtitle: "Joosh's Juice Bar", genre: "Children's / Wellness", url: 'https://www.amazon.com/Jooshs-Juice-Bar-Snackbook-Adventure/dp/1539538818/', featured: false },
  { src: '/images/jjb-02.png', title: 'The Tropland Tee-Off', subtitle: "Joosh's Juice Bar", genre: "Children's / Adventure", url: 'https://www.amazon.com/gp/product/1500736082', featured: false },
  { src: '/images/jjb-03.png', title: 'Banana Berry Adventures', subtitle: "Joosh's Juice Bar", genre: "Children's / Wellness", url: 'https://www.amazon.com/Jooshs-Juice-Bar-Banana-Adventure/dp/1493546848', featured: false },
];

const Services: React.FC = () => {
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
    <section id="books" ref={sectionRef} className="py-24 md:py-36 bg-brand-purple relative overflow-hidden">

      {/* Comet animation */}
      <CometBackground density={3} speed={0.7} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <div className={`mb-16 ${fade(0)}`} style={{ transitionDelay: '0ms' }}>
          <p className="text-[13px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent/80 mb-4">
            Published Works
          </p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-brand-text leading-[1.1]">
            <TextReveal delay={0.05} wordDelay={0.09}>Original books,</TextReveal>
            <br />
            <TextReveal className="italic text-brand-accent" delay={0.28} wordDelay={0.09}>original worlds.</TextReveal>
          </h2>
          <p className="text-[17px] text-white/65 font-sans mt-4 max-w-2xl leading-relaxed">
            Five published titles spanning adventure fiction and children's wellness,
            written, illustrated, and produced by Josh Gottsegen. The foundational story
            worlds behind Tropland Universe.
          </p>
        </div>

        {/* Featured: Rockford T. Honeypot */}
        <div className={`group glass border-shine rounded-3xl p-8 md:p-10 mb-8 hover:border-brand-accent/20 transition-all duration-500 ${fade(1)}`} style={{ transitionDelay: '100ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 book-cover">
              <div className="book-inner aspect-[3/4] rounded-2xl overflow-hidden max-w-xs mx-auto md:mx-0 relative">
                <img src="/images/rth.png" alt="The Adventures of Rockford T. Honeypot" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-[15px] font-sans font-semibold backdrop-blur-sm border border-brand-accent/20">
                  <Award size={14} />
                  Amazon #1 Bestseller
                </span>
                <span className="text-[13px] font-sans font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-white/15 text-white/65 backdrop-blur-sm bg-white/5">
                  Fantasy / Adventure
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-3 leading-tight">
                The Adventures of<br />Rockford T. <span className="italic text-brand-accent">Honeypot</span>
              </h3>
              <p className="text-white/60 font-sans text-[17px] leading-relaxed mb-6 max-w-lg">
                Originally published as a fantasy-adventure novel, Rockford T. Honeypot established
                one of the core story worlds within the Tropland canon. The property is currently being
                developed for expansion into animated and digital formats.
              </p>
              <a
                href="https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-white font-sans font-semibold text-[15px] hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,93,58,0.3)]"
              >
                View on Amazon
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Joosh's Juice Bar Series — full featured card */}
        <div className={`group glass border-shine rounded-3xl p-8 md:p-10 hover:border-brand-accent/20 transition-all duration-500 ${fade(2)}`} style={{ transitionDelay: '200ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: three book covers */}
            <div className="flex items-center justify-center py-10 min-h-[30rem] overflow-hidden">
              {books.filter(b => !b.featured).map((book, i) => {
                const isCenter = i === 1;
                return (
                  <div
                    key={book.src}
                    className="book-cover flex-shrink-0 relative hover:z-50 group/book cursor-pointer"
                    style={{
                      width: '58%',
                      marginLeft: i === 0 ? '0' : '-28%',
                      zIndex: isCenter ? 10 : 5 - i,
                      transform: `rotate(${(i - 1) * 9}deg) translateY(${Math.abs(i - 1) * 16}px)`,
                      transition: 'z-index 0s, margin 0.5s ease',
                    }}
                  >
                    <div
                      className="book-inner rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative border border-white/10 transition-all duration-500 group-hover/book:-translate-y-6 group-hover/book:scale-110 group-hover/book:shadow-[0_40px_60px_rgba(232,93,58,0.3)]"
                      style={{ aspectRatio: '3/4', transformOrigin: 'center bottom' }}
                    >
                      <img src={book.src} alt={book.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/5 to-transparent pointer-events-none opacity-0 group-hover/book:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: text */}
            <div className="md:pl-4">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-[15px] font-sans font-semibold backdrop-blur-sm border border-brand-accent/20">
                  Book Trilogy
                </span>
                <span className="text-[13px] font-sans font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-white/15 text-white/65 backdrop-blur-sm bg-white/5">
                  Children's / Wellness
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-3 leading-tight">
                Joosh's <span className="italic text-brand-accent">Juice Bar</span>
              </h3>
              <p className="text-white/60 font-sans text-[17px] leading-relaxed mb-6 max-w-lg">
                A trilogy of children's books teaching healthy eating through colorful storytelling. Joosh and his friends explore a world of vibrant flavors, wholesome ingredients, and imagination — instilling lifelong wellness habits in young readers through joyful adventure.
              </p>
              <a
                href="https://www.amazon.com/Jooshs-Juice-Bar-Snackbook-Adventure/dp/1539538818/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-white font-sans font-semibold text-[15px] hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,93,58,0.3)]"
              >
                View on Amazon
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
