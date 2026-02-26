import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface TextRevealProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  /** Initial delay before first word animates (seconds) */
  delay?: number;
  /** Stagger delay between each word (seconds) */
  wordDelay?: number;
}

const wordVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 14 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className,
  style,
  delay = 0,
  wordDelay = 0.08,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const words = children.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: wordDelay, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          style={{
            display: 'inline-block',
            ...(i < words.length - 1 ? { marginRight: '0.28em' } : {}),
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
