import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, ArrowRight, BookOpen, Heart, Leaf, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import CometBackground from '../components/CometBackground';
import TextReveal from '../components/TextReveal';

// ─── Book data ─────────────────────────────────────────────────────────────
const books = [
    {
        number: 'Book One',
        src: '/images/jjb-03.png',
        title: 'The Blue Banana Berry Adventures',
        tagline: "Children's · Wellness",
        url: 'https://www.amazon.com/Jooshs-Juice-Bar-Banana-Adventure/dp/1493546848',
        description:
            'The first title in the series introduces readers to the Tropland Forest and its colorful cast of characters, setting the tone for a story world centered on imagination, kindness, and healthy choices.',
        accent: 'rgba(232,93,58,0.25)',
    },
    {
        number: 'Book Two',
        src: '/images/jjb-02.png',
        title: 'The Tropland Tee-Off',
        tagline: "Children's · Adventure",
        url: 'https://www.amazon.com/gp/product/1500736082',
        description:
            'Joosh and friends take their adventures outdoors for a playful day of games, teamwork, and healthy choices. As challenges pop up across the course, the characters learn how good sportsmanship and supportive friendships can turn any day into a win.',
        accent: 'rgba(120,80,200,0.25)',
    },
    {
        number: 'Book Three',
        src: '/images/jjb-01.png',
        title: 'Snackbook Adventures',
        tagline: "Children's · Wellness",
        url: 'https://www.amazon.com/Jooshs-Juice-Bar-Snackbook-Adventure/dp/1539538818/',
        description:
            "The trilogy's final chapter expands the world through food-themed storytelling, bringing Tropland's characters into new moments centered on energy, balance, and everyday habits. With a mix of humor and heart, the story closes the series by reinforcing what Tropland does best.",
        accent: 'rgba(50,180,120,0.22)',
    },
    {
        number: 'Companion',
        src: '/images/jjb-04.png',
        title: 'Mandala Coloring Book',
        tagline: 'Activity · Companion',
        url: 'https://www.amazon.com/Jooshs-Juice-Bar-Coloring-Book/dp/0990927083',
        description:
            'A companion title inviting readers and families into the Tropland world through calming, character-inspired designs. Built for creative play and focus, it extends the Tropland Forest aesthetic into an interactive format that complements the original series.',
        accent: 'rgba(232,93,58,0.22)',
    },
];

const themes = [
    { icon: Heart, label: 'Health & Wellness', desc: 'Teaching healthy habits through joyful, character-driven storytelling' },
    { icon: Leaf, label: 'Nature & Curiosity', desc: 'Set within the Tropland Forest, a world built on wonder and discovery' },
    { icon: BookOpen, label: 'Original IP', desc: 'First introduced in 2013, before the Digital Animal Kingdom existed' },
    { icon: Star, label: 'Family-First', desc: 'Written for young readers but designed to resonate across generations' },
];


// ─── Utility hook ──────────────────────────────────────────────────────────
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

