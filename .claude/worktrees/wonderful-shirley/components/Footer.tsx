import React from 'react';
import { Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-deep relative overflow-hidden">
      {/* Top divider with accent glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(232,93,58,0.4) 30%, rgba(232,93,58,0.4) 70%, transparent 100%)' }} />
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,93,58,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Main footer grid */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-4">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}
              className="flex items-center gap-3 mb-5 hover:opacity-80 transition-opacity w-fit">
              <img src="/images/tropland-logo.png" alt="Tropland Universe" className="h-7" />
            </Link>
            <p className="text-white/45 font-sans text-[15px] leading-relaxed max-w-xs mb-6">
              The Digital Animal Kingdom. A character-driven wildlife media brand blending original IP, cinematic AI art, and global storytelling.
            </p>
            <div className="flex items-center gap-2">
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
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white border border-white/[0.08] hover:border-brand-accent/30 hover:bg-brand-accent/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2" />

          {/* Explore column */}
          <div className="md:col-span-3">
            <p className="text-[13px] font-sans font-semibold uppercase tracking-[0.3em] text-white/40 mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Rockford T. Honeypot', path: '/rockford' },
                { label: "Joosh's Juice Bar", path: '/joosh' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-white/40 hover:text-white font-sans text-[15px] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="md:col-span-3">
            <p className="text-[13px] font-sans font-semibold uppercase tracking-[0.3em] text-white/40 mb-5">
              Work With Us
            </p>
            <p className="text-white/35 font-sans text-[15px] leading-relaxed mb-5">
              For licensing inquiries, brand partnerships, and collaboration opportunities.
            </p>
            <a href="mailto:partnerships@troplanduniverse.com"
              className="text-brand-accent/80 hover:text-brand-accent font-sans text-[15px] transition-colors duration-200 block mb-6">
              partnerships@troplanduniverse.com
            </a>
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-200 hover:shadow-[0_0_20px_rgba(232,93,58,0.3)]"
            >
              Partner With Us
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.05] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-xs text-white/35 font-sans">
              © {new Date().getFullYear()} Tropland Universe / OneLight Studios LLC. All rights reserved.
            </p>
            <p className="text-xs text-white/35 font-sans">
              Est. 2013 · Los Angeles, CA
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/35 hover:text-white border border-white/[0.08] hover:border-brand-accent/30 hover:bg-brand-accent/10 transition-all duration-300 self-start sm:self-auto"
            aria-label="Back to top"
          >
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
