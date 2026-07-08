import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight, BookOpen, Heart, Leaf, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTag from '../components/fx/SectionTag';
import Reveal from '../components/fx/Reveal';
import MagneticButton from '../components/MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

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
    },
    {
        number: 'Book Two',
        src: '/images/jjb-02.png',
        title: 'The Tropland Tee-Off',
        tagline: "Children's · Adventure",
        url: 'https://www.amazon.com/gp/product/1500736082',
        description:
            'Joosh and friends take their adventures outdoors for a playful day of games, teamwork, and healthy choices. As challenges pop up across the course, the characters learn how good sportsmanship and supportive friendships can turn any day into a win.',
    },
    {
        number: 'Book Three',
        src: '/images/jjb-01.png',
        title: 'Snackbook Adventures',
        tagline: "Children's · Wellness",
        url: 'https://www.amazon.com/Jooshs-Juice-Bar-Snackbook-Adventure/dp/1539538818/',
        description:
            "The trilogy's final chapter expands the world through food-themed storytelling, bringing Tropland's characters into new moments centered on energy, balance, and everyday habits. With a mix of humor and heart, the story closes the series by reinforcing what Tropland does best.",
    },
    {
        number: 'Companion',
        src: '/images/jjb-04.png',
        title: 'Mandala Coloring Book',
        tagline: 'Activity · Companion',
        url: 'https://www.amazon.com/Jooshs-Juice-Bar-Coloring-Book/dp/0990927083',
        description:
            'A companion title inviting readers and families into the Tropland world through calming, character-inspired designs. Built for creative play and focus, it extends the Tropland Forest aesthetic into an interactive format that complements the original series.',
    },
];

const themes = [
    { icon: Heart, label: 'Health & Wellness', desc: 'Teaching healthy habits through joyful, character-driven storytelling' },
    { icon: Leaf, label: 'Nature & Curiosity', desc: 'Set within the Tropland Forest, a world built on wonder and discovery' },
    { icon: BookOpen, label: 'Original IP', desc: 'First introduced in 2013, before the Digital Animal Kingdom existed' },
    { icon: Star, label: 'Family-First', desc: 'Written for young readers but designed to resonate across generations' },
];

const heroStats = [
    { label: '4 Published Titles', sub: 'Trilogy + Companion' },
    { label: 'Founded 2013', sub: 'Tropland Origin IP' },
    { label: 'Tropland Forest', sub: 'Original Story World' },
];

const fannedBooks = [
    { src: '/images/jjb-03.png' },
    { src: '/images/jjb-01.png' },
    { src: '/images/jjb-02.png' },
];

