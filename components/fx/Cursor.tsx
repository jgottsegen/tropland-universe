import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Custom cursor: small ember dot + trailing ring.
 * Ring expands over interactive elements; shows a mono label
 * when hovering [data-cursor-label] targets. Desktop pointers only.
 */
const Cursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    if (!fine.matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = (e.target as HTMLElement)?.closest?.(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      ) as HTMLElement | null;
      setHovering(!!t);
      const labelled = (e.target as HTMLElement)?.closest?.('[data-cursor-label]') as HTMLElement | null;
      setLabel(labelled?.dataset.cursorLabel ?? '');
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div data-tu-cursor="" className="hidden md:block pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      {/* Trailing ring / label chip */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full border flex items-center justify-center overflow-hidden"
          animate={{
            width: label ? 84 : hovering ? 48 : 30,
            height: label ? 84 : hovering ? 48 : 30,
            opacity: visible ? 1 : 0,
            backgroundColor: label ? 'rgba(255,77,28,0.92)' : 'rgba(255,77,28,0)',
            borderColor: label ? 'rgba(255,77,28,0.9)' : 'rgba(255,77,28,0.55)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          {label && (
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white select-none">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
      {/* Dot */}
      <motion.div
        className="absolute w-[5px] h-[5px] rounded-full bg-ember"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && !label ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};

export default Cursor;
