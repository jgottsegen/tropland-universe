import React, { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import CometBackground from '../components/CometBackground';
import { GlowingEffect } from '../components/GlowingEffect';
import TextReveal from '../components/TextReveal';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/* ── Ghost shell placeholder ── */
const GhostShell: React.FC<{ className?: string; delay?: string; label?: string }> = ({
    className = '',
    delay = '0s',
    label,
}) => (
    <div
        className={`ghost-pulse relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.05] ${className}`}
        style={{ animationDelay: delay }}
    >
        <div className="ghost-scan" style={{ animationDelay: delay }} />
        <div className="ghost-cross absolute top-3 left-3 w-4 h-4" style={{ animationDelay: delay }}>
            <div className="absolute top-0 left-0 w-full h-px bg-white/15" />
            <div className="absolute top-0 left-0 w-px h-full bg-white/15" />
        </div>
        <div className="ghost-cross absolute bottom-3 right-3 w-4 h-4"
            style={{ animationDelay: `calc(${delay} + 1.75s)` }}>
            <div className="absolute bottom-0 right-0 w-full h-px bg-white/15" />
            <div className="absolute bottom-0 right-0 w-px h-full bg-white/15" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="ghost-cross w-7 h-7 relative" style={{ animationDelay: `calc(${delay} + 0.8s)` }}>
                <div className="absolute top-1/2 left-0 w-full h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="absolute top-0 left-1/2 w-px h-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white/10" />
            </div>
        </div>
        {label && (
            <span className="absolute bottom-3 left-0 right-0 text-center text-[8px] font-sans font-semibold uppercase tracking-[0.25em] text-white/20">
                {label}
            </span>
        )}
    </div>
);

/* ── Mythology panel — ghost shell with cursor tilt microinteraction ── */
const ForestGhostPanel: React.FC = () => {
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
    const [cursor, setCursor] = useState({ x: 50, y: 50 });
    const panelRef = useRef<HTMLDivElement>(null);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = panelRef.current?.getBoundingClientRect();
        if (!rect) return;
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;
        setTilt({ rx: (ny - 0.5) * -10, ry: (nx - 0.5) * 10 });
        setCursor({ x: nx * 100, y: ny * 100 });
    };

    const onLeave = () => {
        setTilt({ rx: 0, ry: 0 });
        setCursor({ x: 50, y: 50 });
    };

    const isResting = tilt.rx === 0 && tilt.ry === 0;

    return (
        <div
            ref={panelRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative rounded-3xl overflow-hidden border border-brand-dark-text/[0.08] select-none"
            style={{
                aspectRatio: '4/5',
                cursor: 'crosshair',
                background: 'linear-gradient(150deg, rgba(232,93,58,0.05) 0%, rgba(245,240,235,0) 55%, rgba(27,14,54,0.04) 100%)',
                transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: isResting
                    ? 'transform 0.65s cubic-bezier(0.34,1.56,0.64,1)'
                    : 'transform 0.08s linear',
            }}
        >
            {/* Subtle grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(27,14,54,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(27,14,54,0.04) 1px, transparent 1px)',
                backgroundSize: '52px 52px',
            }} />

            {/* Corner marks */}
            <div className="absolute top-5 left-5 w-5 h-5 border-t border-l border-brand-dark-text/[0.14] pointer-events-none" />
            <div className="absolute top-5 right-5 w-5 h-5 border-t border-r border-brand-dark-text/[0.14] pointer-events-none" />
            <div className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-brand-dark-text/[0.14] pointer-events-none" />
            <div className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-brand-dark-text/[0.14] pointer-events-none" />

            {/* Cursor-tracking reticle */}
            <div
                className="absolute pointer-events-none"
                style={{
                    left: `${cursor.x}%`,
                    top: `${cursor.y}%`,
                    transform: 'translate(-50%, -50%)',
                    transition: isResting ? 'left 0.65s cubic-bezier(0.34,1.56,0.64,1), top 0.65s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                }}
            >
                <div className="relative w-8 h-8">
                    <div className="absolute top-1/2 left-0 w-full h-px" style={{ background: 'rgba(27,14,54,0.2)' }} />
                    <div className="absolute top-0 left-1/2 w-px h-full" style={{ background: 'rgba(27,14,54,0.2)' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border" style={{ borderColor: 'rgba(27,14,54,0.2)' }} />
                </div>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-5 inset-x-0 text-center pointer-events-none">
                <span className="text-[8px] font-sans font-semibold uppercase tracking-[0.3em]"
                    style={{ color: 'rgba(27,14,54,0.25)', fontSize: '11px' }}>
                    Image Coming
                </span>
            </div>

            {/* Cream inset edge fade */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ boxShadow: 'inset 0 0 32px 12px #F5F0EB' }} />
        </div>
    );
};

/* ── Chapter card with GlowingEffect border ── */
const ChapterCard: React.FC<{
    area?: string;
    children: React.ReactNode;
    className?: string;
}> = ({ area, children, className = '' }) => (
    <li className={`list-none ${area ?? ''}`}>
        <div className="relative h-full rounded-3xl border border-white/[0.07] p-[3px]"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            <GlowingEffect
                spread={50}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.01}
                borderWidth={2}
            />
            <div className={`relative h-full rounded-[22px] overflow-hidden backdrop-blur-sm ${className}`}>
                {children}
            </div>
        </div>
    </li>
);

/* ── Intersection fade hook ── */
function useFadeIn(threshold = 0.08) {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    const fade = () =>
        `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
    return { ref, visible, fade };
}

/* ══════════════════════════════════════════════════════════════════ */

const AboutPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 200);
        return () => clearTimeout(t);
    }, []);

    const secMythos = useFadeIn();
    const secOrigin = useFadeIn();
    const secContact = useFadeIn();

    const heroReveal = () =>
        `transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        try {
            const res = await fetch('https://formsubmit.co/ajax/partnerships@troplanduniverse.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    name, email, message,
                    _subject: `New Tropland inquiry from ${name}`,
                }),
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
        <div className="min-h-screen bg-brand-deep">

            {/* ═══════════════════════════════════════════════════════════
                ACT I — HERO
                Swap src when Josh provides the new hero image.
                Currently: hero-lion.png
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: '640px' }}>
                <CometBackground density={3} speed={0.7} />

                <div className="absolute inset-0">
                    <img
                        src="/images/about-hero.png"
                        alt="Tropland Universe"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 15%' }}
                    />
                </div>

                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #0D0A1A 0%, rgba(13,10,26,0.55) 35%, rgba(13,10,26,0.1) 70%, transparent 100%)' }} />
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(13,10,26,0.75) 0%, rgba(13,10,26,0.2) 50%, transparent 100%)' }} />

                <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-14 md:pb-20">
                        <p className={`text-[13px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5 ${heroReveal()}`}
                            style={{ transitionDelay: '200ms' }}>
                            Est. 2013 · Los Angeles
                        </p>
                        <h1>
                            <TextReveal
                                className="block font-serif leading-[0.88] tracking-tight text-white"
                                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
                                delay={0.4}
                                wordDelay={0.12}
                            >
                                The Story
                            </TextReveal>
                            <TextReveal
                                className="block font-serif italic leading-[0.88] tracking-tight text-brand-accent"
                                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
                                delay={0.58}
                                wordDelay={0.12}
                            >
                                Behind It All.
                            </TextReveal>
                        </h1>
                        <p className={`mt-8 text-base md:text-lg text-white/60 font-sans font-light leading-relaxed max-w-sm ${heroReveal()}`}
                            style={{ transitionDelay: '700ms' }}>
                            A world that began in a rainforest and grew into a kingdom.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                ACT II — THE MYTHOLOGY
                Split: text left / live 3D forest right
            ═══════════════════════════════════════════════════════════ */}
            <section ref={secMythos.ref as any}
                className="py-16 md:py-24 bg-brand-cream relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 md:px-12">

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 lg:gap-16 items-start">

                        {/* Left: label + quote + body */}
                        <div>
                            <div className={secMythos.fade()} style={{ transitionDelay: '0ms' }}>
                                <p className="text-[13px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5">
                                    The Mythology
                                </p>
                            </div>

                            <div className={secMythos.fade()} style={{ transitionDelay: '80ms' }}>
                                <p className="font-serif italic text-brand-dark-text leading-[1.08] tracking-tight mb-8"
                                    style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                                    "Every great kingdom<br />
                                    begins with a forest."
                                </p>
                            </div>

                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${secMythos.fade()}`}
                                style={{ transitionDelay: '180ms' }}>
                                <p className="text-brand-dark-text/80 font-sans text-lg leading-relaxed">
                                    Tropland Universe is a character-driven wildlife media property unlike anything else in digital entertainment. Founded on original storytelling, it has grown from a children's book series into one of the most-followed AI content properties on earth.
                                </p>
                                <p className="text-brand-dark-text/80 font-sans text-lg leading-relaxed">
                                    The Tropland Rainforest is not a location. It is a mythology: populated by characters with depth, humor, and wonder, rendered in a cinematic visual language that is wholly its own. What lives here cannot be replicated.
                                </p>
                            </div>
                        </div>

                        {/* Right: rainforest image panel */}
                        <div className={`${secMythos.fade()} hidden lg:block sticky top-24`} style={{ transitionDelay: '220ms' }}>
                            <div className="relative rounded-3xl overflow-hidden border border-brand-dark-text/[0.08]" style={{ aspectRatio: '4/5' }}>
                                <img
                                    src="/images/trop-forest.png"
                                    alt="The Tropland Rainforest"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                ACT IV — THE ORIGIN
                Chapter I: book covers, warm accent bg, stands out.
                Chapters II + III: image ghost shells + text.
            ═══════════════════════════════════════════════════════════ */}
            <section ref={secOrigin.ref as any}
                className="py-24 md:py-32 bg-brand-deep text-white relative overflow-hidden">
                <CometBackground density={2} speed={0.5} />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                    <div className={`mb-12 ${secOrigin.fade()}`}>
                        <p className="text-[13px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5">
                            Origin
                        </p>
                        <h2 className="font-serif tracking-tight leading-[1]"
                            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                            <TextReveal delay={0.1} wordDelay={0.1}>How a rainforest</TextReveal>
                            <br />
                            <TextReveal className="italic text-brand-accent" delay={0.38} wordDelay={0.1}>became a kingdom.</TextReveal>
                        </h2>
                    </div>

                    {/* Chapter bento:
                        Row 1 — Chapter I: full width, horizontal split (books left / text right)
                        Row 2 — Chapter II + III: equal halves side by side
                    */}
                    <ul className={`grid grid-cols-1 gap-4 md:grid-cols-12 ${secOrigin.fade()}`}
                        style={{ transitionDelay: '120ms' }}>

                        {/* ── Chapter I: Full-width horizontal card — PREMIUM REDESIGN ── */}
                        <ChapterCard
                            area="md:col-span-12"
                            className="bg-gradient-to-br from-brand-accent/[0.10] via-white/[0.02] to-brand-purple/[0.04]"
                        >
                            <div className="flex flex-col md:flex-row" style={{ minHeight: '30rem' }}>

                                {/* LEFT: Dramatic book showcase */}
                                <div className="md:w-[52%] flex-shrink-0 relative overflow-hidden rounded-tl-[22px] rounded-bl-[22px]" style={{ minHeight: '22rem' }}>
                                    {/* Rich warm-dark backdrop */}
                                    <div className="absolute inset-0"
                                        style={{ background: 'linear-gradient(145deg, rgba(232,93,58,0.18) 0%, rgba(13,10,26,0.85) 55%, rgba(27,14,54,0.9) 100%)' }} />
                                    {/* Subtle grid texture */}
                                    <div className="absolute inset-0 pointer-events-none opacity-20"
                                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
                                    {/* Radial accent spotlight */}
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(232,93,58,0.18) 0%, transparent 65%)' }} />

                                    {/* Books — large fan display */}
                                    <div className="absolute inset-0 flex items-end justify-center pb-4 md:pb-6" style={{ perspective: '900px' }}>
                                        <div className="flex items-end justify-center w-full h-full px-4 md:px-8 gap-0">
                                            {[
                                                { src: '/images/jjb-01.png', alt: "Joosh's Juice Bar: Blue Banana Berry", rot: -14, tx: '8px', ty: '-8px', z: 1 },
                                                { src: '/images/jjb-02.png', alt: "Joosh's Juice Bar: Snack Book", rot: -5, tx: '2px', ty: '-18px', z: 2 },
                                                { src: '/images/rth.png', alt: 'Rockford T. Honeypot', rot: 4, tx: '-2px', ty: '-22px', z: 3 },
                                                { src: '/images/jjb-03.png', alt: "Joosh's Juice Bar: Tee Off", rot: 13, tx: '-8px', ty: '-10px', z: 1 },
                                            ].map((book, i) => (
                                                <div
                                                    key={book.src}
                                                    className="relative flex-shrink-0 group"
                                                    style={{
                                                        transform: `rotate(${book.rot}deg) translateX(${book.tx}) translateY(${book.ty})`,
                                                        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                                                        zIndex: book.z,
                                                    }}
                                                >
                                                    <img
                                                        src={book.src}
                                                        alt={book.alt}
                                                        className="w-auto object-cover rounded-lg"
                                                        style={{
                                                            height: 'clamp(200px, 30vh, 320px)',
                                                            boxShadow: '0 32px 64px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5), 4px 0 16px rgba(0,0,0,0.4)',
                                                        }}
                                                    />
                                                    {/* Spine highlight */}
                                                    <div className="absolute inset-y-0 left-0 w-[3px] rounded-l-sm pointer-events-none"
                                                        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.05))' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom label */}
                                    <div className="absolute bottom-0 inset-x-0 pointer-events-none"
                                        style={{ background: 'linear-gradient(to top, rgba(13,10,26,0.7) 0%, transparent 100%)', height: '5rem' }} />
                                    <p className="absolute bottom-4 inset-x-0 text-center text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-white/35 pointer-events-none">
                                        Four Original Volumes · 2013–2016
                                    </p>
                                </div>

                                {/* RIGHT: Editorial text column */}
                                <div className="flex-1 flex flex-col justify-between p-8 md:p-10 border-t md:border-t-0 md:border-l border-white/[0.07]">

                                    {/* Top: chapter label + numeral */}
                                    <div>
                                        <div className="flex items-start justify-between mb-5">
                                            <div>
                                                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-brand-accent/70 mb-2">
                                                    Chapter I · Series Origin
                                                </p>
                                                <p className="font-serif text-white leading-none"
                                                    style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
                                                    2013
                                                </p>
                                            </div>
                                            <span className="font-serif select-none hidden md:block"
                                                style={{ fontSize: '5.5rem', color: 'rgba(232,93,58,0.14)', lineHeight: 1, marginTop: '-0.75rem' }}>
                                                I
                                            </span>
                                        </div>
                                        {/* Accent rule */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(232,93,58,0.6), transparent)' }} />
                                        </div>
                                    </div>

                                    {/* Middle: heading + body */}
                                    <div className="flex-1 mb-7">
                                        <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 leading-[1.15]">
                                            The World Was<br />
                                            <span className="italic text-brand-accent">Written First.</span>
                                        </h3>
                                        <p className="text-white/65 font-sans text-[15px] leading-relaxed">
                                            It started with a rainforest and a story. The Joosh's Juice Bar series launched the Tropland mythology across three illustrated volumes plus a coloring book — original characters, original world, built from scratch. <span className="text-white/85 font-medium">The Adventures of Rockford T. Honeypot</span> followed in 2016, an Amazon #1 bestselling novel that deepened the canon and introduced Tropland beyond picture books.
                                        </p>
                                    </div>

                                    {/* Bottom: chapter timeline strip */}
                                    <div className="pt-5 border-t border-white/[0.07]">
                                        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-white/30 mb-4">The Three Chapters</p>
                                        <div className="flex items-stretch gap-0">
                                            {[
                                                { year: '2013', label: 'Books &\u00a0Print', active: true },
                                                { year: '2022', label: 'Digital\u00a0Era', active: false },
                                                { year: '2026', label: 'The\u00a0Kingdom', active: false },
                                            ].map((ch, i) => (
                                                <div key={ch.year} className="flex items-stretch gap-0 flex-1">
                                                    <div className={`flex-1 rounded-xl px-4 py-3 ${ch.active ? 'bg-brand-accent/15 border border-brand-accent/30' : 'border border-white/[0.07]'}`}>
                                                        <p className={`font-serif text-xl leading-none mb-1 ${ch.active ? 'text-brand-accent' : 'text-white/40'}`}>{ch.year}</p>
                                                        <p className="text-[11px] font-sans font-medium text-white/35 uppercase tracking-[0.15em]">{ch.label}</p>
                                                    </div>
                                                    {i < 2 && (
                                                        <div className="flex items-center px-2">
                                                            <div className="h-px w-3 bg-white/15" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </ChapterCard>

                        {/* ── Chapter II: Digital Evolution — left half ── */}
                        <ChapterCard area="md:col-span-6" className="bg-white/[0.025]">
                            <div className="relative z-10 flex flex-col p-7 md:p-8" style={{ minHeight: '21rem' }}>
                                <div className="mb-4">
                                    <p className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-white/50 mb-2">
                                        Chapter II
                                    </p>
                                    <p className="font-serif text-white leading-none"
                                        style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                                        2022
                                    </p>
                                </div>
                                {/* Image */}
                                <div className="relative rounded-xl overflow-hidden mb-5" style={{ aspectRatio: '16/9' }}>
                                    <img
                                        src="/images/chapter2.png"
                                        alt="Digital Evolution – Tropland Universe"
                                        className="w-full h-full object-cover"
                                        style={{ objectPosition: 'center 20%' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                </div>
                                <div className="mt-auto">
                                    <h3 className="font-sans text-[17px] font-bold text-white mb-2">
                                        Digital Evolution
                                    </h3>
                                    <p className="text-white/65 font-sans text-[15px] leading-relaxed">
                                        Tropland goes AI-native. The characters find a new cinematic visual language, reaching millions daily across every major platform.
                                    </p>
                                </div>
                            </div>
                        </ChapterCard>

                        {/* ── Chapter III: The Kingdom — right half ── */}
                        <ChapterCard area="md:col-span-6" className="bg-white/[0.025]">
                            <div className="relative z-10 flex flex-col p-7 md:p-8" style={{ minHeight: '21rem' }}>
                                <div className="mb-4">
                                    <p className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-white/50 mb-2">
                                        Chapter III
                                    </p>
                                    <p className="font-serif text-white leading-none"
                                        style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                                        2026
                                    </p>
                                </div>
                                {/* Image */}
                                <div className="relative rounded-xl overflow-hidden mb-5" style={{ aspectRatio: '16/9' }}>
                                    <img
                                        src="/images/chapter3.png"
                                        alt="The Kingdom – Tropland Universe"
                                        className="w-full h-full object-cover"
                                        style={{ objectPosition: 'center 20%' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                </div>
                                <div className="mt-auto">
                                    <h3 className="font-sans text-[17px] font-bold text-white mb-2">
                                        The Kingdom
                                    </h3>
                                    <p className="text-white/65 font-sans text-[15px] leading-relaxed">
                                        Over a billion views. Licensed by All American Licensing. Major brand partnerships. The rainforest becomes the Digital Animal Kingdom.
                                    </p>
                                </div>
                            </div>
                        </ChapterCard>

                    </ul>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                ACT V — THE INVITATION
            ═══════════════════════════════════════════════════════════ */}
            <section ref={secContact.ref as any}
                className="py-24 md:py-36 bg-brand-cream relative overflow-hidden cream-texture">
                <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

                        {/* Left: invitation copy */}
                        <div className="lg:col-span-5">
                            <div className={secContact.fade()}>
                                <p className="text-[13px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-6">
                                    Enter the Kingdom
                                </p>
                                <h2 className="font-serif tracking-tight leading-[1] mb-8 text-brand-dark-text"
                                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                                    Build with<br />
                                    <span className="italic text-brand-accent">Tropland.</span>
                                </h2>
                                <p className="text-brand-muted-light font-sans text-base leading-relaxed mb-10">
                                    For licensing inquiries, brand partnerships, and creative collaboration.
                                </p>
                                <div className="space-y-3">
                                    {['Brand partnerships', 'Character licensing', 'Content distribution'].map((item) => (
                                        <div key={item} className="flex items-center gap-3 text-brand-dark-text/60 font-sans text-[15px]">
                                            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: 'rgba(232,93,58,0.6)' }} />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        {/* Right: form */}
                        <div className="lg:col-span-7">
                            {formStatus === 'success' ? (
                                <div className={`rounded-2xl bg-brand-dark-text/[0.03] border border-brand-dark-text/[0.07] p-14 text-center ${secContact.fade()}`}
                                    style={{ transitionDelay: '100ms' }}>
                                    <CheckCircle size={36} className="text-brand-accent mx-auto mb-5" />
                                    <h3 className="font-serif text-2xl text-brand-dark-text mb-2">Message received.</h3>
                                    <p className="text-brand-muted font-sans text-[15px]">We'll be in touch within 48 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}
                                    className={`space-y-5 ${secContact.fade()}`}
                                    style={{ transitionDelay: '100ms' }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-[13px] font-sans font-semibold text-brand-dark-text/55 uppercase tracking-[0.15em] mb-2">
                                                Name
                                            </label>
                                            <input type="text" required value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full rounded-xl border border-brand-dark-text/[0.18] bg-brand-dark-text/[0.03] px-5 py-4 text-brand-dark-text font-sans text-[15px] placeholder-brand-dark-text/30 focus:outline-none focus:border-brand-accent/50 focus:bg-brand-dark-text/[0.05] transition-colors"
                                                placeholder="Your name" />
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-sans font-semibold text-brand-dark-text/55 uppercase tracking-[0.15em] mb-2">
                                                Email
                                            </label>
                                            <input type="email" required value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full rounded-xl border border-brand-dark-text/[0.18] bg-brand-dark-text/[0.03] px-5 py-4 text-brand-dark-text font-sans text-[15px] placeholder-brand-dark-text/30 focus:outline-none focus:border-brand-accent/50 focus:bg-brand-dark-text/[0.05] transition-colors"
                                                placeholder="Your email" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-sans font-semibold text-brand-dark-text/55 uppercase tracking-[0.15em] mb-2">
                                            Message
                                        </label>
                                        <textarea required rows={6} value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full rounded-xl border border-brand-dark-text/[0.18] bg-brand-dark-text/[0.03] px-5 py-4 text-brand-dark-text font-sans text-[15px] placeholder-brand-dark-text/30 focus:outline-none focus:border-brand-accent/50 focus:bg-brand-dark-text/[0.05] transition-colors resize-none"
                                            placeholder="Tell us about your project or inquiry" />
                                    </div>

                                    {formStatus === 'error' && (
                                        <div className="flex items-center gap-3 rounded-xl border border-red-600/30 bg-red-600/05 px-5 py-3">
                                            <AlertCircle size={16} className="text-red-500 shrink-0" />
                                            <p className="text-red-600 font-sans text-sm">
                                                Something went wrong. Email{' '}
                                                <a href="mailto:partnerships@troplanduniverse.com"
                                                    className="underline text-brand-accent">
                                                    partnerships@troplanduniverse.com
                                                </a>
                                            </p>
                                        </div>
                                    )}

                                    <div className="pt-2">
                                        <button type="submit" disabled={formStatus === 'submitting'}
                                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-[15px] hover:bg-brand-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(232,93,58,0.4)]">
                                            {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                                            <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
