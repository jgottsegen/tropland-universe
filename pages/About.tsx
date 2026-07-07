import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import SectionTag from '../components/fx/SectionTag';
import Reveal from '../components/fx/Reveal';
import MagneticButton from '../components/MagneticButton';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ease = [0.16, 1, 0.3, 1] as const;

const inputClass =
    'w-full bg-transparent border-b border-bone/20 px-0 py-4 text-bone font-display text-lg placeholder-bone/30 focus:outline-none focus:border-ember transition-colors duration-300';

const chapters = [
    { year: '2013', label: 'Books & Print', active: true },
    { year: '2022', label: 'Digital Era', active: false },
    { year: '2026', label: 'The Kingdom', active: false },
];

const chapterBooks = [
    { src: '/images/jjb-01.png', alt: "Joosh's Juice Bar: Blue Banana Berry" },
    { src: '/images/jjb-02.png', alt: "Joosh's Juice Bar: Snack Book" },
    { src: '/images/jjb-03.png', alt: "Joosh's Juice Bar: Tee Off" },
    { src: '/images/rth.png', alt: 'Rockford T. Honeypot' },
];

const AboutPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, source: 'About Page' }),
            });
            if (res.ok) {
                setFormStatus('success');
                setName(''); setEmail(''); setMessage('');
            } else {
                setFormStatus('error');
            }
        } catch {
            setFormStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-ink">
            <Helmet>
                <title>About Tropland Universe</title>
                <meta name="description" content="The story behind Tropland Universe: 13 years of original IP, from children's books to a global digital wildlife brand." />
                <meta property="og:title" content="About Tropland Universe" />
                <meta property="og:description" content="The story behind Tropland Universe: 13 years of original IP, from children's books to a global digital wildlife brand." />
                <meta property="og:url" content="https://troplanduniverse.com/about" />
            </Helmet>

            {/* ═══════════════════════════════════════════════════════════
                HERO
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative flex flex-col justify-end overflow-hidden bg-ink" style={{ minHeight: '92svh' }}>
                <div className="absolute inset-0">
                    <motion.img
                        src="/images/about-hero.png"
                        alt="Tropland Universe"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 15%' }}
                        initial={{ scale: 1.06, filter: 'brightness(0.7)' }}
                        animate={{ scale: 1, filter: 'brightness(1)' }}
                        transition={{ duration: 2, ease }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-transparent to-transparent" />

                <div className="relative z-10 max-w-[1480px] mx-auto px-6 md:px-12 w-full pb-14 md:pb-20 pt-36 md:pt-44">
                    <motion.div
                        className="flex items-center gap-4 mb-7"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.9, ease }}
                    >
                                      <span className="font-mono text-[11px] md:text-xs tracking-[0.32em] uppercase text-ember">
                            Est. 2013 · Los Angeles
                        </span>
                    </motion.div>

                    <h1 className="mb-7 select-none">
                        <span className="block overflow-hidden">
                            <motion.span
                                className="block font-display font-extrabold uppercase text-white tracking-[-0.02em] leading-[0.9] text-[13vw] md:text-[8.5vw] lg:text-[7.5vw]"
                                initial={{ y: '108%' }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.3, duration: 1.1, ease }}
                            >
                                The Story
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden">
                            <motion.span
                                className="block font-edit italic font-light text-ember leading-[1.02] text-[11vw] md:text-[7vw] lg:text-[6.2vw]"
                                initial={{ y: '108%' }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.45, duration: 1.1, ease }}
                            >
                                Behind It All.
                            </motion.span>
                        </span>
                    </h1>

                    <motion.p
                        className="text-lg md:text-xl text-white/75 font-display font-light leading-snug max-w-sm"
                        style={{ textShadow: '0 1px 10px rgba(0,0,0,0.45)' }}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 1, ease }}
                    >
                        A world that began in a rainforest and grew into a kingdom.
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                THE MYTHOLOGY
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-bone relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12">

                    <Reveal>
                        <SectionTag index="01" label="The Mythology" dark={false} className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-7">
                            <Reveal>
                                <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-ink mb-12 text-[9.5vw] md:text-[4.2vw]">
                                    "Every great kingdom<br />
                                    begins with a{' '}
                                    <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">forest.</span>"
                                </h2>
                            </Reveal>

                            <Reveal delay={0.1}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
                                    <p className="font-display font-light text-[17px] md:text-lg text-ink/70 leading-relaxed">
                                        Tropland Universe™ is a character-driven wildlife media property unlike anything else in digital entertainment. Founded on original storytelling, it has grown from a children's book series into one of the most-followed AI content properties on earth.
                                    </p>
                                    <p className="font-display font-light text-[17px] md:text-lg text-ink/70 leading-relaxed">
                                        The Tropland Rainforest is not a location. It is a mythology: populated by characters with depth, humor, and wonder, rendered in a cinematic visual language that is wholly its own. What lives here cannot be replicated.
                                    </p>
                                </div>
                            </Reveal>
                        </div>

                        <Reveal className="lg:col-span-5" delay={0.15}>
                            <div className="relative max-w-[420px] mx-auto lg:ml-auto lg:mr-0">
                                <div className="tu-frame tu-ticks text-ink/50 relative overflow-hidden border border-ink/10" style={{ aspectRatio: '4/5' }}>
                                    <img
                                        src="/images/trop-forest.png"
                                        alt="The Tropland Rainforest"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                THE ORIGIN
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-ink relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

                    <Reveal>
                        <SectionTag index="02" label="Origin" className="mb-12 md:mb-16" />
                    </Reveal>

                    <Reveal>
                        <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-bone mb-14 md:mb-20 text-[10vw] md:text-[4.6vw]">
                            How a rainforest<br />
                            became a{' '}
                            <span className="font-edit italic font-light normal-case text-ember tracking-normal">kingdom.</span>
                        </h2>
                    </Reveal>

                    {/* The Three Chapters */}
                    <Reveal delay={0.05}>
                        <div className="mb-12 md:mb-16">
                            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-bone/40 mb-4">The Three Chapters</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 border border-bone/12">
                                {chapters.map((ch, i) => (
                                    <div
                                        key={ch.year}
                                        className={`px-6 py-5 md:py-6 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-bone/12' : ''} ${ch.active ? 'bg-bone/[0.04]' : ''}`}
                                    >
                                        <p className="font-display font-extrabold text-2xl md:text-3xl text-ember leading-none mb-2">{ch.year}</p>
                                        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/45">{ch.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Chapter I — full-width split */}
                    <Reveal delay={0.05}>
                        <div className="border border-bone/12 mb-4 md:mb-5">
                            <div className="grid grid-cols-1 md:grid-cols-2">

                                {/* Books */}
                                <div className="relative bg-ink-2 p-5 md:p-8 pb-12 md:pb-14 border-b md:border-b-0 md:border-r border-bone/12">
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        {chapterBooks.map((book) => (
                                            <div key={book.src} className="tu-frame overflow-hidden" style={{ aspectRatio: '3/4' }}>
                                                <img src={book.src} alt={book.alt} className="w-full h-full object-cover" loading="lazy" />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="absolute bottom-4 inset-x-0 text-center font-mono text-[10px] tracking-[0.28em] uppercase text-bone/40">
                                        Four Original Volumes · 2013–2016
                                    </p>
                                </div>

                                {/* Text */}
                                <div className="p-7 md:p-12 flex flex-col justify-center tu-ticks text-bone/35 relative">
                                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ember mb-3">
                                        Chapter I · Series Origin
                                    </span>
                                    <p className="font-display font-extrabold text-bone leading-none mb-8 text-5xl md:text-[4.5rem]">
                                        2013
                                    </p>
                                    <h3 className="font-display font-bold text-2xl md:text-[1.9rem] text-bone leading-[1.1] tracking-tight mb-5">
                                        The World Was<br />
                                        <span className="font-edit italic font-light text-ember">Written First.</span>
                                    </h3>
                                    <p className="font-display font-light text-[15px] md:text-base text-bone/55 leading-relaxed max-w-lg">
                                        It started with a rainforest and a story. The Joosh's Juice Bar series launched the Tropland mythology across three illustrated volumes plus a coloring book: original characters, original world, built from scratch. <span className="text-bone/85 font-medium">The Adventures of Rockford T. Honeypot</span> followed in 2016, an Amazon #1 bestselling novel that deepened the ecosystem. In <span className="text-ember font-medium">2022</span>, Tropland went AI-native. By <span className="text-ember font-medium">2026</span>, it became the Digital Animal Kingdom.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Chapters II + III */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {[
                            {
                                chapter: 'Chapter II',
                                year: '2022',
                                src: '/images/chapter2.png',
                                alt: 'Digital Evolution – Tropland Universe',
                                title: 'Digital Evolution',
                                body: 'Tropland goes AI-native. The characters find a new cinematic visual language, reaching millions daily across every major platform.',
                            },
                            {
                                chapter: 'Chapter III',
                                year: '2026',
                                src: '/images/chapter3.png',
                                alt: 'The Kingdom – Tropland Universe',
                                title: 'The Kingdom',
                                body: 'Over a billion views. Licensed by All-American Licensing. Major brand partnerships. The rainforest becomes the Digital Animal Kingdom.',
                            },
                        ].map((ch, i) => (
                            <Reveal key={ch.year} delay={0.05 + i * 0.08}>
                                <div className="border border-bone/12 p-7 md:p-8 h-full flex flex-col hover:bg-bone/[0.03] transition-colors duration-500">
                                    <div className="flex items-baseline justify-between mb-6">
                                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/45">{ch.chapter}</span>
                                        <span className="font-display font-extrabold text-2xl md:text-3xl text-ember leading-none">{ch.year}</span>
                                    </div>
                                    <div className="tu-frame overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
                                        <img
                                            src={ch.src}
                                            alt={ch.alt}
                                            className="w-full h-full object-cover"
                                            style={{ objectPosition: 'center 20%' }}
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="font-display font-bold text-xl md:text-2xl text-bone tracking-tight mb-3">
                                        {ch.title}
                                    </h3>
                                    <p className="font-display font-light text-[15px] text-bone/55 leading-relaxed">
                                        {ch.body}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SOCIAL PRESENCE
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-bone border-t border-ink/10">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12">
                    <Reveal>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                            <div>
                                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-ember-deep mb-5">
                                    Follow the Kingdom
                                </p>
                                <h3 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[1] text-ink text-3xl md:text-[2.8rem] mb-4">
                                    The world of Tropland{' '}
                                    <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">lives on social.</span>
                                </h3>
                                <p className="font-display font-light text-lg text-ink/60 max-w-md">
                                    Over a billion content views. Follow the journey on Instagram and Facebook.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 flex-shrink-0">
                                <a
                                    href="https://instagram.com/troplanduniverse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-7 py-4 border border-ink/20 text-ink font-display font-bold text-[14px] uppercase tracking-[0.08em] hover:border-ember-deep hover:text-ember-deep transition-colors duration-300"
                                >
                                    <Instagram size={15} />
                                    Instagram
                                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                                <a
                                    href="https://facebook.com/troplanduniverse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-7 py-4 border border-ink/20 text-ink font-display font-bold text-[14px] uppercase tracking-[0.08em] hover:border-ember-deep hover:text-ember-deep transition-colors duration-300"
                                >
                                    <Facebook size={15} />
                                    Facebook
                                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                THE INVITATION
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-ink-2 relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

                    <Reveal>
                        <SectionTag index="03" label="Enter the Kingdom" className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Left: invitation copy */}
                        <div className="lg:col-span-5">
                            <Reveal>
                                <h2 className="font-display font-extrabold text-[11vw] md:text-[4.4vw] leading-[0.95] tracking-[-0.02em] text-bone uppercase mb-8">
                                    Build with<br />
                                    <span className="font-edit italic font-light normal-case text-ember tracking-normal">Tropland.</span>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <p className="font-display font-light text-lg text-bone/60 leading-relaxed max-w-sm mb-10">
                                    For licensing inquiries, brand partnerships, and creative collaboration.
                                </p>
                                <div className="space-y-4">
                                    {['Brand partnerships', 'Character licensing', 'Content distribution'].map((item) => (
                                        <div key={item} className="flex items-center gap-4 font-mono text-[12px] tracking-[0.18em] uppercase text-bone/55">
                                            <span className="w-1.5 h-1.5 bg-ember shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* Right: form */}
                        <div className="lg:col-span-7">
                            {formStatus === 'success' ? (
                                <Reveal>
                                    <div className="border border-bone/15 p-12 text-center">
                                        <CheckCircle size={44} className="text-ember mx-auto mb-5" />
                                        <h3 className="font-display font-bold text-2xl text-bone mb-2">Message received.</h3>
                                        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/45">
                                            We'll be in touch shortly
                                        </p>
                                    </div>
                                </Reveal>
                            ) : (
                                <Reveal delay={0.15}>
                                    <form onSubmit={handleSubmit} className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div>
                                                <label className="block font-mono text-[10px] tracking-[0.22em] uppercase text-bone/45 mb-1">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className={inputClass}
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-mono text-[10px] tracking-[0.22em] uppercase text-bone/45 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={inputClass}
                                                    placeholder="Your email"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-mono text-[10px] tracking-[0.22em] uppercase text-bone/45 mb-1">
                                                Message
                                            </label>
                                            <textarea
                                                required
                                                rows={5}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className={`${inputClass} resize-none`}
                                                placeholder="Tell us about your project or inquiry"
                                            />
                                        </div>

                                        {formStatus === 'error' && (
                                            <div className="flex items-center gap-3 border border-ember/30 px-5 py-3">
                                                <AlertCircle size={15} className="text-ember" />
                                                <p className="text-bone/70 font-display text-sm">
                                                    Something went wrong. Email{' '}
                                                    <a href="mailto:partnerships@troplanduniverse.com" className="underline text-ember">
                                                        partnerships@troplanduniverse.com
                                                    </a>
                                                </p>
                                            </div>
                                        )}

                                        <MagneticButton>
                                            <button
                                                type="submit"
                                                disabled={formStatus === 'submitting'}
                                                className="group inline-flex items-center gap-3 px-10 py-5 bg-ember text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {formStatus === 'submitting' ? 'Sending…' : 'Send Message'}
                                                <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </button>
                                        </MagneticButton>
                                    </form>
                                </Reveal>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
