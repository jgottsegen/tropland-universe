import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Award } from 'lucide-react';

const characterGallery = [
    'https://troplanduniverse.com/wp-content/uploads/2025/10/lion-peace-1.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/10/jag-shaka-1.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/10/gorilla-thumb.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/01/home003.jpg',
    'https://troplanduniverse.com/wp-content/uploads/2025/01/home010-2.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/01/home1.png',
];

const RockfordPage: React.FC = () => {
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

            {/* Hero Content */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-accent/10 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Text */}
                        <div className={`order-2 lg:order-1 ${fade(0)}`}>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-sans font-semibold border border-brand-accent/20">
                                    <Award size={14} />
                                    Amazon #1 Bestseller
                                </span>
                                <span className="text-xs font-sans font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-white/10 text-white/50 bg-white/5">
                                    Fantasy / Adventure
                                </span>
                            </div>
                            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-6">
                                The Adventures of<br />Rockford T. <span className="italic text-brand-accent">Honeypot</span>
                            </h1>
                            <p className="text-xl text-white/70 font-sans leading-relaxed mb-8 max-w-xl">
                                Originally published as a fantasy-adventure novel, Rockford T. Honeypot established one of the core story worlds within the Tropland canon. Follow the epic journey of a young, heroic badger through the perilous and magical Tropland Forest.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <a
                                    href="https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,93,58,0.4)]"
                                >
                                    Buy the Book on Amazon
                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Right: Book Cover */}
                        <div className={`order-1 lg:order-2 flex justify-center lg:justify-end ${fade(1)}`}>
                            <div className="relative group max-w-sm w-full">
                                <div className="absolute -inset-4 rounded-3xl bg-brand-accent/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                    <img src="/images/book-rockford.jpg" alt="Rockford T. Honeypot Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Screen Adaptation Context */}
            <section className="py-24 bg-brand-cream text-brand-dark-text border-y border-brand-border-light relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-brand-accent mb-6">Screen Adaptation</p>
                    <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">Beyond the Book</h2>
                    <p className="text-xl md:text-2xl text-brand-muted-light font-sans font-light leading-relaxed mb-10">
                        The property is currently being developed for expansion into animated and digital formats, bringing the vibrant characters of the Tropland Forest to screens and audio platforms worldwide.
                    </p>
                    <a
                        href="https://troplanduniverse.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-brand-border-light text-brand-dark-text font-sans font-semibold hover:bg-brand-cream-dark transition-colors duration-300"
                    >
                        Listen to the Podcast
                        <ArrowUpRight size={16} />
                    </a>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-24 md:py-32 bg-brand-deep">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl text-white mb-4">Character Concept Art</h2>
                        <p className="text-white/50 font-sans text-lg">Visual development from the Rockford T. Honeypot universe.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {characterGallery.map((src, i) => (
                            <div key={i} className="aspect-square rounded-2xl overflow-hidden glass border-white/10 bg-white/5">
                                <img src={src} alt="Character Art" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default RockfordPage;
