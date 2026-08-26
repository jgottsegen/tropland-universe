import React from 'react';
import { Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ink relative overflow-hidden border-t border-bone/10">

      <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

        {/* Giant wordmark */}
        <div className="pt-16 md:pt-20 pb-10 md:pb-14 border-b border-bone/10">
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="block w-fit" aria-label="Tropland Universe home">
            <span className="tu-outline-type font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.85] block text-[12.5vw] select-none">
              Tropland
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-6">
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-bone/40">
              The Digital Animal Kingdom
            </span>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-bone/25">
              EST. 2013 · LOS ANGELES, CA
            </span>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-ember/80">
              BILLIONS OF VIEWS · 3M+ FOLLOWERS · 50+ COUNTRIES
            </span>
          </div>
        </div>

        {/* Link grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-5">
            <p className="text-bone/45 font-display font-light text-[15px] leading-relaxed max-w-sm mb-7">
              A character-driven wildlife media brand blending original IP,
              cinematic AI art, and global storytelling.
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
                    className="w-10 h-10 flex items-center justify-center text-bone/45 hover:text-ink border border-bone/15 hover:border-ember hover:bg-ember transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
              {/*
                Patreon row removed 2026-07-27: nothing is being posted there,
                so every tap landed on an empty page. A dead door in the footer
                costs more than the row was ever worth. Restore it the day there
                is something behind it.
              */}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40 mb-6">
              Explore
            </p>
            <ul className="space-y-3.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Rockford T. Honeypot', path: '/rockford' },
                { label: "Joosh's Juice Bar", path: '/joosh' },
                { label: 'Licensing', path: '/licensing' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="tu-link text-bone/50 hover:text-bone font-display text-[15px] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40 mb-6">
              Work With Us
            </p>
            <p className="text-bone/40 font-display font-light text-[15px] leading-relaxed mb-5 max-w-xs">
              Partnerships and licensing inquiries, answered by the founder.
            </p>
            <a
              href="mailto:partnerships@troplanduniverse.com"
              className="tu-link text-ember hover:text-ember-soft font-display text-[15px] transition-colors duration-200 inline-block mb-7"
            >
              partnerships@troplanduniverse.com
            </a>
            <div>
              <Link
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-ink font-display font-bold text-[13px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-200"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-bone/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <p className="font-mono text-[10px] tracking-[0.12em] text-bone/35">
              © {new Date().getFullYear()} TROPLAND UNIVERSE™ /{' '}
              <a
                href="https://www.onelightstudios.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ember/80 hover:text-ember transition-colors duration-200"
              >
                ONELIGHT STUDIOS LLC
              </a>
              . ALL RIGHTS RESERVED.
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 flex items-center justify-center text-bone/40 hover:text-ink border border-bone/15 hover:border-ember hover:bg-ember transition-all duration-300 self-start sm:self-auto"
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
