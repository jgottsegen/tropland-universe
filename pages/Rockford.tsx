import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowUpRight, Award, BookOpen, Star } from 'lucide-react';
import SectionTag from '../components/fx/SectionTag';
import Reveal from '../components/fx/Reveal';
import MagneticButton from '../components/MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

const characters = [
    { src: '/images/rocky-rock1.png', name: 'Green Hut 39' },
    { src: '/images/rocky-rockford.png', name: 'Rockford' },
    { src: '/images/rocky-apple.png', name: 'Apple' },
    { src: '/images/rocky-billy.png', name: 'Billy' },
    { src: '/images/rocky-chuck.png', name: 'Chuck' },
    { src: '/images/rocky-eve.png', name: 'Eve' },
    { src: '/images/rocky-jewel.png', name: 'Jewel' },
    { src: '/images/rocky-ergo.png', name: 'Ergo' },
];

const quickStats = [
    { icon: Award, label: 'Amazon #1', sub: 'Bestseller' },
    { icon: BookOpen, label: 'Middle-Grade', sub: 'Novel' },
    { icon: Star, label: 'Tropland', sub: 'Origin Story' },
];

const reviews = [
    { quote: '"When the book is good, you keep reading until the very last sentence. Now that’s a good book!"', source: 'This Worthy Life' },
    { quote: '"The world building was one of my favourite parts of this book—Josh Gottsegen definitely had a great vision."', source: 'Queens Book Asylum' },
    { quote: '"This whimsical tale captures the spirit of adventure and the joy of discovery."', source: 'Ben Spark' },
    { quote: '"This easy reading but fast-paced book earns a place in your family\'s book collection and I know you\'ll love it as much as we did."', source: 'Dangerous Cupcake' },
    { quote: '"Gottsegen has created a very empathetic novel that strives to teach its target audience values of love, compassion, understanding, and forgiveness."', source: 'The Cactus Chronicles' },
    { quote: '"A wonderful book that, honestly... captivated me completely."', source: 'Los Tweens and Teens' },
    { quote: '"An epic story of a chipmunk who discovered meaning and purpose while pursuing his ambitious dreams to change the forest forever."', source: 'Queen Thrifty' },
    { quote: '"The timeless classic story of the underdog hero persevering through obstacles to change his life and those he loves is depicted beautifully in this adventure story."', source: 'Goodreads' },
    { quote: '"Holy Moses! Awesome adventure story for young readers and a great lesson in never giving up for everyone!"', source: 'Dr. Jan Pol', sub: "NatGeo Wild's The Incredible Dr. Pol" },
    { quote: '"Rockford\'s stories introduce a menagerie of vibrant one-of-a-kind characters who are perfectly suited for older children, with gentle lessons to be learned from every interaction... Parents waiting for their children to be old enough for The Hobbit or Redwall will find this the perfect stopgap, with plenty of thrills as well as moral quandaries, somber loss, and emotional growth."', source: 'BookLife Reviews' },
    { quote: '"Creativity knows no bounds within this whimsical story."', source: 'Onlinebookclub' },
    { quote: '"Heart-touching and soul-warming, The Adventures of Rockford T. Honeypot provide kids the sweetness of the sought-after adventure with a relatable, adorable protagonist. A wonderful inspirational book to share with the fantasy-loving middle school reader!"', source: 'Dr. Gabby Wild', sub: 'Veterinarian · NatGeo Kids Educator · Animal Jam' },
    { quote: '"An old-fashioned, relentlessly charming middle-grade rags-to-riches animal tale."', source: 'Reedsy Reviews' },
    { quote: '"Grab your favorite nuts or snacks before going on an amazing journey. Gottsegen has earned my admiration for creating such a remarkable story. The Adventures of Rockford T. Honeypot will become a treasured book for children and adults."', source: 'Readers Favorite', sub: 'Official 5 Stars Seal' },
    { quote: '"Without stinting the action, Gottsegen delivers a powerful message about the importance of being brave, honest, and true to oneself."', source: 'BookLife Reviews' },
    { quote: '"From the very first chapter, we were all hooked! Rockford T. Honeypot quickly became our favorite book."', source: 'Tessa Smith' },
];

