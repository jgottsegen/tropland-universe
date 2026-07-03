import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
