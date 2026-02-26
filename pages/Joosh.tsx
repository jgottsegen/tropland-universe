import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CometBackground from '../components/CometBackground';
import TextReveal from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';

const books = [
    { src: '/images/jjb-01.png', title: 'Snackbook Adventures', genre: "Children's / Wellness", url: 'https://www.amazon.com/Jooshs-Juice-Bar-Snackbook-Adventure/dp/1539538818/' },
    { src: '/images/jjb-02.png', title: 'The Tropland Tee-Off', genre: "Children's / Adventure", url: 'https://www.amazon.com/gp/product/1500736082' },
    { src: '/images/jjb-03.png', title: 'Banana Berry Adventures', genre: "Children's / Wellness", url: 'https://www.amazon.com/Jooshs-Juice-Bar-Banana-Adventure/dp/1493546848' },
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

const JooshPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { const t = setTimeout(() => setLoaded(true), 200); return () => clearTimeout(t); }, []);

    const sec2 = useFadeIn();
    const sec3 = useFadeIn();

    const heroFade = () =>
        `transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

    return (
        <div className="bg-brand-deep min-h-screen">

            {/* ═══════════════════════════════════════════════════════════
                HERO — Cinematic full-bleed series intro
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: '640px' }}>
                <CometBackground density={3} speed={0.9} />

                {/* Hero backdrop */}
                <div className="absolute inset-0">
                    <img
                        src="https://troplanduniverse.com/wp-content/uploads/2025/10/jag-shaka-1.png"
                        alt="Joosh's Juice Bar – Tropland Universe"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 30%' }}
                    />
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #0D0A1A 0%, rgba(13,10,26,0.55) 35%, rgba(13,10,26,0.15) 70%, transparent 100%)' }} />
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(13,10,26,0.8) 0%, rgba(13,10,26,0.25) 55%, transparent 100%)' }} />

                {/* Text anchored to bottom-left */}
                <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-14 md:pb-20">
                        <p className={`text-xs font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5 ${heroFade()}`}
                            style={{ transitionDelay: '200ms' }}>
                            The Original Series
                        </p>
                        <h1>
                            <TextReveal
                                className="block font-serif leading-[0.88] tracking-tight text-white"
                                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
                                delay={0.4}
                                wordDelay={0.12}
                            >
                                Joosh's Juice
                            </TextReveal>
                            <TextReveal
                                className="block font-serif italic leading-[0.88] tracking-tight text-brand-accent"
                                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
                                delay={0.58}
                                wordDelay={0.12}
                            >
                                Bar.
                            </TextReveal>
                        </h1>
                        <p className={`mt-8 text-base md:text-lg text-white/60 font-sans font-light leading-relaxed max-w-sm ${heroFade()}`}
                            style={{ transitionDelay: '700ms' }}>
                            A vibrant children's book series blending wellness, friendship, and adventure.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                THE FOUNDATION — Origin narrative
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec2.ref as any} className="py-24 md:py-32 bg-brand-cream text-brand-dark-text relative overflow-hidden cream-texture">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
                    <div className={sec2.fade()} style={{ transitionDelay: '0ms' }}>
                        <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-brand-accent mb-5">Where It All Began</p>
                    </div>

                    <h2 className={`font-serif text-4xl md:text-5xl tracking-tight leading-[1.05] mb-8 ${sec2.fade()}`} style={{ transitionDelay: '80ms' }}>
                        The foundation of <span className="italic text-brand-accent">everything.</span>
                    </h2>

                    <p className={`text-xl text-brand-muted-light font-sans font-light leading-relaxed mb-6 ${sec2.fade()}`} style={{ transitionDelay: '160ms' }}>
                        Before the billion views, before the global audience, before the Digital Animal Kingdom, there was a juice bar in the forest. Written, illustrated, and produced by Josh Gottsegen, the Joosh's Juice Bar series introduced the original cast of Tropland characters and the themes of curiosity, health, and imagination that still drive the brand today.
                    </p>

                    <div className={`pl-8 border-l-4 border-brand-accent/40 text-left max-w-xl mx-auto ${sec2.fade()}`} style={{ transitionDelay: '250ms' }}>
                        <p className="text-xl md:text-2xl font-serif italic text-brand-dark-text/80 leading-snug">
                            "Every universe starts with a single story."
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                THE BOOKS — Premium book cards
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec3.ref as any} className="py-24 md:py-32 bg-brand-deep relative overflow-hidden">
                <CometBackground density={2} speed={0.6} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[250px] pointer-events-none ambient-glow"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className={`text-center mb-16 ${sec3.fade()}`}>
                        <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-brand-accent mb-4">The Collection</p>
                        <h2 className="font-serif text-4xl md:text-5xl text-white">Three books, one <span className="italic text-brand-accent">world.</span></h2>
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16 ${sec3.fade()}`} style={{ transitionDelay: '100ms' }}>
                        {books.map((book, i) => (
                            <a
                                key={book.title}
                                href={book.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center"
                                style={{ transitionDelay: `${(i + 2) * 100}ms` }}
                            >
                                <div className="relative w-full mb-6">
                                    <div className="absolute -inset-2 rounded-2xl bg-brand-accent/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="book-cover">
                                        <div className="book-inner relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-brand-accent/30 transition-all duration-500">
                                            <img src={book.src} alt={book.title} className="w-full h-full object-cover" loading="lazy" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                                <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                    View Book <ArrowUpRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-serif text-2xl text-white group-hover:text-brand-accent transition-colors leading-tight mb-2 text-center">
                                    {book.title}
                                </h3>
                                <p className="text-sm font-sans font-semibold text-white/60 uppercase tracking-widest text-center">
                                    {book.genre}
                                </p>
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className={`text-center pt-8 border-t border-white/5 ${sec3.fade()}`} style={{ transitionDelay: '400ms' }}>
                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">
                            Explore the rest of the <span className="italic text-brand-accent">Universe.</span>
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <MagneticButton>
                                <Link
                                    to="/rockford"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,93,58,0.4)]"
                                >
                                    Rockford T. Honeypot
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    to="/contact"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-sans font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                                >
                                    Partner With Us
                                </Link>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default JooshPage;
