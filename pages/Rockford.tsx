import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import CometBackground from '../components/CometBackground';

const galleryImages = [
    'https://troplanduniverse.com/wp-content/uploads/2025/10/lion-peace-1.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/10/jag-shaka-1.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/10/gorilla-thumb.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/01/home003.jpg',
    'https://troplanduniverse.com/wp-content/uploads/2025/01/home010-2.png',
    'https://troplanduniverse.com/wp-content/uploads/2025/01/home1.png',
];

function useFadeIn(threshold = 0.08) {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    const fade = () =>
        `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
    return { ref, visible, fade };
}

const RockfordPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { const t = setTimeout(() => setLoaded(true), 200); return () => clearTimeout(t); }, []);

    const sec2 = useFadeIn();
    const sec3 = useFadeIn();
    const sec4 = useFadeIn();

    const heroFade = () =>
        `transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

    return (
        <div className="bg-brand-deep min-h-screen">

            {/* ═══════════════════════════════════════════════════════════
                HERO — Cinematic book showcase with atmospheric backdrop
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <CometBackground density={3} speed={0.8} />
                {/* Atmospheric backdrop — Tropland forest world */}
                <div className="absolute inset-0">
                    <img
                        src="https://troplanduniverse.com/wp-content/uploads/2025/01/home003.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 40%' }}
                        aria-hidden="true"
                    />
                </div>
                {/* Heavy dark overlays for text legibility + brand palette */}
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(13,10,26,0.96) 0%, rgba(13,10,26,0.82) 45%, rgba(13,10,26,0.65) 100%)' }} />
                <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(232,93,58,0.08) 0%, transparent 65%)' }} />
                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-accent/8 rounded-full blur-[200px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-purple/15 rounded-full blur-[180px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Text */}
                        <div className="order-2 lg:order-1">
                            <div className={`flex flex-wrap items-center gap-3 mb-6 ${heroFade()}`} style={{ transitionDelay: '200ms' }}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-sans font-semibold border border-brand-accent/20">
                                    <Award size={14} />
                                    Amazon #1 Bestseller
                                </span>
                                <span className="text-xs font-sans font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-white/10 text-white/50 bg-white/5">
                                    Fantasy / Adventure
                                </span>
                            </div>

                            <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-6 ${heroFade()}`} style={{ transitionDelay: '400ms' }}>
                                The Adventures of<br />Rockford T. <span className="italic text-brand-accent">Honeypot</span>
                            </h1>

                            <p className={`text-xl text-white/70 font-sans leading-relaxed mb-8 max-w-xl ${heroFade()}`} style={{ transitionDelay: '600ms' }}>
                                Follow the epic journey of a young, heroic badger through the perilous and magical Tropland Forest. Originally published as a fantasy-adventure novel, Rockford T. Honeypot established one of the core story worlds within the Tropland canon.
                            </p>

                            <div className={`flex flex-wrap items-center gap-4 ${heroFade()}`} style={{ transitionDelay: '800ms' }}>
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

                        {/* Book Cover */}
                        <div className={`order-1 lg:order-2 flex justify-center lg:justify-end ${heroFade()}`} style={{ transitionDelay: '300ms' }}>
                            <div className="relative group max-w-sm w-full">
                                <div className="absolute -inset-4 rounded-3xl bg-brand-accent/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="book-cover">
                                    <div className="book-inner relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                        <img src="/images/book-rockford.jpg" alt="Rockford T. Honeypot Cover" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                BEYOND THE BOOK — Expansion narrative
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec2.ref as any} className="py-24 md:py-32 bg-brand-cream text-brand-dark-text relative overflow-hidden cream-texture">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
                    <div className={sec2.fade()} style={{ transitionDelay: '0ms' }}>
                        <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-brand-accent mb-6">Beyond the Book</p>
                    </div>

                    <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight ${sec2.fade()}`} style={{ transitionDelay: '80ms' }}>
                        From pages to <span className="italic text-brand-accent">screens.</span>
                    </h2>

                    <p className={`text-xl md:text-2xl text-brand-muted-light font-sans font-light leading-relaxed mb-6 ${sec2.fade()}`} style={{ transitionDelay: '160ms' }}>
                        The Rockford T. Honeypot property is being developed for expansion into animated and digital formats. The vibrant characters and rich world of Tropland Forest are built for multi-platform storytelling.
                    </p>

                    <p className={`text-base text-brand-muted font-sans leading-relaxed mb-10 max-w-2xl mx-auto ${sec2.fade()}`} style={{ transitionDelay: '240ms' }}>
                        Originally written and illustrated by Josh Gottsegen, the novel reached #1 on Amazon and introduced the core mythology that now powers the entire Tropland Universe.
                    </p>

                    <div className={sec2.fade()} style={{ transitionDelay: '320ms' }}>
                        <Link
                            to="/about"
                            onClick={() => window.scrollTo(0, 0)}
                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-brand-border-light text-brand-dark-text font-sans font-semibold hover:bg-brand-cream-dark transition-colors duration-300"
                        >
                            Read the Full Story
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                GALLERY — World of Tropland
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec3.ref as any} className="py-24 md:py-32 bg-brand-deep relative overflow-hidden">
                <CometBackground density={2} speed={0.6} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[250px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className={`text-center mb-16 ${sec3.fade()}`}>
                        <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-brand-accent mb-4">Visual World</p>
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">The World of <span className="italic text-brand-accent">Tropland</span></h2>
                        <p className="text-white/50 font-sans text-lg max-w-xl mx-auto">Visual development from the Tropland Universe, the world that began with Rockford T. Honeypot.</p>
                    </div>

                    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 ${sec3.fade()}`} style={{ transitionDelay: '100ms' }}>
                        {galleryImages.map((src, i) => (
                            <div key={i} className="group aspect-square rounded-2xl overflow-hidden glass border-white/10 hover:border-brand-accent/20 transition-all duration-500">
                                <img src={src} alt="Tropland Universe" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                CTA — Explore more
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec4.ref as any} className="py-20 md:py-28 bg-brand-deep relative overflow-hidden border-t border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/6 rounded-full blur-[200px] pointer-events-none ambient-glow"></div>

                <div className={`max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center ${sec4.fade()}`}>
                    <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-white leading-[0.95] mb-6">
                        Discover more of the <span className="italic text-brand-accent">Universe.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/joosh"
                            onClick={() => window.scrollTo(0, 0)}
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,93,58,0.4)]"
                        >
                            Joosh's Juice Bar
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => window.scrollTo(0, 0)}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-sans font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                        >
                            Partner With Us
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default RockfordPage;
