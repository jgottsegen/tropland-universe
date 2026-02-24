import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import CometBackground from './CometBackground';

const books = [
  { src: '/images/book-rockford.jpg', title: 'The Adventures of Rockford T. Honeypot', subtitle: 'Amazon #1 Bestseller', genre: 'Fantasy / Adventure', url: 'https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075', featured: true },
  { src: '/images/book-snackbook.jpg', title: 'Snackbook Adventures', subtitle: "Joosh's Juice Bar", genre: "Children's / Wellness", url: 'https://www.amazon.com/Jooshs-Juice-Bar-Snackbook-Adventure/dp/1539538818/', featured: false },
  { src: '/images/book-teeoff.jpg', title: 'The Tropland Tee-Off', subtitle: "Joosh's Juice Bar", genre: "Children's / Adventure", url: 'https://www.amazon.com/gp/product/1500736082', featured: false },
  { src: '/images/book-banana.jpg', title: 'Banana Berry Adventures', subtitle: "Joosh's Juice Bar", genre: "Children's / Wellness", url: 'https://www.amazon.com/Jooshs-Juice-Bar-Banana-Adventure/dp/1493546848', featured: false },
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
          <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent/70 mb-4">
            Published Works
          </p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-brand-text leading-[1.1]">
            Original books,<br />
            <span className="italic text-brand-accent">original worlds.</span>
          </h2>
          <p className="text-base text-white/50 font-sans mt-4 max-w-2xl leading-relaxed">
            Four published titles spanning adventure fiction and children's wellness,
            written, illustrated, and produced by Josh Gottsegen. The foundational story
            worlds behind Tropland Universe.
          </p>
        </div>

        {/* Featured: Rockford T. Honeypot */}
        <div className={`group glass border-shine rounded-3xl p-8 md:p-10 mb-8 hover:border-brand-accent/20 transition-all duration-500 ${fade(1)}`} style={{ transitionDelay: '100ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 book-cover">
              <div className="book-inner aspect-[3/4] rounded-2xl overflow-hidden max-w-xs mx-auto md:mx-0 relative">
                <img src="/images/book-rockford.jpg" alt="The Adventures of Rockford T. Honeypot" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-sans font-semibold backdrop-blur-sm border border-brand-accent/20">
                  <Award size={14} />
                  Amazon #1 Bestseller
                </span>
                <span className="text-xs font-sans font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-white/10 text-white/50 backdrop-blur-sm bg-white/5">
                  Fantasy / Adventure
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-3 leading-tight">
                The Adventures of<br />Rockford T. <span className="italic text-brand-accent">Honeypot</span>
              </h3>
              <p className="text-white/60 font-sans text-base leading-relaxed mb-6 max-w-lg">
                Originally published as a fantasy-adventure novel, Rockford T. Honeypot established
                one of the core story worlds within the Tropland canon. The property is currently being
                developed for expansion into animated and digital formats.
              </p>
              <a
                href="https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,93,58,0.3)]"
              >
                View on Amazon
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Joosh's Juice Bar Series */}
        <div className={`flex items-center justify-between mb-6 ${fade(2)}`} style={{ transitionDelay: '200ms' }}>
          <span className="text-sm font-sans font-bold text-brand-accent uppercase tracking-[0.2em]">
            Joosh's Juice Bar Series
          </span>
          <a href="https://www.amazon.com/Jooshs-Juice-Bar-Snackbook-Adventure/dp/1539538818/"
            target="_blank" rel="noopener noreferrer"
            className="text-xs font-sans text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
            View All <ArrowUpRight size={11} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.filter(b => !b.featured).map((book, i) => (
            <a
              key={book.title}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group glass border-shine rounded-2xl p-6 hover:border-brand-accent/20 transition-all duration-500 ${fade(i + 3)}`}
              style={{ transitionDelay: `${(i + 3) * 100}ms` }}
            >
              <div className="book-cover mb-4">
                <div className="book-inner aspect-[3/4] rounded-xl overflow-hidden bg-white/5 relative">
                  <img src={book.src} alt={book.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <h4 className="font-sans text-base font-bold text-white group-hover:text-brand-accent transition-colors leading-tight mb-1">
                {book.title}
              </h4>
              <p className="text-sm text-white/40 font-sans">{book.genre}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
