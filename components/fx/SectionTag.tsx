import React from 'react';

interface SectionTagProps {
  index?: string;  // retired 7/7 — numbered eyebrows read as template; label carries the tag
  label: string;   // "UNIVERSE"
  dark?: boolean;  // on dark background
  className?: string;
}

/** Mono section eyebrow: "UNIVERSE ————" */
const SectionTag: React.FC<SectionTagProps> = ({ label, dark = true, className }) => (
  <div className={`flex items-center gap-4 ${className ?? ''}`}>
    <span className={`font-mono text-[11px] tracking-[0.3em] uppercase ${dark ? 'text-ember' : 'text-ember-deep'}`}>
      {label}
    </span>
    <span className={`flex-1 h-px max-w-[120px] ${dark ? 'bg-white/15' : 'bg-ink/15'}`} />
  </div>
)

export default SectionTag;