const RockfordPage: React.FC = () => {
    return (
        <div className="bg-ink min-h-screen">
            <Helmet>
                <title>The Adventures of Rockford T. Honeypot | Tropland Universe</title>
                <meta name="description" content="Amazon #1 bestselling fantasy-adventure novel. The cornerstone book of the Tropland Universe, by Josh Gottsegen." />
                <meta property="og:title" content="The Adventures of Rockford T. Honeypot | Tropland Universe" />
                <meta property="og:description" content="Amazon #1 bestselling fantasy-adventure novel. The cornerstone book of the Tropland Universe, by Josh Gottsegen." />
                <meta property="og:url" content="https://troplanduniverse.com/rockford" />
            </Helmet>

            {/* ═══════════════════════════════════════════════════════════
                HERO — Rockford forest world backdrop
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
                <div className="absolute inset-0">
                    <motion.img
                        src="/images/rockford-hero.png"
                        alt=""
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 35%' }}
                        aria-hidden="true"
                        initial={{ scale: 1.06, filter: 'brightness(0.7)' }}
                        animate={{ scale: 1, filter: 'brightness(1)' }}
                        transition={{ duration: 2, ease }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10 pt-36 md:pt-40 pb-20 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Text */}
                        <div className="order-2 lg:order-1 lg:col-span-7">
                            <motion.div
                                className="flex flex-wrap items-center gap-3 mb-8"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.9, ease }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-ember text-ink font-mono text-[10px] uppercase tracking-[0.18em]">
                                    <Award size={11} />
                                    Amazon #1 Bestseller
                                </span>
                                <span className="px-4 py-2 border border-white/20 text-white/65 font-mono text-[10px] uppercase tracking-[0.18em]">
                                    Fantasy / Adventure
                                </span>
                            </motion.div>

                            <h1 className="mb-8 select-none">
                                <span className="block overflow-hidden">
                                    <motion.span
                                        className="block font-display font-extrabold uppercase text-white tracking-[-0.02em] leading-[0.95] text-[8.5vw] md:text-[4.4vw] lg:text-[3.6vw]"
                                        initial={{ y: '108%' }}
                                        animate={{ y: 0 }}
                                        transition={{ delay: 0.3, duration: 1.1, ease }}
                                    >
                                        The Adventures of
                                    </motion.span>
                                </span>
                                <span className="block overflow-hidden">
                                    <motion.span
                                        className="block leading-[1] text-[10vw] md:text-[5.2vw] lg:text-[4.4vw]"
                                        initial={{ y: '108%' }}
                                        animate={{ y: 0 }}
                                        transition={{ delay: 0.45, duration: 1.1, ease }}
                                    >
                                        <span className="font-display font-extrabold uppercase text-white tracking-[-0.02em]">Rockford T. </span>
                                        <span className="font-edit italic font-light text-ember">Honeypot</span>
                                    </motion.span>
                                </span>
                            </h1>

                            <motion.div
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.65, duration: 1, ease }}
                            >
                                <p className="font-display font-light text-lg text-white/75 leading-relaxed mb-5 max-w-xl">
                                    A fantasy adventure set within the Tropland Universe™. Explore a distinctive animal world built on curiosity, tension, and discovery.
                                </p>
                                <p className="font-display font-light text-lg text-white/75 leading-relaxed mb-10 max-w-xl">
                                    Rockford's journey established the modern Tropland ecosystem, laying the foundation for animation, digital media, and long form storytelling.
                                </p>
                            </motion.div>

                            {/* Quick stats ledger */}
                            <motion.div
                                className="grid grid-cols-3 border-t border-white/15 mb-10 max-w-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.85, duration: 1 }}
                            >
                                {quickStats.map(({ icon: Icon, label, sub }, i) => (
                                    <div key={label} className={`py-5 pr-4 ${i > 0 ? 'border-l border-white/10 pl-5' : ''}`}>
                                        <Icon size={14} className="text-ember mb-3" />
                                        <p className="font-display font-bold text-base md:text-lg text-white leading-tight">{label}</p>
                                        <p className="font-mono text-[10px] text-white/50 uppercase tracking-[0.18em] mt-1.5">{sub}</p>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1, ease }}
                            >
                                <MagneticButton>
                                    <a
                                        href="https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-ember text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-300"
                                    >
                                        Buy on Amazon
                                        <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </MagneticButton>
                            </motion.div>
                        </div>

                        {/* Book cover */}
                        <motion.div
                            className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end"
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1.1, ease }}
                        >
                            <div className="relative w-full max-w-[300px] md:max-w-[380px]">
                                <div
                                    className="tu-frame tu-ticks text-bone/60 relative overflow-hidden border border-bone/15 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                                    style={{ aspectRatio: '3/4' }}
                                >
                                    <img
                                        src="/images/rth.png"
                                        alt="The Adventures of Rockford T. Honeypot · Book Cover"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                ABOUT THE BOOK
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-bone relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12">

                    <Reveal>
                        <SectionTag index="01" label="About the Book" dark={false} className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <Reveal className="lg:col-span-6">
                            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-ink text-[10vw] md:text-[4.6vw]">
                                A World Built<br />
                                on{' '}
                                <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">Wonder.</span>
                            </h2>
                        </Reveal>
                        <Reveal className="lg:col-span-6 flex flex-col justify-end" delay={0.12}>
                            <div className="space-y-7 max-w-xl">
                                <p className="font-display font-light text-lg md:text-xl text-ink/75 leading-relaxed">
                                    Set deep within the Tropland Universe, <span className="font-edit italic">The Adventures of Rockford T. Honeypot</span> is a fantasy adventure novel that established the narrative foundation of the broader franchise.
                                </p>
                                <p className="font-display font-light text-[17px] md:text-lg text-ink/60 leading-relaxed">
                                    The story follows Rockford as he navigates a structured animal society with its own rules, hierarchies, and conflicts. This novel was written entirely by Josh Gottsegen, years before artificial intelligence entered the creative mainstream. Since its release, the book reached #1 on Amazon and laid the narrative architecture that now underpins a billion-view digital franchise.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MEET THE CHARACTERS
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-ink relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

                    <Reveal>
                        <SectionTag index="02" label="The World of Rockford" className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-20">
                        <Reveal className="lg:col-span-7">
                            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-bone text-[10vw] md:text-[4.6vw]">
                                Meet the<br />
                                <span className="font-edit italic font-light normal-case text-ember tracking-normal">Characters</span>
                            </h2>
                        </Reveal>
                        <Reveal className="lg:col-span-5 flex flex-col justify-end" delay={0.15}>
                            <p className="font-display font-light text-lg md:text-xl text-bone/65 leading-relaxed max-w-md">
                                From the central hero to the allies and rivals who shape his path, the Tropland Forest is populated by characters built for long term narrative expansion.
                            </p>
                        </Reveal>
                    </div>

                    {/* Character grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {characters.map((char, i) => (
                            <Reveal key={char.src} delay={(i % 4) * 0.06}>
                                <div>
                                    <div className="tu-frame bg-ink-2 overflow-hidden" style={{ aspectRatio: '3/4' }}>
                                        <img
                                            src={char.src}
                                            alt={char.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-bone/70">
                                            {char.name}
                                        </span>
                                        <span className="font-mono text-[10px] tracking-[0.2em] text-ember/70">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SOCIAL PROOF / REVIEWS
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-bone relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

                    <Reveal>
                        <SectionTag index="03" label="The Record" dark={false} className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="mb-14 md:mb-20">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-bone font-mono text-[11px] uppercase tracking-[0.18em] mb-8">
                                <Star size={12} className="text-ember" />
                                Over 80 Five-Star Reviews
                            </span>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[1] text-ink text-[8vw] md:text-[3.6vw] max-w-5xl">
                                Widely covered across the{' '}
                                <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">parenting</span>{' '}
                                and{' '}
                                <span className="font-edit italic font-light normal-case text-ember-deep tracking-normal">family blog</span>{' '}
                                community.
                            </h2>
                        </Reveal>
                    </div>

                    <Reveal delay={0.1}>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                            {reviews.map((review, i) => (
                                <div
                                    key={`${review.source}-${i}`}
                                    className="break-inside-avoid border border-ink/12 bg-bone-dark/40 hover:bg-bone-dark/70 transition-colors duration-500 p-7 mb-4"
                                >
                                    <p className="font-display font-light text-[16px] text-ink/80 leading-relaxed mb-6">
                                        {review.quote}
                                    </p>
                                    <div className="flex items-baseline justify-between gap-4 border-t border-ink/10 pt-4">
                                        <div>
                                            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/75">
                                                {review.source}
                                            </p>
                                            {review.sub && (
                                                <p className="font-mono text-[10px] tracking-[0.12em] text-ink/45 mt-1">
                                                    {review.sub}
                                                </p>
                                            )}
                                        </div>
                                        <span className="font-mono text-[10px] tracking-[0.2em] text-ember-deep/70">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                CTA — Get the Book
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 bg-ink-2 relative overflow-hidden">
                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

                    <Reveal>
                        <SectionTag index="04" label="Own the Origin" className="mb-12 md:mb-16" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                        <Reveal className="lg:col-span-8">
                            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[1] text-bone text-[8.5vw] md:text-[3.8vw] mb-10">
                                The first long form{' '}
                                <span className="font-edit italic font-light normal-case text-ember tracking-normal">novel</span>{' '}
                                within the Tropland Universe.
                            </h2>
                            <div className="space-y-2 font-display font-light text-lg text-bone/65 leading-relaxed">
                                <p>An Amazon #1 Bestseller.</p>
                                <p>Canon #1 of the modern Tropland mythology.</p>
                                <p className="mt-4"><span className="font-edit italic text-bone">The Adventures of Rockford T. Honeypot</span> is available now on Amazon.</p>
                            </div>
                        </Reveal>
                        <Reveal className="lg:col-span-4 flex lg:justify-end" delay={0.12}>
                            <MagneticButton>
                                <a
                                    href="https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-10 py-5 bg-ember text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-300"
                                >
                                    Buy on Amazon
                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </MagneticButton>
                        </Reveal>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default RockfordPage;
