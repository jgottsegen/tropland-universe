import React, { useState, useEffect } from 'react';
import { track } from '@vercel/analytics';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Rockford', path: '/rockford' },
  { label: 'Joosh', path: '/joosh' },
  { label: 'Licensing', path: '/licensing' },
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
        const el = document.elementFromPoint(window.innerWidth / 2, 90);
        setIsLight(getBgLuminance(el) > 0.45);
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
      ? 'bg-bone/95 backdrop-blur-xl border-b border-ink/10'
      : 'bg-ink/90 backdrop-blur-xl border-b border-bone/10'
    : 'bg-gradient-to-b from-black/55 to-transparent';

  const linkColor = (isActive: boolean) =>
    isActive
      ? isLight ? 'text-ink' : 'text-bone'
      : isLight
        ? 'text-ink/60 hover:text-ink'
        : 'text-bone/65 hover:text-bone';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-[1480px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">

          {/* Logo — on the homepage entrance the hero lockup IS the mark, so the
              nav wordmark stays out of its way until scroll (one voice per viewport) */}
          <Link
            to="/"
            className={`hover:opacity-80 flex items-center gap-3 group transition-opacity duration-500 ${
              location.pathname === '/' && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-hidden={location.pathname === '/' && !isScrolled}
            tabIndex={location.pathname === '/' && !isScrolled ? -1 : undefined}
          >
            <img
              src="/images/tropland-logo.png"
              alt="Tropland Universe"
              className="h-9 w-auto max-w-[calc(100vw-140px)] object-contain object-left lg:max-w-none flex-shrink-0 transition-all duration-300 group-hover:scale-[1.03]"
              style={{ filter: isLight ? 'brightness(0)' : undefined }}
            />
          </Link>

          {/* Desktop nav — full rail needs lg width; tablet keeps the hamburger */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`group relative flex items-baseline gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors duration-200 ${linkColor(isActive)}`}
                  style={isLight || isScrolled ? undefined : { textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
                >
                  <span className="tu-link">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              onClick={() => track('partner_cta_nav')}
              className="hidden xl:inline-flex items-center gap-2 whitespace-nowrap font-display font-bold text-[13px] uppercase tracking-[0.08em] px-5 py-2.5 bg-ember text-ink hover:bg-ember-soft transition-colors duration-200"
            >
              Partner With Us
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${isLight ? 'text-ink/70 hover:text-ink' : 'text-bone/70 hover:text-bone'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-ink lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-28 px-8 pb-10">
          <nav className="flex flex-col flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-baseline gap-4 py-4 border-b border-bone/10 transition-colors ${isActive ? 'text-bone' : 'text-bone/50 hover:text-bone'}`}
                >
                  <span className="font-display font-extrabold text-3xl uppercase tracking-tight">
                    {item.label}
                  </span>
                  {isActive && <ArrowRight size={18} className="text-ember ml-auto" />}
                </Link>
              );
            })}
          </nav>
          <div className="space-y-5">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-ember text-ink font-display font-bold text-base uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors"
            >
              Partner With Us
            </Link>
            <p className="text-center font-mono text-[10px] text-bone/30 uppercase tracking-[0.3em]">
              The Digital Animal Kingdom
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
