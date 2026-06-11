import React from 'react';

interface SectionTagProps {
  index: string;   // "01"
  label: string;   // "UNIVERSE"
  dark?: boolean;  // on dark background
  className?: string;
}

/** Mono section index: "TU·01 / UNIVERSE ————" */
const SectionTag: React.FC<SectionTagProps> = ({ index, label, dark = true, className }) => (
  <div className={`flex items-center gap-4 ${className ?? ''}`}>
    <span className={`font-mono text-[11px] tracking-[0.22em] ${dark ? 'text-ember' : 'text-ember-deep'}`}>
      TU·{index}
    </span>
    <span className={`font-mono text-[11px] tracking-[0.3em] uppercase ${dark ? 'text-white/50' : 'text-ink/50'}`}>
      {label}
    </span>
    <span className={`flex-1 h-px max-w-[120px] ${dark ? 'bg-white/15' : 'bg-ink/15'}`} />
  </div>
)

export default SectionTag;
