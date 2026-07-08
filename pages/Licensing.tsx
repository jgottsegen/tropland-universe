import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowUpRight, Globe, Tv, ShoppingBag, Gamepad2, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTag from '../components/fx/SectionTag';
import Reveal from '../components/fx/Reveal';
import Odometer from '../components/fx/Odometer';
import MagneticButton from '../components/MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Stats ─────────────────────────────────────────────────────────────────
const stats = [
    { value: '1.5B+', label: 'Content Views Worldwide' },
    { value: '#1', label: 'AI Artist Influencer · Feedspot 2025 + 2026' },
    { value: '~40M', label: 'Monthly Social Impressions' },
    { value: '50K+', label: 'Image & Video Library' },
];

// ─── Product categories ────────────────────────────────────────────────────
const categories = [
    { icon: ShoppingBag, label: 'Apparel & Accessories', desc: 'T-shirts, hats, bags, and branded lifestyle wear' },
    { icon: Gamepad2, label: 'Toys & Games', desc: 'Plush, figures, puzzles, and interactive play' },
    { icon: BookOpen, label: 'Publishing & Media', desc: 'Books, comics, digital content, and educational materials' },
    { icon: Tv, label: 'Digital & Entertainment', desc: 'Streaming, gaming integrations, and AR/VR experiences' },
    { icon: Globe, label: 'Home & Living', desc: 'Stationery, drinkware, wall art, and décor' },
    { icon: Star, label: 'Health & Wellness', desc: 'Wellness-oriented products aligned with brand values' },
];

const pillars = [
    { label: 'Wholly Owned IP', desc: 'All characters, stories, and visual assets are original and creator-owned' },
    { label: 'Proven Global Audience', desc: 'Ranked #1 AI Artist Influencer with a worldwide fanbase across all platforms' },
    { label: 'Multi-Format Ready', desc: 'Publishing, social, video, and digital assets available for activation' },
    { label: 'Values-Aligned', desc: 'Family-friendly, wellness-focused, and conservation-positive brand positioning' },
];

// ─── Scrolling background row images ───────────────────────────────────────
const row1 = [
    '/images/licensing-bg-1.png',
    '/images/hero-lion.png',
    '/images/licensing-bg-3.jpg',
    '/images/trop-forest.png',
    '/images/licensing-bg-2.png',
    '/images/rocky-rockford.png',
];

const row2 = [
    '/images/licensing-bg-3.jpg',
    '/images/licensing-bg-2.png',
    '/images/hero-lion.png',
    '/images/rocky-apple.png',
    '/images/licensing-bg-1.png',
    '/images/trop-forest.png',
];

