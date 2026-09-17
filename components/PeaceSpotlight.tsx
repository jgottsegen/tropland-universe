import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { track } from '@vercel/analytics';

const colors = [
  { name: 'Black', swatch: '#181818' },
  { name: 'Petrol Blue', swatch: '#34505a' },
  { name: 'Army', swatch: '#646045' },
  { name: 'Navy', swatch: '#252b38' },
  { name: 'Charcoal', swatch: '#4e5050' },
  { name: 'Coal', swatch: '#343635' },
  { name: 'Bone', swatch: '#ded8c9' },
  { name: 'Ecru', swatch: '#e5ddc6' },
  { name: 'Natural', swatch: '#efe8d4' },
  { name: 'White', swatch: '#f4f4f2' },
];

/** Homepage product story using the verified, corrected supplier photographs. */
const PeaceSpotlight: React.FC = () => {
  const [color, setColor] = useState(colors[0]);
  const image = `/images/peace/spotlight-${color.name.toLowerCase().replaceAll(' ', '-')}-v2-20260917.webp`;

  return (
    <aside className="peace-spotlight" id="peace-feature" aria-labelledby="peace-spotlight-title">
      <div className="peace-spotlight-copy">
        <p className="peace-spotlight-eyebrow"><span aria-hidden="true" /> Tropland Universe / Wearable art</p>
        <h3 id="peace-spotlight-title"><span>STRONG ENOUGH</span><em>TO CHOOSE PEACE</em></h3>
        <p className="peace-spotlight-name">The Peace Lion Tee</p>
        <p className="peace-spotlight-description">The strength of a lion. The choice of peace.<br />Original signed artwork. A statement you wear.</p>
        <Link to="/peace" className="peace-spotlight-buy" onClick={() => track('peace_artwork_shirt_buy')}>
          Find your color <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
        <p className="peace-spotlight-details">Combed cotton <span aria-hidden="true">·</span> Unisex fit <span aria-hidden="true">·</span> 10 colors</p>
      </div>
      <div className="peace-spotlight-product">
        <div className="peace-spotlight-product-top"><span>ORIGINAL ART. EVERYDAY EXPRESSION.</span><span aria-hidden="true">↗</span></div>
        <Link to="/peace" className="peace-spotlight-image" aria-label="Explore the Peace Lion Tee" onClick={() => track('peace_artwork_shirt_image')}>
          <img src={image} alt={`Peace Lion Tee in ${color.name}, with the original golden lion artwork and artist signature`} width={1536} height={2048} loading="lazy" decoding="async" />
        </Link>
        <div className="peace-spotlight-color-picker">
          <p aria-live="polite"><span>MAKE IT YOURS</span><strong>{color.name}</strong></p>
          <div className="peace-spotlight-swatches" role="group" aria-label="Preview shirt colors">
            {colors.map(option => <button key={option.name} type="button" title={option.name} aria-label={`Preview ${option.name}`} aria-pressed={color.name === option.name} onClick={() => setColor(option)} style={{ '--shirt-color': option.swatch } as React.CSSProperties}><span /></button>)}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PeaceSpotlight;
