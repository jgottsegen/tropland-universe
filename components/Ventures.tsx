import React from 'react';
import SectionTag from './fx/SectionTag';
import Reveal from './fx/Reveal';

const Ventures: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-36 bg-ink-2 relative overflow-hidden">

      {/* Ghost monogram */}
      <div
        className="absolute -right-10 -top-10 font-display font-extrabold select-none pointer-events-none leading-[0.8]"
        style={{ fontSize: 'min(36vw, 460px)', color: 'rgba(242,238,229,0.022)' }}
        aria-hidden="true"
      >
        JG
      </div>

      <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

        <Reveal>
          <SectionTag label="The Founder" className="mb-12 md:mb-16" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Bio */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.9] text-bone mb-10 text-[12vw] md:text-[5.4vw]">
                Josh<br />
                <span className="font-edit italic font-light normal-case text-ember tracking-normal">Gottsegen</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5 text-bone/60 font-display font-light text-[17px] md:text-lg leading-relaxed mb-12 max-w-2xl">
                <p>
                  Founder of Tropland Universe and the creative force behind OneLight Studios.
                </p>
                <p>
                  Twenty-five years across design, film production, and entertainment,
                  with collaborations spanning Universal Studios, Disney, Fox, IMG, the NFL,
                  IndyCar, Ferrari, and the Vatican Museums.
                </p>
                <p>
                  He built Tropland from a children's picture book into a 2-billion-view global
                  IP by treating artificial intelligence as a creative instrument, not a
                  gimmick, and by building original worlds instead of borrowing existing ones.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <blockquote className="border-t border-bone/10 pt-8 max-w-2xl">
                <p className="font-edit italic font-light text-2xl md:text-[2rem] text-bone leading-snug">
                  “AI is my creative medium.”
                </p>
                <cite className="not-italic block mt-4 font-mono text-[10px] tracking-[0.22em] uppercase text-bone/45">
                  Josh Gottsegen · 25 years in entertainment
                </cite>
              </blockquote>
            </Reveal>
          </div>

          {/* Portrait */}
          <Reveal className="lg:col-span-5" delay={0.2}>
            <div className="relative max-w-[380px] mx-auto lg:ml-auto lg:mr-0">
              <div
                className="tu-frame tu-ticks text-bone/60 relative overflow-hidden border border-bone/10"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src="/images/josh-lion.jpg"
                  alt="Josh Gottsegen, founder of Tropland Universe"
                  className="w-full h-full object-cover object-center"
                />
                <div className="tu-frame-meta bg-ink/85 backdrop-blur-md px-4 py-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-bone/70">FOUNDER · CREATIVE DIRECTOR</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ember">LA · CA</span>
                </div>
              </div>
              {/* Caption rail */}
              <div className="flex items-center justify-between mt-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-bone/35 uppercase">The operator</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-bone/35">EST. 2013</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Ventures;
