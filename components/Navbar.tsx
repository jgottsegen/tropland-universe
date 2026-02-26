import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Rockford', path: '/rockford' },
  { label: "Joosh's", path: '/joosh' },
];

/* Walk up the DOM from a point and return the luminance (0-1) of the
   first element that has a non-transparent background color. */
function getBgLuminance(el: Element | null): number {
  let cur: Element | null = el;
  while (cur && cur !== document.body) {
    const bg = window.getComputedStyle(cur as HTMLElement).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (m) return (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
    }
    cur = cur.parentElement;
  }
  return 0;
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const check = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      if (scrolled) {
        const el = document.elementFromPoint(window.innerWidth / 2, 40);
        setIsLight(getBgLuminance(el) > 0.55);
      } else {
        setIsLight(false);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navBg = isScrolled
    ? isLight
      ? 'bg-white/95 backdrop-blur-xl border-b border-black/[0.07] shadow-[0_2px_20px_rgba(0,0,0,0.07)]'
      : 'bg-brand-deep/96 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_2px_40px_rgba(0,0,0,0.4)]'
    : 'bg-gradient-to-b from-black/50 to-transparent';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity flex items-center gap-3 group"
          >
            <img
              src="/images/tropland-logo.png"
              alt="Tropland Universe"
              className="h-9 transition-all duration-300 group-hover:scale-[1.03]"
              style={{ filter: isLight ? 'brightness(0)' : undefined }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative px-4 py-2 text-[15px] font-sans font-medium transition-colors duration-200 rounded-full ${
                    isActive
                      ? isLight ? 'text-brand-deep' : 'text-white'
                      : isLight
                        ? 'text-brand-deep/50 hover:text-brand-deep'
                        : 'text-white/55 hover:text-white/90'
                  }`}
                  style={isLight ? undefined : { textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-accent" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:inline-flex text-[15px] font-sans font-semibold px-5 py-2.5 rounded-full bg-brand-accent text-white hover:bg-brand-accent-hover transition-all duration-200 hover:shadow-[0_0_24px_rgba(232,93,58,0.35)] hover:scale-[1.02]"
            >
              Partner With Us
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isLight ? 'text-brand-deep/60 hover:text-brand-deep' : 'text-white/70 hover:text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-brand-deep/98 backdrop-blur-xl md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col h-full pt-24 px-8 pb-10">
          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-4xl font-serif tracking-tight py-3 transition-colors ${
                    isActive ? 'text-white' : 'text-white/30 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && <span className="inline-block ml-3 w-1.5 h-1.5 rounded-full bg-brand-accent align-middle" />}
                </Link>
              );
            })}
          </nav>
          <div className="space-y-4">
            <Link
              to="/contact"
              className="flex items-center justify-center px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-base hover:bg-brand-accent-hover transition-colors"
            >
              Partner With Us
            </Link>
            <p className="text-center text-xs font-sans text-white/15 uppercase tracking-[0.3em]">
              The Digital Animal Kingdom
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
