import React from 'react';
import SectionTag from './fx/SectionTag';
import Odometer from './fx/Odometer';
import Reveal from './fx/Reveal';

const founderStats = [
  { value: '25+', label: 'Years in entertainment' },
  { value: '1.3B+', label: 'Content views' },
  { value: '#1', label: 'AI Artist · Feedspot 2025 + 2026' },
];

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
          <SectionTag index="03" label="The Founder" className="mb-12 md:mb-16" />
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
                  He built Tropland from a children's picture book into a billion-view global
                  IP by treating artificial intelligence as a creative instrument, not a
                  gimmick, and by building original worlds instead of borrowing existing ones.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-3 border-t border-bone/10">
                {founderStats.map((stat, i) => (
                  <div key={stat.label} className={`pt-7 pr-4 ${i > 0 ? 'border-l border-bone/10 pl-6' : ''}`}>
                    <p className="font-display font-extrabold text-bone leading-none mb-2.5 text-[clamp(1.6rem,3.2vw,2.6rem)] tracking-tight">
                      <Odometer value={stat.value} />
                    </p>
                    <p className="font-mono text-[10px] text-bone/45 uppercase tracking-[0.18em] leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Portrait */}
          <Reveal className="lg:col-span-5" delay={0.2}>
            <div className="relative max-w-[380px] mx-auto lg:ml-auto lg:mr-0">
              <div
                className="tu-frame tu-ticks text-bone/60 relative overflow-hidden border border-bone/10"
                style={{ aspectRatio: '4/5' }}
                data-cursor
              >
                <img
                  src="/images/josh-gottsegen.png"
                  alt="Josh Gottsegen, founder of Tropland Universe"
                  className="w-full h-full object-cover object-top"
                />
                <div className="tu-frame-meta bg-ink/85 backdrop-blur-md px-4 py-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-bone/70">FOUNDER · CREATIVE DIRECTOR</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ember">LA · CA</span>
                </div>
              </div>
              {/* Caption rail */}
              <div className="flex items-center justify-between mt-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-bone/35 uppercase">Fig. 03 — The operator</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-bone/35">EST. 2003</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Ventures;
