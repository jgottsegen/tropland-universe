import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

const Word: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}> = ({ word, progress, range, accent }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.27em] ${accent ? 'font-edit italic text-ember-deep' : ''}`}
    >
      {word}
    </motion.span>
  );
};

interface ManifestoTextProps {
  text: string;
  /** words to render in italic ember (matched lowercase, punctuation stripped) */
  accents?: string[];
  className?: string;
}

/** Editorial statement whose words ink in one by one as you scroll through it. */
const ManifestoText: React.FC<ManifestoTextProps> = ({ text, accents = [], className }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.82', 'end 0.45'],
  });
  const words = text.split(' ');
  const accentSet = new Set(accents.map(a => a.toLowerCase()));

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + 1.4 / words.length, 1);
        const clean = word.toLowerCase().replace(/[^a-z0-9'-]/g, '');
        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            accent={accentSet.has(clean)}
          />
        );
      })}
    </p>
  );
};

export default ManifestoText;
