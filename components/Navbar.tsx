import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Rockford', path: '/rockford' },
  { label: "Joosh's", path: '/joosh' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-brand-deep/95 backdrop-blur-lg border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
        : 'bg-gradient-to-b from-black/60 to-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:opacity-80 transition-opacity flex items-center gap-3"
          >
            <img src="/images/tropland-logo.png" alt="Tropland Universe" className="h-8" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-sm font-sans font-medium text-white/75 hover:text-white transition-colors duration-200"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
                onClick={() => window.scrollTo(0, 0)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="text-sm font-sans font-semibold px-5 py-2.5 rounded-full bg-brand-accent text-white hover:bg-brand-accent-hover transition-all duration-200 hover:shadow-[0_0_20px_rgba(232,93,58,0.3)]"
              onClick={() => window.scrollTo(0, 0)}
            >
              Partner With Us
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-deep pt-24 px-8 md:hidden">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-3xl font-sans font-bold text-white/50 hover:text-white transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="text-lg font-sans font-semibold px-6 py-3 rounded-full bg-brand-accent text-white text-center mt-4"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              Partner With Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
