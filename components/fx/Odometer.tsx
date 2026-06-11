import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** One rolling digit column. */
const Digit: React.FC<{ value: number; play: boolean; delay: number }> = ({ value, play, delay }) => (
  <span className="inline-block overflow-hidden" style={{ height: '1em' }}>
    <motion.span
      className="flex flex-col items-center"
      initial={{ y: 0 }}
      animate={play ? { y: `-${value}em` } : { y: 0 }}
      transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ lineHeight: '1em' }}
    >
      {DIGITS.map(d => (
        <span key={d} style={{ height: '1em' }}>{d}</span>
      ))}
    </motion.span>
  </span>
);

interface OdometerProps {
  /** e.g. "1.3B+", "3M+", "50+", "267M" */
  value: string;
  className?: string;
}

/** Odometer-style stat: digits roll into place when scrolled into view. */
const Odometer: React.FC<OdometerProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPlay(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let digitIndex = 0;
  return (
    <span ref={ref} className={`inline-flex tabular-nums ${className ?? ''}`} aria-label={value}>
      {value.split('').map((ch, i) => {
        if (/\d/.test(ch)) {
          const d = <Digit key={i} value={parseInt(ch, 10)} play={play} delay={digitIndex * 0.12} />;
          digitIndex++;
          return d;
        }
        return <span key={i}>{ch}</span>;
      })}
    </span>
  );
};

export default Odometer;