// ─── Page ──────────────────────────────────────────────────────────────────
const JooshPage: React.FC = () => {
    return (
        <div className="bg-ink min-h-screen">
            <Helmet>
                <title>Joosh's Juice Bar Book Series | Tropland Universe</title>
                <meta name="description" content="The original Tropland Universe IP: a children's wellness book series established in 2013. 4 published titles by Josh Gottsegen." />
                <meta property="og:title" content="Joosh's Juice Bar Book Series | Tropland Universe" />
                <meta property="og:description" content="The original Tropland Universe IP: a children's wellness book series established in 2013. 4 published titles by Josh Gottsegen." />
                <meta property="og:url" content="https://troplanduniverse.com/joosh" />
            </Helmet>

            {/* ═══════════════════════════════════════════════════════════
                HERO
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
                <div className="absolute inset-0">
                    <motion.img
                        src="/images/joosh-hero.jpg"
                        alt="Joosh's Juice Bar · Tropland Universe"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 35%' }}
                        aria-hidden="true"
                        initial={{ scale: 1.06, filter: 'brightness(0.7)' }}
                        animate={{ scale: 1, filter: 'brightness(1)' }}
                        transition={{ duration: 2, ease }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10 pt-36 pb-16 md:pb-24 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Left: Text */}
                        <div className="lg:col-span-7">
                            {/* Category chips */}
                            <motion.div
                                className="flex flex-wrap items-center gap-3 mb-8"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.9, ease }}
                            >
                                <span className="px-4 py-2 border border-white/20 text-white/70 font-mono text-[10px] uppercase tracking-[0.18em]">
                                    Children's Book Series
                                </span>
                                <span className="px-4 py-2 bg-ember text-ink font-mono text-[10px] uppercase tracking-[0.18em]">
                                    Est. 2013
                                </span>
                            </motion.div>

                            {/* Title */}
                            <h1 className="mb-8 select-none">
                                <span className="block overflow-hidden">
                                    <motion.span
                                        className="block leading-[0.95] text-[12vw] md:text-[7vw] lg:text-[5.6vw]"
                                        initial={{ y: '108%' }}
                                        animate={{ y: 0 }}
                                        transition={{ delay: 0.3, duration: 1.1, ease }}
                                    >
                                        <span className="font-display font-extrabold uppercase text-white tracking-[-0.02em]">Joosh's Juice </span>
                                        <span className="font-edit italic font-light text-ember">Bar</span>
                                    </motion.span>
                                </span>
                            </h1>

                            <motion.div
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55, duration: 1, ease }}
                            >
                                <p className="font-display font-light text-lg md:text-xl text-white/75 leading-relaxed mb-5 max-w-xl">
                                    The original publishing IP of Tropland Universe™. A children's book series that started it all.
                                </p>
                                <p className="font-display font-light text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-xl">
                                    First introduced in 2013, Joosh's Juice Bar established the characters, tone, and values of the Tropland Universe, years before the Digital Animal Kingdom reached a billion views.
                                </p>
                            </motion.div>

                            {/* Stats ledger */}
                            <motion.div
                                className="grid grid-cols-3 border-t border-white/15 max-w-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 1 }}
                            >
                                {heroStats.map(({ label, sub }, i) => (
                                    <div key={label} className={`py-5 pr-4 ${i > 0 ? 'border-l border-white/10 pl-5' : ''}`}>
                                        <p className="font-display font-bold text-base md:text-lg text-white leading-tight">{label}</p>
                                        <p className="font-mono text-[10px] text-white/50 uppercase tracking-[0.18em] mt-1.5">{sub}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Fanned books */}
                        <motion.div
                            className="lg:col-span-5 flex justify-center lg:justify-end"
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1.1, ease }}
                        >
                            <div className="relative w-full max-w-md">
                                <div className="flex items-center justify-center py-8 min-h-[22rem] md:min-h-[26rem]">
                                    {fannedBooks.map((book, i) => {
                                        const isCenter = i === 1;
                                        return (
                                            <div
                                                key={book.src}
                                                className="flex-shrink-0 relative"
                                                style={{
                                                    width: '56%',
                                                    marginLeft: i === 0 ? '0' : '-27%',
                                                    zIndex: isCenter ? 10 : 5 - i,
                                                    transform: `rotate(${(i - 1) * 8}deg) translateY(${Math.abs(i - 1) * 14}px)`,
                                                }}
                                            >
                                                <div
                                                    className="overflow-hidden shadow-[0_24px_48px_rgba(12,11,9,0.6)] relative border border-white/10"
                                                    style={{ aspectRatio: '3/4' }}
                                                >
                                                    <img src={book.src} alt="Joosh's Juice Bar book" className="w-full h-full object-cover" loading="lazy" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                ORIGIN NARRATIVE
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-bone relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12">

                    <Reveal>
                        <SectionTag index="01" label="Where It All Began" dark={false} className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
                        <Reveal className="lg:col-span-7">
                            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-ink text-[10vw] md:text-[4.6vw]">
                                The original<br />
                                <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">Tropland</span> story.
                            </h2>
                        </Reveal>
                        <Reveal className="lg:col-span-5 flex flex-col justify-end" delay={0.15}>
                            <p className="font-display font-light text-lg md:text-xl text-ink/65 leading-relaxed max-w-md">
                                Joosh's Juice Bar is a children's book series created by Josh Gottsegen, the original narrative foundation of the Tropland Universe. First introduced in 2013, the series uses playful animal characters and imaginative storytelling to explore themes of health, curiosity, and positive habits.
                            </p>
                        </Reveal>
                    </div>

                    {/* Theme pillars */}
                    <Reveal delay={0.05}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink/12 border border-ink/12">
                            {themes.map(({ icon: Icon, label, desc }, i) => (
                                <div
                                    key={label}
                                    className="group p-7 md:p-8 bg-bone hover:bg-bone-dark/50 transition-colors duration-500"
                                >
                                    <div className="mb-7">
                                        <Icon size={18} className="text-ember-deep" />
                                    </div>
                                    <p className="font-display font-bold text-lg text-ink mb-2 tracking-tight">{label}</p>
                                    <p className="font-display font-light text-[15px] text-ink/55 leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                THE BOOKS
            ═══════════════════════════════════════════════════════════ */}
            <section id="books" className="py-24 md:py-36 bg-ink relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

                    <Reveal>
                        <SectionTag index="02" label="The Collection" className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
                        <Reveal className="lg:col-span-7">
                            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-bone text-[10vw] md:text-[4.6vw]">
                                Four books,<br />
                                <span className="font-edit italic font-light normal-case text-ember tracking-normal">one forest.</span>
                            </h2>
                        </Reveal>
                        <Reveal className="lg:col-span-5 flex flex-col justify-end" delay={0.15}>
                            <p className="font-display font-light text-lg md:text-xl text-bone/65 leading-relaxed max-w-md">
                                Written and produced by Josh Gottsegen, illustrated by Sehreen Shahzad. The foundational story world behind Tropland Universe.
                            </p>
                        </Reveal>
                    </div>

                    {/* Book ledger */}
                    <div className="border-t border-bone/12">
                        {books.map((book, i) => (
                            <Reveal key={book.title} delay={0.05}>
                                <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center py-10 md:py-14 border-b border-bone/12 hover:bg-bone/[0.03] transition-colors duration-500">

                                    {/* Cover */}
                                    <div className={`md:col-span-3 ${i % 2 !== 0 ? 'md:order-2 md:col-start-10' : ''}`}>
                                        <div className="tu-frame max-w-[200px] md:max-w-[220px] mx-auto md:mx-0 overflow-hidden border border-bone/10 shadow-[0_24px_48px_rgba(0,0,0,0.5)]" style={{ aspectRatio: '3/4' }}>
                                            <img src={book.src} alt={book.title} className="w-full h-full object-cover" loading="lazy" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className={`md:col-span-9 ${i % 2 !== 0 ? 'md:order-1 md:col-start-1' : ''}`}>
                                        <div className="flex flex-wrap items-center gap-3 mb-6">
                                            <span className="px-3.5 py-1.5 bg-ember text-ink font-mono text-[10px] uppercase tracking-[0.18em]">
                                                {book.number}
                                            </span>
                                            <span className="px-3.5 py-1.5 border border-bone/20 text-bone/60 font-mono text-[10px] uppercase tracking-[0.18em]">
                                                {book.tagline}
                                            </span>
                                        </div>

                                        <h3 className="font-display font-extrabold text-2xl md:text-[2.4rem] text-bone mb-5 leading-[1.05] tracking-tight">
                                            {book.title}
                                        </h3>

                                        <p className="font-display font-light text-[16px] md:text-[17px] text-bone/55 leading-relaxed mb-8 max-w-2xl">
                                            {book.description}
                                        </p>

                                        <a
                                            href={book.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn inline-flex items-center gap-3 px-7 py-3.5 border border-bone/25 text-bone font-display font-bold text-[14px] uppercase tracking-[0.08em] hover:border-ember hover:text-ember transition-colors duration-300"
                                        >
                                            View on Amazon
                                            <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                LICENSING / BRAND CTA
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-bone relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

                    <Reveal>
                        <SectionTag index="03" label="For Brands & Licensees" dark={false} className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                        <Reveal className="lg:col-span-7">
                            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-ink text-[10vw] md:text-[4.6vw] mb-8">
                                Licensing-ready{' '}
                                <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">IP.</span>
                            </h2>
                            <p className="font-display font-light text-lg md:text-xl text-ink/65 leading-relaxed max-w-xl">
                                Joosh's Juice Bar is part of the broader Tropland Universe IP, a publishing and media brand trusted by global partners.
                            </p>
                        </Reveal>
                        <Reveal className="lg:col-span-5 flex flex-col sm:flex-row sm:flex-wrap lg:justify-end gap-4" delay={0.12}>
                            <MagneticButton>
                                <Link
                                    to="/contact"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink text-bone font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-deep transition-colors duration-300 whitespace-nowrap"
                                >
                                    Partner With Us
                                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    to="/rockford"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-ink/25 text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:border-ember-deep hover:text-ember-deep transition-colors duration-300 whitespace-nowrap"
                                >
                                    Rockford T. Honeypot
                                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </MagneticButton>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FOOTER CTA
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-32 bg-ink-2 relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

                    <Reveal>
                        <SectionTag index="04" label="The Digital Animal Kingdom" className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                        <Reveal className="lg:col-span-7">
                            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-bone text-[9.5vw] md:text-[4.2vw] mb-8">
                                Explore the rest<br />
                                of the{' '}
                                <span className="font-edit italic font-light normal-case text-ember tracking-normal">Universe.</span>
                            </h2>
                            <p className="font-display font-light text-lg text-bone/60 leading-relaxed max-w-xl">
                                From a children's juice bar in 2013 to 1.5 billion content views worldwide. The Tropland Universe keeps growing.
                            </p>
                        </Reveal>
                        <Reveal className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-4" delay={0.12}>
                            <MagneticButton>
                                <Link
                                    to="/"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ember text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-300"
                                >
                                    Back to Home
                                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    to="/contact"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-bone/25 text-bone font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:border-ember hover:text-ember transition-colors duration-300"
                                >
                                    Partner With Us
                                </Link>
                            </MagneticButton>
                        </Reveal>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default JooshPage;
