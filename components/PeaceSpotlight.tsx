import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { track } from '@vercel/analytics';

/** A product note beside the artwork, after the existing audience proof. */
const PeaceSpotlight: React.FC = () => (
  <aside className="peace-spotlight" aria-labelledby="peace-spotlight-title">
    <Link to="https://www.troplanduniverse.com/peace" className="peace-spotlight-image" aria-label="View the Peace Lion Tee" onClick={() => track('peace_artwork_shirt_image')}>
      <img src="/images/peace/mockup-black.jpg" alt="Black Peace Lion Tee with the signed golden lion peace-sign illustration" width={720} height={960} loading="lazy" />
    </Link>
    <div className="peace-spotlight-copy">
      <p className="peace-spotlight-eyebrow">From the artwork</p>
      <h3 id="peace-spotlight-title">The Peace Lion Tee</h3>
      <p>A little wild. A lot of peace. The signed lion illustration, on a cotton tee in ten colors.</p>
    </div>
    <Link to="https://www.troplanduniverse.com/peace" className="peace-spotlight-buy" onClick={() => track('peace_artwork_shirt_buy')}>
      Buy the Peace Lion Tee <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  </aside>
);

export default PeaceSpotlight;
