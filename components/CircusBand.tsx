import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionTag from './fx/SectionTag';
import Reveal from './fx/Reveal';

const proofs = [
  { value: '500M', label: 'Views · last 60 days' },
  { value: '5', label: 'Pieces past 100 million views each' },
  { value: 'PETA', label: 'Publicly applauded' },
];

const CircusBand: React.FC = () => (
  <section id="circus" className="relative bg-ink py-24 md:py-32 overflow-hidden">
    <div className="max-w-[1480px] mx-auto px-6 md:px-12">
      <Reveal>
        <SectionTag label="The Digital Circus" className="mb-10 md:mb-14" />
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="font-display font-extrabold text-[9vw] md:text-[4.2vw] leading-[0.98] tracking-[-0.02em] text-bone uppercase max-w-5xl">
          An animal-free circus
          <span className="font-edit italic font-light normal-case text-ember tracking-normal"> the internet argues about.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="font-display font-light text-lg md:text-xl text-bone/65 leading-relaxed max-w-2xl mt-8">
          Photoreal circus acts with no animals and no cages, performed on screens for a
          worldwide audience. The series passed 150 million views in its first three weeks,
          and the comments ask one question: is this real? The acts are finished, proven,
          and ready to license for venues and screens.
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-bone/12 mt-12">
          {proofs.map((p, i) => (
            <div
              key={p.label}
              className={`py-7 md:py-8 px-2 md:px-8 ${i > 0 ? 'md:border-l md:border-bone/10 border-t md:border-t-0 border-bone/10' : ''}`}
            >
              <div className="font-display font-extrabold text-4xl md:text-5xl text-bone leading-none tracking-tight">
                {p.value}
              </div>
              <div className="font-mono text-[10px] md:text-[11px] text-bone/50 uppercase tracking-[0.22em] mt-3">
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="flex flex-wrap gap-6 mt-10">
          <a
            href="#field"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ember hover:text-bone transition-colors duration-300"
          >
            Watch the acts <ArrowRight size={12} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/60 hover:text-bone transition-colors duration-300"
          >
            License the acts <ArrowRight size={12} />
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CircusBand;
