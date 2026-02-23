import React from 'react';
import { Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-deep border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

          {/* Logo + Tagline */}
          <div>
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <img src="/images/tropland-logo.png" alt="Tropland Universe" className="h-6" />
            </Link>
            <p className="text-xs text-white/30 font-sans">
              The Digital Animal Kingdom · Los Angeles
            </p>
          </div>



          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, href: 'https://instagram.com/troplanduniverse', label: 'Instagram' },
              { icon: Facebook, href: 'https://facebook.com/troplanduniverse', label: 'Facebook' },
              { icon: Youtube, href: 'https://youtube.com/@troplanduniverse', label: 'YouTube' },
            ].map(social => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/30 hover:text-white hover:border-brand-accent/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-white/20 font-sans">
            © {new Date().getFullYear()} Tropland Universe / OneLight Studios LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:partnerships@troplanduniverse.com" className="text-xs text-white/30 font-sans hover:text-white/60 transition-colors">
              partnerships@troplanduniverse.com
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/30 hover:text-white hover:border-brand-accent/30 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
