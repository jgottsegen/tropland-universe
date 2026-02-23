import React, { useEffect, useRef, useState } from 'react';
import CometBackground from '../components/CometBackground';

const joshClients = ['Universal Studios', 'Disney', 'Fox', 'IMG', 'NFL', 'IndyCar', 'Ferrari', 'Vatican Museums'];

const galleryImages = [
    'https://troplanduniverse.com/wp-content/uploads/2025/01/home003.jpg',
    'https://troplanduniverse.com/wp-content/uploads/2025/10/lion-peace-1.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/01/home1.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/01/IMG_2051.jpg',
    'https://troplanduniverse.com/wp-content/uploads/2025/01/home004.jpg',
];

const AboutPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const fade = (delay: number) =>
        `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

    return (
        <div className="bg-brand-deep min-h-screen pt-20" ref={sectionRef}>

            {/* Section 1: What is Tropland Universe */}
            <section className="py-20 md:py-32 relative overflow-hidden bg-brand-cream text-brand-dark-text">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-brand-accent mb-4">
                                The Story
                            </p>
                            <h1 className="font-serif text-5xl sm:text-6xl md:text-[5rem] leading-[0.9] tracking-tight mb-8">
                                What is <span className="italic text-brand-purple">Tropland?</span>
                            </h1>

                            <div className="space-y-6 text-xl md:text-2xl text-brand-muted-light font-sans font-light leading-relaxed">
                                <p>
                                    Tropland Universe began as a children's publishing IP with the Joosh's Juice Bar and Rockford T. Honeypot series.
                                </p>
                                <p>
                                    Today, it has evolved into the definitive Digital Animal Kingdom. With the emergence of AI-native media in 2022, Tropland expanded into a global wildlife media brand.
                                </p>
                                <p className="text-base text-brand-muted">
                                    From cinematic AI art to viral storytelling, the universe now connects imagination and nature for an audience of millions across 50+ countries.
                                </p>
                            </div>
                        </div>

                        {/* Gallery Cluster */}
                        <div className="relative h-[600px] w-full hidden lg:block">
                            {galleryImages.map((src, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-2xl overflow-hidden shadow-2xl bg-white/10"
                                    style={{
                                        width: i === 0 ? '60%' : '40%',
                                        height: i === 0 ? '60%' : '40%',
                                        top: i === 0 ? '10%' : (i * 12) + '%',
                                        left: i === 0 ? '5%' : (i % 2 === 0 ? '50%' : '20%'),
                                        zIndex: 10 - i,
                                        transform: `rotate(${i % 2 === 0 ? i * 2 : -i * 3}deg)`
                                    }}
                                >
                                    <img src={src} alt="Tropland Art" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        {/* Mobile simplified gallery */}
                        <div className="flex lg:hidden gap-4 overflow-x-auto pb-8 snap-x">
                            {galleryImages.map((src, i) => (
                                <img key={i} src={src} alt="Tropland Art" className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-xl snap-center shrink-0" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Josh Gottsegen (The Creator) */}
            <section className="py-24 md:py-32 relative overflow-hidden bg-brand-deep text-white">
                <CometBackground density={2} speed={0.9} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/20 rounded-full blur-[250px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left: Heading + Bio */}
                        <div>
                            <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-brand-accent mb-4">
                                The Founder
                            </p>
                            <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-8`}>
                                Josh <span className="italic text-brand-accent">Gottsegen</span>
                            </h2>

                            <div className="space-y-6 text-white/70 font-sans text-lg leading-relaxed">
                                <p>
                                    Josh Gottsegen is an AI artist, creative director, and founder of Tropland Universe, the Digital Animal Kingdom. With over 25 years of experience in design, marketing, and production, he brings long-term creative leadership to AI-native media, intellectual property development, and visual storytelling at scale.
                                </p>
                                <p>
                                    Gottsegen began developing the Tropland Universe as a publishing IP with the Joosh's Juice Bar children's book series. That world expanded with The Adventures of Rockford T. Honeypot, an Amazon #1 bestseller.
                                </p>
                                <p>
                                    As AI emerged as a creative medium, he extended the original IP into digital wildlife content, transforming Tropland into a global Digital Animal Kingdom reaching millions of viewers with over one billion views across platforms.
                                </p>
                            </div>
                        </div>

                        {/* Right: Josh photo */}
                        <div className={`flex justify-center`}>
                            <div className="relative group max-w-sm w-full">
                                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-accent/20 via-brand-purple/30 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative aspect-square rounded-3xl overflow-hidden glass border-white/10 hover:border-brand-accent/20 transition-all duration-500">
                                    <img
                                        src="/images/josh-gottsegen.png"
                                        alt="Josh Gottsegen - Founder of Tropland Universe"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand-accent/30 rounded-tl-lg"></div>
                                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand-accent/30 rounded-br-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Creative Leadership & Industry Experience */}
                    <div className="mt-24 md:mt-32">
                        <h3 className="font-serif text-3xl mb-12 text-center">Creative Leadership & Industry Experience</h3>

                        {/* Client Marquee */}
                        <div className="relative flex overflow-x-hidden border-y border-white/10 py-8 bg-white/5 backdrop-blur-sm">
                            <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24 px-8">
                                {[...joshClients, ...joshClients, ...joshClients].map((client, i) => (
                                    <span key={i} className="text-xl md:text-2xl font-sans font-bold text-white/40 uppercase tracking-widest hover:text-white/80 transition-colors">
                                        {client}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
