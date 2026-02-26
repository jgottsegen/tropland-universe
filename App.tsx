import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/About';
import RockfordPage from './pages/Rockford';
import JooshPage from './pages/Joosh';
import ContactPage from './pages/Contact';
import LicensingPage from './pages/Licensing';
import LicensingLogin from './pages/LicensingLogin';
import TroplandLibrary from './pages/TroplandLibrary';
import ProtectedRoute from './components/ProtectedRoute';

const PORTAL_PATHS = ['/tropland-licensing', '/tropland-licensing/login'];

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
    <div className="min-h-screen font-sans text-brand-text bg-brand-deep flex flex-col">
      {!isPortal && <Navbar />}

      <div className="flex-grow">
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
      </div>

      {!isPortal && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
