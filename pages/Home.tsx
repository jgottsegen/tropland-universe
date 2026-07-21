import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import FlightSequence from '../components/FlightSequence';
import QuoteBand from '../components/QuoteBand';
import FieldReels from '../components/FieldReels';
import JoinKingdom from '../components/JoinKingdom';
import Pipeline from '../components/Pipeline';
import Ventures from '../components/Ventures';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const Home: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Tropland Universe | The Digital Animal Kingdom</title>
                <meta name="description" content="Cinema-grade wildlife storytelling built at the frontier of AI. 2B+ content views, original books, and licensing-ready IP by Josh Gottsegen." />
                <meta property="og:title" content="Tropland Universe™ | The Digital Animal Kingdom" />
                <meta property="og:description" content="Cinema-grade wildlife storytelling built at the frontier of AI. 2B+ content views, original books, and licensing-ready IP by Josh Gottsegen." />
                <meta property="og:url" content="https://troplanduniverse.com/" />
            </Helmet>
            <main>
                <Hero />
                <Portfolio />
                <FlightSequence />
                <QuoteBand />
                <FieldReels />
                <JoinKingdom />
                <Pipeline />
                <Ventures />
                <Services />
                <About />
                <Contact />
            </main>
        </>
    );
};

export default Home;
