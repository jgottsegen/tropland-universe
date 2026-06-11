import React from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import SectionTag from './fx/SectionTag';
import Reveal from './fx/Reveal';

const jjbBooks = [
  { src: '/images/jjb-01.png', title: 'Snackbook Adventures' },
  { src: '/images/jjb-02.png', title: 'The Tropland Tee-Off' },
  { src: '/images/jjb-03.png', title: 'Banana Berry Adventures' },
];

const Services: React.FC = () => {
  return (
    <section id="books" className="py-24 md:py-36 bg-bone relative overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

        <Reveal>
          <SectionTag index="05" label="The Worlds" dark={false} className="mb-12 md:mb-16" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-[10vw] md:text-[4.6vw] leading-[0.95] tracking-[-0.02em] text-ink uppercase">
              Original books,<br />
              <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">original</span> worlds.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 flex flex-col justify-end" delay={0.15}>
            <p className="font-display font-light text-lg md:text-xl text-ink/60 leading-relaxed max-w-md">
              Five published titles spanning adventure fiction and children's
              wellness — written and produced by Josh Gottsegen. These are the
              foundational story worlds behind Tropland Universe.
            </p>
          </Reveal>
        </div>

        {/* Featured: Rockford */}
        <Reveal>
          <div className="group border border-ink/15 bg-bone-dark/40 hover:bg-bone-dark/70 transition-colors duration-700 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center p-8 md:p-12">
              <div className="md:col-span-2 book-cover">
                <div className="book-inner aspect-[3/4] overflow-hidden max-w-xs mx-auto md:mx-0 relative">
                  <img src="/images/rth.png" alt="The Adventures of Rockford T. Honeypot" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-ink text-bone font-mono text-[10px] uppercase tracking-[0.18em]">
                    <Award size={11} className="text-ember" />
                    Amazon #1 Bestseller
                  </span>
                  <span className="px-3.5 py-1.5 border border-ink/20 text-ink/60 font-mono text-[10px] uppercase tracking-[0.18em]">
                    Fantasy / Adventure
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-3xl md:text-[2.6rem] text-ink mb-4 leading-[1.02] tracking-tight">
                  The Adventures of<br />Rockford T. <span className="font-edit italic font-light text-ember-deep">Honeypot</span>
                </h3>
                <p className="text-ink/60 font-display font-light text-[17px] leading-relaxed mb-8 max-w-lg">
                  The fantasy-adventure novel that established the first core story world of
                  the Tropland ecosystem — now in development for animated and digital formats.
                </p>
                <a
                  href="https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-3 px-7 py-3.5 bg-ink text-bone font-display font-bold text-[14px] uppercase tracking-[0.08em] hover:bg-ember-deep transition-colors duration-300"
                >
                  View on Amazon
                  <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Joosh's Juice Bar trilogy */}
        <Reveal delay={0.1}>
          <div className="group border border-ink/15 bg-bone-dark/40 hover:bg-bone-dark/70 transition-colors duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 md:p-12">

              {/* Fanned covers */}
              <div className="flex items-center justify-center py-8 min-h-[24rem] md:min-h-[28rem]">
                {jjbBooks.map((book, i) => {
                  const isCenter = i === 1;
                  return (
                    <div
                      key={book.src}
                      className="flex-shrink-0 relative transition-transform duration-700 group-hover:scale-[1.02]"
                      style={{
                        width: '56%',
                        marginLeft: i === 0 ? '0' : '-27%',
                        zIndex: isCenter ? 10 : 5 - i,
                        transform: `rotate(${(i - 1) * 8}deg) translateY(${Math.abs(i - 1) * 14}px)`,
                      }}
                    >
                      <div
                        className="overflow-hidden shadow-[0_24px_48px_rgba(12,11,9,0.35)] relative border border-ink/10"
                        style={{ aspectRatio: '3/4' }}
                      >
                        <img src={book.src} alt={book.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="md:pl-4">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3.5 py-1.5 bg-ink text-bone font-mono text-[10px] uppercase tracking-[0.18em]">
                    Book Trilogy
                  </span>
                  <span className="px-3.5 py-1.5 border border-ink/20 text-ink/60 font-mono text-[10px] uppercase tracking-[0.18em]">
                    Children's / Wellness
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-3xl md:text-[2.6rem] text-ink mb-4 leading-[1.02] tracking-tight">
                  Joosh's <span className="font-edit italic font-light text-ember-deep">Juice Bar</span>
                </h3>
                <p className="text-ink/60 font-display font-light text-[17px] leading-relaxed mb-8 max-w-lg">
                  A trilogy teaching healthy eating through colorful storytelling. Joosh
                  and his friends explore vibrant flavors and wholesome ingredients,
                  turning lifelong wellness habits into joyful adventure.
                </p>
                <a
                  href="https://www.amazon.com/Jooshs-Juice-Bar-Snackbook-Adventure/dp/1539538818/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-3 px-7 py-3.5 bg-ink text-bone font-display font-bold text-[14px] uppercase tracking-[0.08em] hover:bg-ember-deep transition-colors duration-300"
                >
                  View on Amazon
                  <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