// ─── Page ──────────────────────────────────────────────────────────────────
const LicensingPage: React.FC = () => {
    return (
        <div className="bg-ink min-h-screen">
            <Helmet>
                <title>Licensing · Tropland Universe</title>
                <meta name="description" content="License the Tropland Universe™ IP. Character-driven wildlife media with 50K+ assets, ~40M monthly impressions. Represented by All-American Licensing." />
                <meta property="og:title" content="Licensing · Tropland Universe" />
                <meta property="og:description" content="License the Tropland Universe™ IP. Character-driven wildlife media with 50K+ assets, ~40M monthly impressions. Represented by All-American Licensing." />
                <meta property="og:url" content="https://troplanduniverse.com/licensing" />
            </Helmet>

            {/* ═══════════════════════════════════════════════════════════
                SECTION 1 — Scrolling image background + editorial overlay
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">

                {/* Scrolling image background */}
                <div className="absolute inset-0 flex flex-col justify-center gap-3 pointer-events-none">
                    {/* Row 1 — scrolls left */}
                    <div className="flex-1 overflow-hidden flex items-center">
                        <div
                            className="flex gap-3 h-[90%]"
                            style={{
                                width: 'max-content',
                                animation: 'scrollL 60s linear infinite',
                            }}
                        >
                            {[...row1, ...row1].map((src, i) => (
                                <img key={i} src={src} alt="" className="h-full w-auto min-w-[340px] object-cover" />
                            ))}
                        </div>
                    </div>
                    {/* Row 2 — scrolls right */}
                    <div className="flex-1 overflow-hidden flex items-center">
                        <div
                            className="flex gap-3 h-[90%]"
                            style={{
                                width: 'max-content',
                                animation: 'scrollR 75s linear infinite',
                            }}
                        >
                            {[...row2, ...row2].map((src, i) => (
                                <img key={i} src={src} alt="" className="h-full w-auto min-w-[340px] object-cover" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dim overlay */}
                <div className="absolute inset-0 bg-ink/90" />

                {/* Content */}
                <div className="relative z-10 max-w-[1480px] mx-auto px-6 md:px-12 py-32 md:py-40 w-full">

                    <motion.div
                        className="flex items-center gap-4 mb-8"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.9, ease }}
                    >
                                      <span className="font-mono text-[11px] md:text-xs tracking-[0.32em] uppercase text-ember">
                            Licensing &amp; Partnerships
                        </span>
                    </motion.div>

                    <h1 className="mb-8 select-none">
                        <span className="block overflow-hidden">
                            <motion.span
                                className="block font-display font-extrabold uppercase text-white tracking-[-0.02em] leading-[0.95] text-[11vw] md:text-[6.4vw] lg:text-[5.4vw]"
                                initial={{ y: '108%' }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.3, duration: 1.1, ease }}
                            >
                                Bring Tropland
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden">
                            <motion.span
                                className="block leading-[1] text-[10vw] md:text-[5.6vw] lg:text-[4.8vw]"
                                initial={{ y: '108%' }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.45, duration: 1.1, ease }}
                            >
                                <span className="font-display font-extrabold uppercase text-white tracking-[-0.02em]">to </span>
                                <span className="font-edit italic font-light text-ember">your brand.</span>
                            </motion.span>
                        </span>
                    </h1>

                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-14 max-w-5xl"
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 1, ease }}
                    >
                        <p className="font-display font-light text-lg md:text-xl text-white/70 leading-relaxed">
                            Tropland Universe™ is a character-driven wildlife media property with 1.5 billion content views,
                            a 50K+ image and video library, and a global audience that spans all ages.
                        </p>
                        <p className="font-display font-light text-lg md:text-xl text-white/70 leading-relaxed">
                            Licensing is managed exclusively by All-American Licensing,
                            representing the property across consumer products, publishing, digital media, and entertainment worldwide.
                        </p>
                    </motion.div>

                    {/* Key stats ledger */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-white/15 mb-14"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.85, duration: 1 }}
                    >
                        {stats.map((s, i) => (
                            <div
                                key={s.label}
                                className={`py-6 md:py-8 px-2 md:px-8 ${i > 0 ? 'border-l border-white/10' : ''} ${i >= 2 ? 'border-t border-white/10 md:border-t-0' : ''}`}
                            >
                                <div className="font-display font-extrabold text-3xl md:text-[2.8rem] text-white leading-none tracking-tight">
                                    <Odometer value={s.value} />
                                </div>
                                <div className="font-mono text-[10px] md:text-[11px] text-white/50 uppercase tracking-[0.18em] mt-3">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1, ease }}
                    >
                        <MagneticButton>
                            <Link
                                to="/contact"
                                onClick={() => window.scrollTo(0, 0)}
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ember text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-300"
                            >
                                Inquire About Licensing
                                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </MagneticButton>
                        <MagneticButton>
                            <a
                                href="https://www.aalmg.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/25 text-white font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:border-ember hover:text-ember transition-colors duration-300"
                            >
                                Visit All-American Licensing
                                <ArrowUpRight size={14} />
                            </a>
                        </MagneticButton>
                    </motion.div>

                    <motion.p
                        className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/40 mt-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.15, duration: 1 }}
                    >
                        Current licensees:{' '}
                        <a href="https://licensing.troplanduniverse.com" target="_blank" rel="noopener noreferrer" className="tu-link text-white/65 hover:text-ember transition-colors duration-300">
                            Access the Licensee Portal
                        </a>
                    </motion.p>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION 2 — Bone editorial: categories + opportunity
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-bone relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12">

                    <Reveal>
                        <SectionTag index="01" label="The Opportunity" dark={false} className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
                        <Reveal className="lg:col-span-7">
                            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-ink text-[9.5vw] md:text-[4.2vw]">
                                A world of characters<br />
                                <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">ready for product.</span>
                            </h2>
                        </Reveal>
                        <Reveal className="lg:col-span-5 flex flex-col justify-end" delay={0.15}>
                            <p className="font-display font-light text-lg md:text-xl text-ink/65 leading-relaxed max-w-md">
                                From the Tropland Forest to the Digital Animal Kingdom, our IP spans original children's books,
                                a globally ranked social media presence, and a character roster built for merchandise, media, and experiential activations.
                            </p>
                        </Reveal>
                    </div>

                    {/* Product Categories Grid */}
                    <Reveal delay={0.05}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/12 border border-ink/12 mb-16 md:mb-24">
                            {categories.map(({ icon: Icon, label, desc }, i) => (
                                <div key={label} className="group bg-bone hover:bg-bone-dark/50 transition-colors duration-500 p-8 md:p-9">
                                    <div className="mb-8">
                                        <Icon size={20} className="text-ember-deep" />
                                    </div>
                                    <h3 className="font-display font-bold text-xl text-ink mb-3 tracking-tight">{label}</h3>
                                    <p className="font-display font-light text-[15px] text-ink/55 leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Brand pillars */}
                    <Reveal delay={0.05}>
                        <div className="border border-ink/15 bg-bone-dark/40 p-8 md:p-14 mb-16 md:mb-24">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-ember-deep mb-5">Why Tropland</p>
                                    <h3 className="font-display font-extrabold uppercase tracking-[-0.02em] text-2xl md:text-[2.2rem] leading-[1.05] text-ink mb-6">
                                        Original IP. Global reach.{' '}
                                        <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">Values-driven.</span>
                                    </h3>
                                    <p className="font-display font-light text-[16px] md:text-[17px] text-ink/65 leading-relaxed mb-6">
                                        Tropland Universe™ is built on a foundation of original storytelling, beginning with published
                                        children's books in 2013 and evolving into a 1.5-billion-view digital brand. Every character,
                                        narrative, and visual asset is wholly owned by OneLight Studios.
                                    </p>
                                    <p className="font-display font-light text-[16px] md:text-[17px] text-ink/65 leading-relaxed">
                                        The brand's core themes of wildlife conservation, family, wellness, and curiosity
                                        position it naturally for family-friendly product lines across all major retail categories.
                                    </p>
                                </div>
                                <div className="space-y-0 border-t border-ink/10">
                                    {pillars.map((item, i) => (
                                        <div key={item.label} className="py-5 border-b border-ink/10">
                                            <div>
                                                <p className="font-display font-bold text-[17px] text-ink tracking-tight">{item.label}</p>
                                                <p className="font-display font-light text-[15px] text-ink/55 leading-snug mt-1">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Contact CTA */}
                    <Reveal delay={0.05}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                            <div className="lg:col-span-6">
                                <p className="font-display font-light text-lg md:text-xl text-ink/65 leading-relaxed max-w-xl">
                                    For licensing inquiries, contact <strong className="text-ink font-medium">All-American Licensing</strong> or
                                    reach out to our partnerships team directly.
                                </p>
                            </div>
                            <div className="lg:col-span-6 flex flex-col sm:flex-row lg:justify-end gap-4">
                                <MagneticButton>
                                    <Link
                                        to="/contact"
                                        onClick={() => window.scrollTo(0, 0)}
                                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink text-bone font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-deep transition-colors duration-300"
                                    >
                                        Contact Partnerships
                                        <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </MagneticButton>
                                <MagneticButton>
                                    <a
                                        href="mailto:partnerships@troplanduniverse.com"
                                        className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-ink/25 text-ink font-display font-bold text-[14px] uppercase tracking-[0.06em] hover:border-ember-deep hover:text-ember-deep transition-colors duration-300"
                                    >
                                        partnerships@troplanduniverse.com
                                    </a>
                                </MagneticButton>
                            </div>
                        </div>
                    </Reveal>

                </div>
            </section>

        </div>
    );
};

export default LicensingPage;
