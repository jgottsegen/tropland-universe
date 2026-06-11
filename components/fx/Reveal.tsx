import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Scroll-triggered fade-up wrapper. */
const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, y = 28, once = true }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, amount: 0.2 }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default Reveal;
