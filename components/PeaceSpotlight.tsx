import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { track } from '@vercel/analytics';

/** Quiet product feature within the homepage artwork section. */
const PeaceSpotlight: React.FC = () => (
  <aside className="peace-spotlight" id="peace-feature" aria-labelledby="peace-spotlight-title">
    <Link to="https://www.troplanduniverse.com/peace" className="peace-spotlight-image" aria-label="View the Peace Lion Tee" onClick={() => track('peace_artwork_shirt_image')}>
      <img src="/images/peace/mockup-black-v2-20260917.jpg" alt="Black Peace Lion Tee with the original gold lion artwork" width={720} height={960} loading="lazy" />
    </Link>
    <div className="peace-spotlight-copy">
      <p className="peace-spotlight-eyebrow">STRONG ENOUGH TO CHOOSE PEACE</p>
      <h3 id="peace-spotlight-title">The Peace Lion Tee</h3>
      <p>The strength of a lion. The choice of peace. Original signed artwork on a cotton tee in ten colors.</p>
    </div>
    <Link to="https://www.troplanduniverse.com/peace" className="peace-spotlight-buy" onClick={() => track('peace_artwork_shirt_buy')}>
      Shop the Peace Lion Tee <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  </aside>
);

export default PeaceSpotlight;
