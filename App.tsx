import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SmoothScroll from './components/fx/SmoothScroll';

// Home stays eager (it is the LCP path). Every other route loads on demand,
// which keeps three.js (About's forest scene) out of the main bundle.
const AboutPage = lazy(() => import('./pages/About'));
const RockfordPage = lazy(() => import('./pages/Rockford'));
const JooshPage = lazy(() => import('./pages/Joosh'));
const ContactPage = lazy(() => import('./pages/Contact'));
const LicensingPage = lazy(() => import('./pages/Licensing'));
const LicensingLogin = lazy(() => import('./pages/LicensingLogin'));
const TroplandLibrary = lazy(() => import('./pages/TroplandLibrary'));
// Portal-only: keeps the supabase client out of the main bundle
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

const PORTAL_PATHS = ['/tropland-licensing', '/tropland-licensing/login'];

/* Deep links like /#kingdom (the IG bio) land before React has rendered the
   target, and the nav's scroll reset stomps the browser's native jump.
   Retry until the section exists and stays put. */
const ScrollToHash: React.FC = () => {
  const location = useLocation();
  React.useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
      const settled = el && Math.abs(el.getBoundingClientRect().top) < 80;
      if (!settled && ++tries < 8) timer = setTimeout(attempt, 400);
    };
    timer = setTimeout(attempt, 250);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);
  return null;
};

/* ── 404 Page ──────────────────────────────────────────────── */
const NotFound: React.FC = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-6xl md:text-8xl text-brand-accent mb-6">404</h1>
        <p className="font-sans text-xl text-white/70 mb-8 max-w-md">
            This page doesn't exist in the Tropland Universe — yet.
        </p>
        <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-lg hover:bg-brand-accent-hover transition-all duration-300"
        >
            Return Home
        </Link>
    </div>
);

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isPortal = PORTAL_PATHS.some(p => location.pathname.startsWith(p));

  return (
    <div className="min-h-screen font-sans text-brand-text bg-ink flex flex-col">
      {!isPortal && <div className="tu-grain" aria-hidden="true" />}
      {!isPortal && <Navbar />}
      <ScrollToHash />

      <div className="flex-grow">
        <Suspense fallback={<div className="min-h-screen bg-ink" aria-hidden="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rockford" element={<RockfordPage />} />
          <Route path="/joosh" element={<JooshPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/licensing" element={<LicensingPage />} />
          <Route path="/tropland-licensing/login" element={<LicensingLogin />} />
          <Route path="/tropland-licensing" element={
            <ProtectedRoute>
              <TroplandLibrary />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </div>

      {!isPortal && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <SmoothScroll>
        <AppLayout />
      </SmoothScroll>
      <Analytics />
    </Router>
  );
};

export default App;
