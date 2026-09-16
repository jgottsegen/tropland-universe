import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { track } from '@vercel/analytics';

/** Campaign feature linking the original artwork to the shoppable tee. */
const PeaceSpotlight: React.FC = () => (
  <aside className="peace-spotlight" id="peace-feature" aria-labelledby="peace-spotlight-title">
    <Link to="https://www.troplanduniverse.com/peace" className="peace-spotlight-image" aria-label="View the Peace Lion Tee" onClick={() => track('peace_artwork_shirt_image')}>
      <img src="/images/peace/peace-lion-campaign-v1.jpg" alt="A little wild. A lot of peace. The original black and gold Peace Lion Tee by Tropland Universe." width={1734} height={907} loading="lazy" />
    </Link>
    <div className="peace-spotlight-copy">
      <p className="peace-spotlight-eyebrow">Wear the artwork</p>
      <h3 id="peace-spotlight-title">The Peace Lion Tee</h3>
      <p>Original signed artwork. Ten colors. Your kind of peace.</p>
    </div>
    <Link to="https://www.troplanduniverse.com/peace" className="peace-spotlight-buy" onClick={() => track('peace_artwork_shirt_buy')}>
      Shop the Peace Lion Tee <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  </aside>
);

export default PeaceSpotlight;
