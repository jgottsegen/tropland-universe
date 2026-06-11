import React, { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·';

interface ScrambleProps {
  children: string;
  className?: string;
  /** ms per frame */
  speed?: number;
  /** frames before each character locks in */
  hold?: number;
  /** restart the scramble when hovered */
  rescrambleOnHover?: boolean;
}

/** Decode-style text scramble that resolves left to right when scrolled into view. */
const Scramble: React.FC<ScrambleProps> = ({
  children,
  className,
  speed = 28,
  hold = 2,
  rescrambleOnHover = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [output, setOutput] = useState(children);
  const [started, setStarted] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = () => {
    if (timer.current) clearInterval(timer.current);
    let frame = 0;
    timer.current = setInterval(() => {
      frame++;
      const locked = Math.floor(frame / hold);
      let out = '';
      for (let i = 0; i < children.length; i++) {
        const c = children[i];
        if (c === ' ') { out += ' '; continue; }
        out += i < locked ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOutput(out);
      if (locked >= children.length) {
        if (timer.current) clearInterval(timer.current);
        setOutput(children);
      }
    }, speed);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          run();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={rescrambleOnHover ? run : undefined}
      aria-label={children}
    >
      {output}
    </span>
  );
};

export default Scramble;