// ─── Page ──────────────────────────────────────────────────────────────────
const JooshPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { const t = setTimeout(() => setLoaded(true), 200); return () => clearTimeout(t); }, []);

    const sec2 = useFadeIn();
    const sec3 = useFadeIn();
    const sec4 = useFadeIn();
    const sec5 = useFadeIn();

    const heroFade = () =>
        `transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

    return (
        <div className="bg-brand-deep min-h-screen">
            <Helmet>
                <title>Joosh's Juice Bar Book Series | Tropland Universe</title>
                <meta name="description" content="The original Tropland Universe IP — a children's wellness book series established in 2013. 4 published titles by Josh Gottsegen." />
                <meta property="og:title" content="Joosh's Juice Bar Book Series | Tropland Universe" />
                <meta property="og:description" content="The original Tropland Universe IP — a children's wellness book series established in 2013. 4 published titles by Josh Gottsegen." />
                <meta property="og:url" content="https://troplanduniverse.com/joosh" />
            </Helmet>

            {/* ═══════════════════════════════════════════════════════════
                HERO — Full-bleed cinematic
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <CometBackground density={3} speed={0.8} />

                {/* Hero backdrop */}
                <div className="absolute inset-0">
                    <img
                        src="/images/joosh-hero.jpg"
                        alt="Joosh's Juice Bar — Tropland Universe"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 35%' }}
                        aria-hidden="true"
                    />
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(13,10,26,0.97) 0%, rgba(13,10,26,0.82) 42%, rgba(13,10,26,0.45) 100%)' }} />
                <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(232,93,58,0.08) 0%, transparent 65%)' }} />
                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-accent/6 rounded-full blur-[200px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-purple/15 rounded-full blur-[180px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-36 md:pt-36 pb-16 md:pb-24 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left: Text */}
                        <div>
                            {/* Category badges */}
                            <div className={`flex flex-wrap items-center gap-3 mb-8 ${heroFade()}`} style={{ transitionDelay: '200ms' }}>
                                <span className="font-sans font-semibold uppercase tracking-wider text-sm px-5 py-2.5 rounded-full border border-white/15 text-white/80 bg-white/5">
                                    Children's Book Series
                                </span>
                                <span className="font-sans font-semibold uppercase tracking-wider text-sm px-5 py-2.5 rounded-full border border-brand-accent/20 text-brand-accent bg-brand-accent/10">
                                    Est. 2013
                                </span>
                            </div>

                            {/* Title — one line, no period */}
                            <h1 className={`font-serif leading-[0.95] tracking-tight mb-8 ${heroFade()}`}
                                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', transitionDelay: '320ms', whiteSpace: 'nowrap' }}>
                                <TextReveal className="text-white inline" delay={0.4} wordDelay={0.06}>
                                    Joosh's
                                </TextReveal>
                                {' '}
                                <TextReveal className="text-white inline" delay={0.52} wordDelay={0.06}>
                                    Juice
                                </TextReveal>
                                {' '}
                                <TextReveal className="italic text-brand-accent inline" delay={0.64} wordDelay={0.06}>
                                    Bar
                                </TextReveal>
                            </h1>

                            <p className={`text-xl text-white/70 font-sans leading-relaxed mb-5 max-w-xl ${heroFade()}`} style={{ transitionDelay: '600ms' }}>
                                The original publishing IP of Tropland Universe. A children's book series that started it all.
                            </p>
                            <p className={`text-xl text-white/70 font-sans leading-relaxed mb-8 max-w-xl ${heroFade()}`} style={{ transitionDelay: '680ms' }}>
                                First introduced in 2013, Joosh's Juice Bar established the characters, tone, and values of the Tropland Universe, years before the Digital Animal Kingdom reached a billion views.
                            </p>

                            {/* Stats — larger, more readable */}
                            <div className={`flex flex-wrap gap-10 mb-12 ${heroFade()}`} style={{ transitionDelay: '740ms' }}>
                                {[
                                    { icon: BookOpen, label: '4 Published Titles', sub: 'Trilogy + Companion' },
                                    { icon: Star, label: 'Founded 2013', sub: 'Tropland Origin IP' },
                                    { icon: Leaf, label: 'Tropland Forest', sub: 'Original Story World' },
                                ].map(({ icon: Icon, label, sub }) => (
                                    <div key={label} className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-brand-accent/15 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                                            <Icon size={24} className="text-brand-accent" />
                                        </div>
                                        <div>
                                            <p className="text-white font-sans font-bold text-xl leading-tight">{label}</p>
                                            <p className="text-white/65 font-sans font-medium text-base mt-1">{sub}</p>

                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Right: Fanned books — enlarged */}
                        <div className={`flex justify-center lg:justify-end ${heroFade()}`} style={{ transitionDelay: '300ms' }}>
                            <div className="relative w-full max-w-lg">
                                <div className="absolute -inset-16 rounded-3xl bg-brand-accent/30 blur-[90px] opacity-55 pointer-events-none" />
                                <div className="absolute -inset-8 rounded-3xl bg-brand-purple/20 blur-3xl opacity-40 pointer-events-none" />

                                <div className="relative flex items-end justify-center" style={{ height: '560px' }}>
                                    {[
                                        { src: '/images/jjb-03.png', rotate: '-16deg', x: '-65px', z: 1 },
                                        { src: '/images/jjb-01.png', rotate: '0deg', x: '0px', z: 3 },
                                        { src: '/images/jjb-02.png', rotate: '16deg', x: '65px', z: 2 },
                                    ].map((b, i) => (
                                        <div
                                            key={i}
                                            className="absolute bottom-0 rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.85)] border border-white/10 hover:z-50 transition-all duration-500"
                                            style={{
                                                width: '72%',
                                                aspectRatio: '3/4',
                                                transform: `rotate(${b.rotate}) translateX(${b.x})`,
                                                zIndex: b.z,
                                                transformOrigin: 'center bottom',
                                            }}
                                            onMouseEnter={e => {
                                                const el = e.currentTarget;
                                                el.style.transform = `rotate(0deg) translateX(${b.x}) translateY(-30px) scale(1.1)`;
                                                el.style.boxShadow = '0 80px 120px rgba(0,0,0,0.95), 0 0 60px rgba(232,93,58,0.3)';
                                                el.style.zIndex = '50';
                                                el.style.borderColor = 'rgba(232,93,58,0.4)';
                                            }}
                                            onMouseLeave={e => {
                                                const el = e.currentTarget;
                                                el.style.transform = `rotate(${b.rotate}) translateX(${b.x})`;
                                                el.style.boxShadow = '';
                                                el.style.zIndex = String(b.z);
                                                el.style.borderColor = '';
                                            }}
                                        >
                                            <img src={b.src} alt="Joosh's Juice Bar book" className="w-full h-full object-cover" loading="lazy" />
                                            <div className="absolute inset-0 pointer-events-none"
                                                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                ORIGIN NARRATIVE — Cream editorial
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec2.ref as any} className="py-24 md:py-36 bg-brand-cream text-brand-dark-text relative overflow-hidden cream-texture">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">

                    <p className={`text-sm font-sans font-bold uppercase tracking-[0.25em] text-brand-accent mb-8 ${sec2.fade()}`}>
                        Where It All Began
                    </p>

                    <h2 className={`font-serif mb-12 leading-tight text-brand-dark-text ${sec2.fade()}`}
                        style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', transitionDelay: '80ms' }}>
                        The original <span className="italic text-brand-accent">Tropland</span> story.
                    </h2>

                    <div className={`space-y-8 ${sec2.fade()}`} style={{ transitionDelay: '160ms' }}>
                        <p className="text-xl md:text-2xl text-brand-dark-text/80 font-sans leading-relaxed max-w-3xl mx-auto">
                            Joosh's Juice Bar is a children's book series created by Josh Gottsegen, the original narrative foundation of the Tropland Universe. First introduced in 2013, the series uses playful animal characters and imaginative storytelling to explore themes of health, curiosity, and positive habits.
                        </p>
                    </div>

                    {/* Theme pillars — enlarged text */}
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-brand-border-light ${sec2.fade()}`} style={{ transitionDelay: '280ms' }}>
                        {themes.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="text-left group">
                                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/15 flex items-center justify-center mb-5 group-hover:bg-brand-accent/20 transition-colors duration-300">
                                    <Icon size={22} className="text-brand-accent" />
                                </div>
                                <p className="font-sans font-bold text-lg text-brand-dark-text mb-2">{label}</p>
                                <p className="font-sans text-base text-brand-muted leading-snug">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                THE BOOKS — Individual cards with 3D tilt covers
            ═══════════════════════════════════════════════════════════ */}
            <section id="books" ref={sec3.ref as any} className="py-24 md:py-36 bg-brand-deep relative overflow-hidden">
                <CometBackground density={2} speed={0.5} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-purple/10 rounded-full blur-[300px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                    <div className={`mb-16 ${sec3.fade()}`}>
                        <p className="text-sm font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5">
                            The Collection
                        </p>
                        <h2 className="font-serif tracking-tight leading-[1.05] text-white" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                            Four books, <span className="italic text-brand-accent">one forest.</span>
                        </h2>
                        <p className="text-xl text-white/60 font-sans mt-5 max-w-2xl leading-relaxed">
                            Written and produced by Josh Gottsegen, illustrated by Sehreen Shahzad. The foundational story world behind Tropland Universe.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {books.map((book, i) => (
                            <div
                                key={book.title}
                                className={`group glass border-shine rounded-3xl p-8 md:p-10 hover:border-brand-accent/20 transition-all duration-500 ${sec3.fade()}`}
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
                                    {/* Book cover */}
                                    <div className={`md:col-span-2 flex justify-center ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                                        <div className="relative max-w-[180px] w-full mx-auto">
                                            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_80px_-10px_rgba(0,0,0,0.8)]" style={{ aspectRatio: '3/4' }}>
                                                <img src={book.src} alt={book.title} className="w-full h-full object-cover" loading="lazy" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className={`md:col-span-3 ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                                        <div className="flex flex-wrap items-center gap-3 mb-6">
                                            <span className="font-sans font-bold uppercase tracking-[0.2em] text-sm px-4 py-2 rounded-full border border-brand-accent/25 text-brand-accent bg-brand-accent/10">
                                                {book.number}
                                            </span>
                                            <span className="font-sans font-semibold uppercase tracking-wider text-sm px-4 py-2 rounded-full border border-white/15 text-white/65 bg-white/5">
                                                {book.tagline}
                                            </span>
                                        </div>

                                        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                                            {book.title}
                                        </h3>

                                        <p className="text-white/65 font-sans text-xl leading-relaxed mb-8 max-w-lg">
                                            {book.description}
                                        </p>

                                        <a
                                            href={book.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-lg hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,93,58,0.4)]"
                                        >
                                            View on Amazon
                                            <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                LICENSING / BRAND CTA
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec4.ref as any} className="py-24 md:py-36 bg-brand-cream text-brand-dark-text relative overflow-hidden cream-texture">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">

                    <p className={`text-sm font-sans font-bold uppercase tracking-[0.25em] text-brand-accent mb-8 ${sec4.fade()}`}>
                        For Brands &amp; Licensees
                    </p>

                    <h2 className={`font-serif mb-10 leading-tight ${sec4.fade()}`}
                        style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', transitionDelay: '80ms' }}>
                        Licensing-ready <span className="italic text-brand-accent">IP.</span>
                    </h2>

                    <div className={`space-y-6 text-xl md:text-2xl text-brand-dark-text/80 font-sans leading-relaxed mb-14 ${sec4.fade()}`} style={{ transitionDelay: '160ms' }}>
                        <p>
                            Joosh's Juice Bar is part of the broader Tropland Universe IP, a publishing and media brand trusted by global partners.
                        </p>
                    </div>

                    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${sec4.fade()}`} style={{ transitionDelay: '280ms' }}>
                        <Link
                            to="/contact"
                            onClick={() => window.scrollTo(0, 0)}
                            className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-brand-accent text-white font-sans font-semibold text-lg hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,93,58,0.4)]"
                        >
                            Partner With Us
                            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                        <Link
                            to="/rockford"
                            onClick={() => window.scrollTo(0, 0)}
                            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border border-brand-border text-brand-dark-text font-sans font-semibold text-lg hover:opacity-80 transition-all duration-300"
                        >
                            Rockford T. Honeypot
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FOOTER CTA
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec5.ref as any} className="py-20 md:py-28 bg-brand-deep text-white relative overflow-hidden">
                <CometBackground density={2} speed={0.5} />
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                    <div className={sec5.fade()}>
                        <p className="font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-6 text-sm">
                            The Digital Animal Kingdom
                        </p>
                        <h2 className="font-serif leading-[1.05] tracking-tight mb-8 text-white"
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                            Explore the rest of the <span className="italic text-brand-accent">Universe.</span>
                        </h2>
                        <p className="text-white/55 font-sans text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                            From a children's juice bar in 2013 to over a billion content views worldwide. The Tropland Universe keeps growing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                onClick={() => window.scrollTo(0, 0)}
                                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-lg hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,93,58,0.4)]"
                            >
                                Back to Home
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/contact"
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-sans font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                            >
                                Partner With Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default JooshPage;

