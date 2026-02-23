import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/About';
import RockfordPage from './pages/Rockford';
import JooshPage from './pages/Joosh';
import ContactPage from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen font-sans text-brand-text bg-brand-deep flex flex-col">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rockford" element={<RockfordPage />} />
            <Route path="/joosh" element={<JooshPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
