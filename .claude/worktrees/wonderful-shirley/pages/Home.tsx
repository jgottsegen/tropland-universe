import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Ventures from '../components/Ventures';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const Home: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Tropland Universe | Digital Animal Kingdom</title>
                <meta name="description" content="Wildlife media brand with 1B+ content views. Original books, AI art, and licensing-ready IP by Josh Gottsegen." />
                <meta property="og:title" content="Tropland Universe | Digital Animal Kingdom" />
                <meta property="og:description" content="Wildlife media brand with 1B+ content views. Original books, AI art, and licensing-ready IP by Josh Gottsegen." />
                <meta property="og:url" content="https://troplanduniverse.com/" />
            </Helmet>
            <main>
                <Hero />
                <Portfolio />
                <Ventures />
                <Services />
                <About />
                <Contact />
            </main>
        </>
    );
};

export default Home;
