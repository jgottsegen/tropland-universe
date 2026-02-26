import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Award, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import CometBackground from '../components/CometBackground';
import TextReveal from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';

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
    const [bookTilt, setBookTilt] = useState({ rx: 0, ry: 0 });
    const bookRef = useRef<HTMLDivElement>(null);

    useEffect(() => { const t = setTimeout(() => setLoaded(true), 200); return () => clearTimeout(t); }, []);

    const sec2 = useFadeIn();
    const sec3 = useFadeIn();
    const sec4 = useFadeIn();

    const heroFade = () =>
        `transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

    const onBookMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = bookRef.current?.getBoundingClientRect();
        if (!rect) return;
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;
        setBookTilt({ rx: (ny - 0.5) * -12, ry: (nx - 0.5) * 16 });
    };
    const onBookLeave = () => setBookTilt({ rx: 0, ry: 0 });
    const isResting = bookTilt.rx === 0 && bookTilt.ry === 0;

    return (
        <div className="bg-brand-deep min-h-screen">

            {/* ═══════════════════════════════════════════════════════════
                HERO — Rockford forest world backdrop
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <CometBackground density={3} speed={0.8} />
                {/* Hero backdrop — Rockford's world */}
                <div className="absolute inset-0">
                    <img
                        src="/images/rockford-hero.png"
                        alt=""
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 35%' }}
                        aria-hidden="true"
                    />
                </div>
                {/* Overlays for text legibility + brand palette */}
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(13,10,26,0.97) 0%, rgba(13,10,26,0.80) 40%, rgba(13,10,26,0.50) 100%)' }} />
                <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(232,93,58,0.10) 0%, transparent 65%)' }} />
                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-accent/8 rounded-full blur-[200px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-purple/15 rounded-full blur-[180px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 py-24 md:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Text */}
                        <div className="order-2 lg:order-1">
                            <div className={`flex flex-wrap items-center gap-3 mb-6 ${heroFade()}`} style={{ transitionDelay: '200ms' }}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-sans font-semibold border border-brand-accent/20">
                                    <Award size={14} />
                                    Amazon #1 Bestseller
                                </span>
                                <span className="text-xs font-sans font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-white/15 text-white/65 bg-white/5">
                                    Fantasy / Adventure
                                </span>
                            </div>

                            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
                                <TextReveal className="text-white" delay={0.4} wordDelay={0.1}>The Adventures of</TextReveal>
                                <br />
                                <TextReveal className="text-white" delay={0.58} wordDelay={0.1}>Rockford T.</TextReveal>
                                {' '}<TextReveal className="italic text-brand-accent" delay={0.72} wordDelay={0.1}>Honeypot</TextReveal>
                            </h1>

                            <p className={`text-2xl text-white/90 font-sans font-medium leading-relaxed mb-6 max-w-xl ${heroFade()}`} style={{ transitionDelay: '600ms' }}>
                                A fantasy adventure set within the Tropland Universe. Explore a distinctive animal world built on curiosity, tension, and discovery.
                            </p>
                            <p className={`text-lg text-white/80 font-sans leading-relaxed mb-8 max-w-xl ${heroFade()}`} style={{ transitionDelay: '680ms' }}>
                                Rockford's journey established the modern Tropland canon, laying the foundation for animation, digital media, and long form storytelling.
                            </p>

                            {/* Quick stats */}
                            <div className={`flex flex-wrap gap-6 mb-8 ${heroFade()}`} style={{ transitionDelay: '740ms' }}>
                                {[
                                    { icon: Award, label: 'Amazon #1', sub: 'Bestseller' },
                                    { icon: BookOpen, label: 'Middle-Grade', sub: 'Novel' },
                                    { icon: Star, label: 'Tropland', sub: 'Canon #1' },
                                ].map(({ icon: Icon, label, sub }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-brand-accent/15 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                                            <Icon size={16} className="text-brand-accent" />
                                        </div>
                                        <div>
                                            <p className="text-white font-sans font-semibold text-sm leading-tight">{label}</p>
                                            <p className="text-white/40 font-sans text-xs">{sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={`flex flex-wrap items-center gap-4 ${heroFade()}`} style={{ transitionDelay: '800ms' }}>
                                <MagneticButton>
                                    <a
                                        href="https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,93,58,0.4)]"
                                    >
                                        Buy on Amazon
                                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </MagneticButton>
                            </div>
                        </div>

                        {/* Book Cover — Premium 3D */}
                        <div className={`order-1 lg:order-2 flex justify-center lg:justify-end ${heroFade()}`} style={{ transitionDelay: '300ms' }}>
                            <div
                                ref={bookRef}
                                onMouseMove={onBookMove}
                                onMouseLeave={onBookLeave}
                                className="relative group max-w-md w-full cursor-pointer"
                                style={{
                                    perspective: '1000px',
                                }}
                            >
                                {/* Ambient glow layers */}
                                <div className="absolute -inset-10 rounded-3xl bg-brand-accent/40 blur-[60px] opacity-60 group-hover:opacity-100 group-hover:blur-[80px] transition-all duration-700 pointer-events-none" />
                                <div className="absolute -inset-4 rounded-3xl bg-brand-purple/20 blur-2xl opacity-40 group-hover:opacity-65 transition-opacity duration-700 pointer-events-none" />

                                {/* 3D book wrapper */}
                                <div
                                    style={{
                                        transform: `rotateX(${bookTilt.rx}deg) rotateY(${isResting ? -6 : bookTilt.ry}deg)`,
                                        transition: isResting
                                            ? 'transform 0.65s cubic-bezier(0.34,1.56,0.64,1)'
                                            : 'transform 0.08s linear',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    {/* Main book face */}
                                    <div className="relative rounded-xl overflow-hidden"
                                        style={{
                                            boxShadow: [
                                                '0 80px 120px -20px rgba(0,0,0,0.9)',
                                                '0 40px 60px -10px rgba(0,0,0,0.7)',
                                                '0 20px 30px rgba(0,0,0,0.5)',
                                                '8px 0 24px -4px rgba(0,0,0,0.6)',
                                                '-2px 0 12px rgba(232,93,58,0.15)',
                                            ].join(', '),
                                        }}
                                    >
                                        <img
                                            src="/images/rth.png"
                                            alt="The Adventures of Rockford T. Honeypot — Book Cover"
                                            className="w-full h-auto block"
                                            style={{ aspectRatio: '3/4', objectFit: 'cover' }}
                                        />
                                        {/* Cover gloss sheen */}
                                        <div className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%, rgba(0,0,0,0.08) 100%)',
                                            }} />
                                    </div>

                                    {/* Spine strip (left edge) */}
                                    <div className="absolute inset-y-0 left-0 w-4 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.25) 60%, transparent)',
                                            transform: 'translateZ(-1px)',
                                        }} />

                                    {/* Bottom shadow plane */}
                                    <div className="absolute -bottom-6 inset-x-4 h-6 pointer-events-none rounded-full"
                                        style={{
                                            background: 'rgba(0,0,0,0.4)',
                                            filter: 'blur(16px)',
                                            transform: 'scaleY(0.4)',
                                        }} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                ABOUT THE BOOK — Modern Minimalist Editorial Section
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec2.ref as any} className="py-24 md:py-32 bg-brand-cream text-brand-dark-text relative overflow-hidden cream-texture">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
                    <div className={sec2.fade()} style={{ transitionDelay: '0ms' }}>
                        <p className="text-sm font-sans font-bold uppercase tracking-[0.25em] text-brand-accent mb-8">About the Book</p>
                    </div>

                    <h2 className={`font-serif text-5xl md:text-6xl lg:text-7xl mb-12 leading-tight text-brand-dark-text ${sec2.fade()}`} style={{ transitionDelay: '80ms' }}>
                        A World Built on <span className="italic text-brand-accent">Wonder.</span>
                    </h2>

                    <div className={`space-y-8 text-left md:text-center ${sec2.fade()}`} style={{ transitionDelay: '160ms' }}>
                        <p className="text-2xl md:text-3xl font-sans font-medium text-brand-dark-text leading-relaxed">
                            Set deep within the Tropland Universe, <span className="italic">The Adventures of Rockford T. Honeypot</span> is a fantasy adventure novel that established the narrative foundation of the broader franchise.
                        </p>

                        <p className="text-xl md:text-2xl text-brand-dark-text/80 font-sans leading-relaxed max-w-3xl mx-auto">
                            The story follows Rockford as he navigates a structured animal society with its own rules, hierarchies, and conflicts. This novel was written entirely by Josh Gottsegen, years before artificial intelligence entered the creative mainstream. Since its release, the book reached #1 on Amazon and laid the narrative architecture that now underpins a billion-view digital franchise.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MEET THE CHARACTERS — Gallery
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec3.ref as any} className="py-24 md:py-32 bg-brand-deep text-white relative overflow-hidden">
                <CometBackground density={2} speed={0.4} />
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                    <div className={`mb-14 text-center ${sec3.fade()}`}>
                        <p className="text-[13px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5">
                            The World of Rockford
                        </p>
                        <h2 className="font-serif tracking-tight leading-[1] mb-6"
                            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                            Meet the{' '}
                            <span className="italic text-brand-accent">Characters</span>
                        </h2>
                        <p className="text-white/55 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
                            From the central hero to the allies and rivals who shape his path, the Tropland Forest is populated by characters built for long term narrative expansion.
                        </p>
                    </div>

                    {/* Character grid — 4 col desktop, 2 col mobile */}
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${sec3.fade()}`}
                        style={{ transitionDelay: '120ms' }}>
                        {characters.map((char, i) => (
                            <div
                                key={char.src}
                                className="group relative rounded-2xl overflow-hidden cursor-default"
                                style={{ aspectRatio: '3/4' }}
                            >
                                <img
                                    src={char.src}
                                    alt={char.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 pointer-events-none"
                                    style={{ background: 'linear-gradient(to top, rgba(13,10,26,0.88) 0%, rgba(13,10,26,0.15) 55%, transparent 100%)' }} />

                                {/* Character label */}
                                <div className="absolute bottom-0 inset-x-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="font-serif text-white text-xl leading-tight drop-shadow-md">{char.name}</p>
                                </div>

                                {/* Border glow on hover */}
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.06] group-hover:ring-brand-accent/25 transition-all duration-300 pointer-events-none" />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SOCIAL PROOF / REVIEWS
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-28 bg-brand-cream text-brand-dark-text relative overflow-hidden cream-texture">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-sans font-semibold mb-6">
                            <Star size={14} className="fill-brand-accent" />
                            Over 80 Five-Star Reviews
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
                            Widely covered across the <span className="italic text-brand-accent">parenting</span> and <span className="italic text-brand-accent">family blog</span> community.
                        </h2>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
                        {/* Quote 1 */}
                        <div className="break-inside-avoid bg-white/60 p-8 rounded-3xl border border-brand-accent/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
                            <div className="absolute -top-3 -left-1 text-5xl text-brand-accent/20 font-serif leading-none">"</div>
                            <p className="font-sans text-xl font-medium text-brand-dark-text leading-relaxed relative z-10 italic mb-6">
                                "When the book is good, you keep reading until the very last sentence. Now that’s a good book!"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center font-serif font-bold text-brand-accent">T</div>
                                <div>
                                    <p className="font-sans font-bold text-sm text-brand-dark-text leading-tight">This Worthy Life</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote 2 */}
                        <div className="break-inside-avoid bg-white/60 p-8 rounded-3xl border border-brand-accent/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
                            <div className="absolute -top-3 -left-1 text-5xl text-brand-accent/20 font-serif leading-none">"</div>
                            <p className="font-sans text-xl font-medium text-brand-dark-text leading-relaxed relative z-10 italic mb-6">
                                "The world building was one of my favourite parts of this book—Josh Gottsegen definitely had a great vision."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center font-serif font-bold text-brand-accent">Q</div>
                                <div>
                                    <p className="font-sans font-bold text-sm text-brand-dark-text leading-tight">Queens Book Asylum</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote 3 */}
                        <div className="break-inside-avoid bg-white/60 p-8 rounded-3xl border border-brand-accent/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
                            <div className="absolute -top-3 -left-1 text-5xl text-brand-accent/20 font-serif leading-none">"</div>
                            <p className="font-sans text-xl md:text-2xl font-medium text-brand-dark-text leading-relaxed relative z-10 italic mb-6">
                                "This whimsical tale captures the spirit of adventure and the joy of discovery."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center font-serif font-bold text-brand-accent">B</div>
                                <div>
                                    <p className="font-sans font-bold text-sm text-brand-dark-text leading-tight">Ben Spark</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote 4 */}
                        <div className="break-inside-avoid bg-white/60 p-8 rounded-3xl border border-brand-accent/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
                            <div className="absolute -top-3 -left-1 text-5xl text-brand-accent/20 font-serif leading-none">"</div>
                            <p className="font-sans text-xl font-medium text-brand-dark-text leading-relaxed relative z-10 italic mb-6">
                                "This easy reading but fast-paced book earns a place in your family's book collection and I know you'll love it as much as we did."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center font-serif font-bold text-brand-accent">D</div>
                                <div>
                                    <p className="font-sans font-bold text-sm text-brand-dark-text leading-tight">Dangerous Cupcake</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote 5 */}
                        <div className="break-inside-avoid bg-white/60 p-8 rounded-3xl border border-brand-accent/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
                            <div className="absolute -top-3 -left-1 text-5xl text-brand-accent/20 font-serif leading-none">"</div>
                            <p className="font-sans text-xl font-medium text-brand-dark-text leading-relaxed relative z-10 italic mb-6">
                                "Gottsegen has created a very empathetic novel that strives to teach its target audience values of love, compassion, understanding, and forgiveness."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center font-serif font-bold text-brand-accent">C</div>
                                <div>
                                    <p className="font-sans font-bold text-sm text-brand-dark-text leading-tight">The Cactus Chronicles</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote 6 */}
                        <div className="break-inside-avoid bg-white/60 p-8 rounded-3xl border border-brand-accent/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
                            <div className="absolute -top-3 -left-1 text-5xl text-brand-accent/20 font-serif leading-none">"</div>
                            <p className="font-sans text-xl font-medium text-brand-dark-text leading-relaxed relative z-10 italic mb-6">
                                "A wonderful book that, honestly... captivated me completely."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center font-serif font-bold text-brand-accent">L</div>
                                <div>
                                    <p className="font-sans font-bold text-sm text-brand-dark-text leading-tight">Los Tweens and Teens</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote 7 */}
                        <div className="break-inside-avoid bg-white/60 p-8 rounded-3xl border border-brand-accent/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
                            <div className="absolute -top-3 -left-1 text-5xl text-brand-accent/20 font-serif leading-none">"</div>
                            <p className="font-sans text-xl font-medium text-brand-dark-text leading-relaxed relative z-10 italic mb-6">
                                "An epic story of a chipmunk who discovered meaning and purpose while pursuing his ambitious dreams to change the forest forever."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center font-serif font-bold text-brand-accent">Q</div>
                                <div>
                                    <p className="font-sans font-bold text-sm text-brand-dark-text leading-tight">Queen Thrifty</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote 8 */}
                        <div className="break-inside-avoid bg-white/60 p-8 rounded-3xl border border-brand-accent/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
                            <div className="absolute -top-3 -left-1 text-5xl text-brand-accent/20 font-serif leading-none">"</div>
                            <p className="font-sans text-xl font-medium text-brand-dark-text leading-relaxed relative z-10 italic mb-6">
                                "The timeless classic story of the underdog hero persevering through obstacles to change his life and those he loves is depicted beautifully in this adventure story."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center font-serif font-bold text-brand-accent">S</div>
                                <div>
                                    <p className="font-sans font-bold text-sm text-brand-dark-text leading-tight">Goodreads</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                CTA — Get the Book
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec4.ref as any} className="py-20 md:py-32 bg-brand-deep text-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                    <div className={sec4.fade()}>
                        <p className="text-[13px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-6">
                            Own the Origin
                        </p>
                        <h2 className="font-serif leading-[1.05] tracking-tight mb-8 text-white"
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                            The first long form novel within the Tropland Universe.
                        </h2>

                        <div className="flex flex-col items-center gap-2 mb-10 text-white/70 font-sans text-lg">
                            <p>An Amazon #1 Bestseller.</p>
                            <p>Canon #1 of the modern Tropland mythology.</p>
                            <p className="mt-4"><span className="italic text-white">The Adventures of Rockford T. Honeypot</span> is available now on Amazon.</p>
                        </div>

                        <MagneticButton>
                            <a
                                href="https://www.amazon.com/Adventures-Rockford-T-Honeypot/dp/0990927075"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-brand-accent text-white font-sans font-semibold text-lg hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,93,58,0.4)]"
                            >
                                Buy on Amazon
                                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </MagneticButton>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default RockfordPage;
