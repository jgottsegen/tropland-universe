import React from 'react';
import { motion } from 'motion/react';
import SectionTag from './fx/SectionTag';
import Reveal from './fx/Reveal';

const stages = [
  {
    id: 'A',
    name: 'Worldbuilding',
    desc: 'Original characters and story-first IP. Worlds built from scratch, never borrowed.',
    readout: 'INPUT · STORY',
  },
  {
    id: 'B',
    name: 'Direction',
    desc: 'Twenty-five years of film craft: light, lens, and emotion direct every frame.',
    readout: 'CRAFT · CINEMA',
  },
  {
    id: 'C',
    name: 'Generation',
    desc: 'Frontier AI models pushed through thousands of iterations per finished piece.',
    readout: 'MODEL · FRONTIER',
  },
  {
    id: 'D',
    name: 'Mastering',
    desc: 'Color, grain, and 4K finish. Every output graded to hold up on any screen.',
    readout: 'OUTPUT · 4K',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const Pipeline: React.FC = () => {
  return (
    <section id="craft" className="relative bg-ink py-24 md:py-36 overflow-hidden">
      {/* Faint blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(242,238,229,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(242,238,229,0.6) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

        <Reveal>
          <SectionTag label="The Craft" className="mb-12 md:mb-16" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-[10vw] md:text-[4.6vw] leading-[0.95] tracking-[-0.02em] text-bone uppercase">
              Film craft,<br />
              <span className="font-edit italic font-light normal-case text-ember tracking-normal">pointed at</span><br />
              the frontier.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 flex flex-col justify-end" delay={0.15}>
            <p className="font-display font-light text-lg md:text-xl text-bone/65 leading-relaxed max-w-md">
              AI is the medium, not the message. Every Tropland piece runs a
              four-stage pipeline where story and cinematography lead, and the
              models do what cameras can't.
            </p>
          </Reveal>
        </div>

        {/* Pipeline diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 border border-bone/12">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.id}
              className={`group relative p-7 md:p-9 min-h-[230px] flex flex-col gap-8 tu-ticks text-bone/40 hover:bg-bone/[0.04] transition-colors duration-500 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-bone/12' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
            >
              <span className="font-mono text-[10px] tracking-[0.18em] text-bone/40 group-hover:text-bone/70 transition-colors duration-300">
                {stage.readout}
              </span>
              <div>
                <h3 className="font-display font-bold text-2xl md:text-[1.7rem] text-bone mb-3 tracking-tight">
                  {stage.name}
                </h3>
                <p className="font-display font-light text-[15px] text-bone/55 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
              {/* Flow arrow */}
              {i < stages.length - 1 && (
                <span className="hidden md:flex absolute top-1/2 -right-[13px] -translate-y-1/2 z-10 w-6 h-6 items-center justify-center bg-ink border border-bone/20 text-ember font-mono text-[10px] group-hover:border-ember transition-colors duration-300">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Campaign credits */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-bone/40">
              Campaign partners
            </span>
            <span className="h-px w-10 bg-bone/15 hidden md:block" />
            <p className="font-display text-[15px] text-bone/65">
              Paid campaigns with <span className="text-bone font-medium">Adobe</span> and{' '}
              <span className="text-bone font-medium">Meta</span> · Creator programs across the leading AI platforms
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Pipeline;
