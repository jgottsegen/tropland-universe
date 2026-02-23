import React from 'react';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Ventures from '../components/Ventures';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const Home: React.FC = () => {
    return (
        <main>
            <Hero />
            <Portfolio />
            <Ventures />
            <Services />
            <About />
            <Contact />
        </main>
    );
};

export default Home;
