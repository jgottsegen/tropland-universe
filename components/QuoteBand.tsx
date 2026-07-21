import React from 'react';
import Reveal from './fx/Reveal';

/**
 * Bone palate-cleanse between the two video chapters (Flight → Field).
 * One line, no metrics, no buttons.
 */
const QuoteBand: React.FC = () => (
  <section className="bg-bone py-20 md:py-28">
    <div className="max-w-[1480px] mx-auto px-6 md:px-12">
      <Reveal>
        <p className="font-edit italic font-light text-[7vw] md:text-[3.2vw] leading-[1.15] text-ink text-center max-w-5xl mx-auto">
          One artist. One universe.
          <span className="text-ember-deep"> 2 billion views and counting.</span>
        </p>
      </Reveal>
    </div>
  </section>
);

export default QuoteBand;
