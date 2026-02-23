import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-brand-deep border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <span className="font-sans text-sm font-bold text-white">
            OneLight Studios
          </span>
          <span className="text-xs text-white/30 font-sans">
            &copy; {new Date().getFullYear()} OneLight Studios LLC. All rights reserved.
          </span>
        </div>
        <a
          href="mailto:partnerships@troplanduniverse.com"
          className="text-xs text-white/30 font-sans hover:text-brand-accent transition-colors"
        >
          partnerships@troplanduniverse.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
