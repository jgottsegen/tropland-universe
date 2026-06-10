import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionTag from './fx/SectionTag';
import Scramble from './fx/Scramble';
import Reveal from './fx/Reveal';
import MagneticButton from './MagneticButton';

const offers = [
  {
    index: '01',
    title: 'Brand Partnerships',
    desc: 'Co-branded content and campaigns with leading tech, entertainment, and consumer brands. Paid campaigns delivered for Adobe and Meta.',
    readout: 'MODE · CAMPAIGN',
  },
  {
    index: '02',
    title: 'Licensing',
    desc: 'Represented by All-American Licensing. Character IP ready for apparel, lifestyle, home décor, publishing, and media.',
    readout: 'MODE · LICENSE',
  },
  {
    index: '03',
    title: 'Global Distribution',
    desc: '1.3 billion cumulative views across 50+ countries. A proven audience engine across every key global market.',
    readout: 'MODE · REACH',
  },
];

const About: React.FC = () => {
  return (
    <section id="licensing" className="py-24 md:py-36 bg-ink relative overflow-hidden">
      <div className="tu-scanline hidden md:block" style={{ animationDelay: '-7s' }} />

      <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

        <Reveal>
          <SectionTag index="05" label="Partnership" className="mb-12 md:mb-16" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-[10vw] md:text-[4.6vw] leading-[0.95] tracking-[-0.02em] text-bone uppercase">
              IP that
              <span className="font-edit italic font-light normal-case text-ember tracking-normal"> travels.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 flex flex-col justify-end" delay={0.15}>
            <p className="font-display font-light text-lg md:text-xl text-bone/65 leading-relaxed max-w-md">
              Tropland partners with select brands, studios, and organizations.
              One proven viral universe, translatable across physical and digital
              categories.
            </p>
          </Reveal>
        </div>

        {/* Offer ledger */}
        <div className="border-t border-bone/12 mb-16">
          {offers.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 0.08}>
              <div
                className="group grid grid-cols-12 gap-4 items-center py-8 md:py-10 border-b border-bone/12 hover:bg-bone/[0.03] transition-colors duration-500 px-2 md:px-6"
                data-cursor
              >
                <span className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-[0.2em] text-ember">
                  {offer.index}
                </span>
                <h3 className="col-span-10 md:col-span-4 font-display font-bold text-2xl md:text-[2rem] text-bone tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {offer.title}
                </h3>
                <p className="col-span-12 col-start-3 md:col-span-5 md:col-start-6 font-display font-light text-[15px] text-bone/55 leading-relaxed max-w-lg">
                  {offer.desc}
                </p>
                <div className="hidden md:flex md:col-span-2 justify-end">
                  <Scramble
                    className="font-mono text-[10px] tracking-[0.18em] text-bone/35 group-hover:text-ember transition-colors duration-300"
                    rescrambleOnHover
                  >
                    {offer.readout}
                  </Scramble>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="flex justify-center">
            <MagneticButton>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-ember text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-300"
              >
                Start the Conversation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
