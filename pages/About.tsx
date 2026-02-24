import React, { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import CometBackground from '../components/CometBackground';
import { GlowingEffect } from '../components/GlowingEffect';
import { ForestScene } from '../components/ForestScene';

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

    const secMythos    = useFadeIn();
    const secOrigin    = useFadeIn();
    const secVisionary = useFadeIn();
    const secContact   = useFadeIn();

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
                        src="/images/hero-lion.png"
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
                        <p className={`text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5 ${heroReveal()}`}
                            style={{ transitionDelay: '200ms' }}>
                            Est. 2013 · Los Angeles
                        </p>
                        <h1 className={heroReveal()} style={{ transitionDelay: '400ms' }}>
                            <span className="block font-serif leading-[0.88] tracking-tight text-white"
                                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}>
                                The Story
                            </span>
                            <span className="block font-serif italic leading-[0.88] tracking-tight text-brand-accent"
                                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}>
                                Behind It All.
                            </span>
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
                                <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5">
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
                                <p className="text-brand-muted-light font-sans text-base leading-relaxed">
                                    Tropland Universe is a character-driven wildlife media property unlike anything else in digital entertainment. Founded on original storytelling, it has grown from a children's book series into one of the most-followed AI content properties on earth.
                                </p>
                                <p className="text-brand-muted-light font-sans text-base leading-relaxed">
                                    The Tropland Rainforest is not a location. It is a mythology — populated by characters with depth, humor, and wonder, rendered in a cinematic visual language that is wholly its own. What lives here cannot be replicated.
                                </p>
                            </div>
                        </div>

                        {/* Right: live 3D forest panel — tall card */}
                        <div className={`${secMythos.fade()} hidden lg:block sticky top-24`} style={{ transitionDelay: '220ms' }}>
                            <div className="relative rounded-3xl overflow-hidden border border-black/[0.06]"
                                style={{ aspectRatio: '4/5' }}>
                                <ForestScene />
                                {/* Cream edge fades — subtle, let the forest breathe */}
                                <div className="absolute inset-0 pointer-events-none rounded-3xl"
                                    style={{ boxShadow: 'inset 0 0 32px 12px #F5F0EB' }} />
                            </div>
                            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-brand-accent/50 text-center mt-3">
                                Live 3D · The Tropland Rainforest
                            </p>
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
                        <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5">
                            Origin
                        </p>
                        <h2 className="font-serif tracking-tight leading-[1]"
                            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                            How a rainforest<br />
                            <span className="italic text-brand-accent">became a kingdom.</span>
                        </h2>
                    </div>

                    {/* Chapter bento:
                        Row 1 — Chapter I: full width, horizontal split (books left / text right)
                        Row 2 — Chapter II + III: equal halves side by side
                    */}
                    <ul className={`grid grid-cols-1 gap-4 md:grid-cols-12 ${secOrigin.fade()}`}
                        style={{ transitionDelay: '120ms' }}>

                        {/* ── Chapter I: Full-width horizontal card ── */}
                        <ChapterCard
                            area="md:col-span-12"
                            className="bg-gradient-to-br from-brand-accent/[0.08] via-white/[0.02] to-transparent"
                        >
                            <div className="flex flex-col md:flex-row" style={{ minHeight: '21rem' }}>

                                {/* LEFT: Book covers with warm stage-light bg */}
                                <div className="md:w-[38%] flex-shrink-0 relative flex items-center justify-center p-8 md:p-10">
                                    {/* Gradient wash */}
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ background: 'linear-gradient(135deg, rgba(232,93,58,0.11) 0%, rgba(212,133,26,0.05) 55%, transparent 100%)' }} />
                                    {/* Warm glow orb */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full pointer-events-none"
                                        style={{ background: 'rgba(232,93,58,0.09)', filter: 'blur(44px)' }} />
                                    {/* Books */}
                                    <div className="relative z-10 flex items-end gap-4">
                                        <div className="book-cover" style={{ width: '108px' }}>
                                            <div className="book-inner rounded-lg overflow-hidden" style={{ aspectRatio: '2/3' }}>
                                                <img src="/images/book-banana.jpg" alt="Joosh's Juice Bar"
                                                    className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="book-cover -mb-4" style={{ width: '126px' }}>
                                            <div className="book-inner rounded-lg overflow-hidden" style={{ aspectRatio: '2/3' }}>
                                                <img src="/images/book-rockford.jpg" alt="The Adventures of Rockford T. Honeypot"
                                                    className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: Text — separated by a subtle vertical rule */}
                                <div className="flex-1 flex flex-col justify-between p-7 md:p-9 border-t md:border-t-0 md:border-l border-white/[0.07]">
                                    {/* Top: label + numeral */}
                                    <div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-white/55 mb-1">
                                                    Chapter I · 2013
                                                </p>
                                                <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em]"
                                                    style={{ color: 'rgba(232,93,58,0.65)' }}>
                                                    Series Origin
                                                </p>
                                            </div>
                                            <span className="font-serif select-none"
                                                style={{ fontSize: '4.5rem', color: 'rgba(232,93,58,0.18)', lineHeight: 1, marginTop: '-0.5rem' }}>
                                                I
                                            </span>
                                        </div>
                                        <div className="w-8 h-px mb-0" style={{ background: 'rgba(232,93,58,0.5)' }} />
                                    </div>
                                    {/* Bottom: heading + body */}
                                    <div>
                                        <h3 className="font-serif text-xl md:text-2xl text-white mb-3 leading-tight">
                                            The World Was Written First.
                                        </h3>
                                        <p className="text-white/65 font-sans text-sm md:text-[0.9rem] leading-relaxed max-w-md">
                                            The Joosh's Juice Bar series launched the Tropland mythology across three volumes plus a coloring book. <span className="text-white/82">The Adventures of Rockford T. Honeypot</span> followed in 2016 — a second original IP rooted in the same universe.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </ChapterCard>

                        {/* ── Chapter II: Digital Evolution — left half ── */}
                        <ChapterCard area="md:col-span-6" className="bg-white/[0.025]">
                            {/* Subtle atmospheric ghost */}
                            <div className="absolute inset-0 opacity-35">
                                <GhostShell className="w-full h-full rounded-none" delay="0.3s" />
                            </div>
                            <div className="relative z-10 flex flex-col p-7 md:p-8" style={{ minHeight: '21rem' }}>
                                <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-white/55 mb-4">
                                    Chapter II
                                </p>
                                {/* Image placeholder */}
                                <div className="relative rounded-xl overflow-hidden mb-5" style={{ aspectRatio: '16/9' }}>
                                    <GhostShell className="w-full h-full rounded-none" delay="0.5s" label="Image Coming" />
                                </div>
                                <div className="mt-auto">
                                    <span className="block font-serif leading-none mb-2 select-none"
                                        style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: 'rgba(232,93,58,0.28)' }}>
                                        2022
                                    </span>
                                    <h3 className="font-sans text-base font-bold text-white mb-2">
                                        Digital Evolution
                                    </h3>
                                    <p className="text-white/65 font-sans text-sm leading-relaxed">
                                        Tropland goes AI-native. The characters find a new cinematic visual language — reaching millions daily across every major platform.
                                    </p>
                                </div>
                            </div>
                        </ChapterCard>

                        {/* ── Chapter III: The Kingdom — right half ── */}
                        <ChapterCard area="md:col-span-6" className="bg-white/[0.025]">
                            {/* Subtle atmospheric ghost */}
                            <div className="absolute inset-0 opacity-35">
                                <GhostShell className="w-full h-full rounded-none" delay="0.8s" />
                            </div>
                            <div className="relative z-10 flex flex-col p-7 md:p-8" style={{ minHeight: '21rem' }}>
                                <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-white/55 mb-4">
                                    Chapter III
                                </p>
                                {/* Image placeholder */}
                                <div className="relative rounded-xl overflow-hidden mb-5" style={{ aspectRatio: '16/9' }}>
                                    <GhostShell className="w-full h-full rounded-none" delay="1.1s" label="Image Coming" />
                                </div>
                                <div className="mt-auto">
                                    <span className="block font-serif leading-none mb-2 select-none"
                                        style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: 'rgba(232,93,58,0.28)' }}>
                                        2026
                                    </span>
                                    <h3 className="font-sans text-base font-bold text-white mb-2">
                                        The Kingdom
                                    </h3>
                                    <p className="text-white/65 font-sans text-sm leading-relaxed">
                                        Over a billion views. Licensed by All American Licensing. Major brand partnerships. The rainforest becomes the Digital Animal Kingdom.
                                    </p>
                                </div>
                            </div>
                        </ChapterCard>

                    </ul>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                ACT IV — THE VISIONARY
                Dark editorial. Warm glow behind portrait.
                Two floating glass chips. Stats row. Ghost "JG" backdrop.
            ═══════════════════════════════════════════════════════════ */}
            <section ref={secVisionary.ref as any}
                className="py-24 md:py-36 bg-brand-deep text-white relative overflow-hidden">
                <CometBackground density={2} speed={0.45} />

                {/* Ghost letterforms — decorative backdrop */}
                <div className="absolute right-0 top-0 font-serif select-none pointer-events-none leading-[0.8] tracking-tighter overflow-hidden"
                    style={{ fontSize: 'min(42vw, 520px)', color: 'rgba(255,255,255,0.016)' }}>
                    JG
                </div>

                <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">

                        {/* LEFT: Bio + Stats */}
                        <div className={`lg:col-span-5 lg:pt-6 ${secVisionary.fade()}`}>
                            <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-6">
                                The Visionary
                            </p>
                            <h2 className="font-serif tracking-tight leading-[0.9] text-white mb-9"
                                style={{ fontSize: 'clamp(3.2rem, 6vw, 5.5rem)' }}>
                                Josh<br />
                                <span className="italic text-brand-accent">Gottsegen</span>
                            </h2>

                            <div className="space-y-5 text-white/60 font-sans text-base md:text-lg leading-relaxed mb-10">
                                <p>
                                    Twenty-five years across design, film production, and entertainment. Collaborations with Universal Studios, Disney, Fox, IMG, the NFL, IndyCar, Ferrari, and the Vatican Museums.
                                </p>
                                <p>
                                    He built Tropland from a picture book to a billion-view global IP — not by following a playbook, but by refusing to write in anyone else's world.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-5 pt-8 border-t border-white/[0.07]">
                                {[
                                    { num: '25+', label: 'Years in\nentertainment' },
                                    { num: '1B+',  label: 'Content\nviews' },
                                    { num: '#1',   label: 'AI Art Influencer\n2025 & 2026' },
                                ].map(({ num, label }) => (
                                    <div key={num}>
                                        <p className="font-serif text-white leading-none mb-2"
                                            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
                                            {num}
                                        </p>
                                        <p className="text-white/35 font-sans text-[10px] leading-snug tracking-wide whitespace-pre-line">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Credits */}
                            <div className="mt-10 pt-8 border-t border-white/[0.05]">
                                <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-white/25 mb-3">
                                    Credited with
                                </p>
                                <p className="text-white/30 font-sans text-sm leading-relaxed">
                                    Universal Studios · Disney · Fox · IMG<br />
                                    NFL · IndyCar · Ferrari · Vatican Museums
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Portrait + floating chips */}
                        <div className={`lg:col-span-7 ${secVisionary.fade()}`}
                            style={{ transitionDelay: '160ms' }}>

                            {/* Outer wrapper — no overflow hidden, so chips can escape */}
                            <div className="relative">

                                {/* Warm radial glow behind portrait */}
                                <div className="absolute rounded-3xl pointer-events-none"
                                    style={{
                                        inset: '-10%',
                                        background: 'radial-gradient(ellipse at 55% 35%, rgba(232,93,58,0.24) 0%, rgba(212,133,26,0.1) 35%, transparent 65%)',
                                        filter: 'blur(48px)',
                                    }} />

                                {/* Portrait frame — overflow hidden keeps image contained */}
                                <div className="group relative rounded-2xl overflow-hidden border border-white/[0.08]"
                                    style={{ aspectRatio: '4/5' }}>
                                    <img
                                        src="/images/josh-gottsegen.png"
                                        alt="Josh Gottsegen, Founder of Tropland Universe"
                                        className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                                    />
                                    {/* Bottom vignette fading to page bg */}
                                    <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                                        style={{ background: 'linear-gradient(to top, #0D0A1A 0%, rgba(13,10,26,0.65) 45%, transparent 100%)' }} />
                                    {/* Hover warm wash */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                        style={{ background: 'linear-gradient(to top, rgba(232,93,58,0.12) 0%, transparent 55%)' }} />
                                    {/* Caption at base */}
                                    <div className="absolute bottom-0 left-0 p-5 md:p-7">
                                        <p className="font-sans text-white/50 text-xs tracking-[0.15em] uppercase">
                                            Founder, Tropland Universe
                                        </p>
                                    </div>
                                </div>

                                {/* ── Floating chip: top-left ── */}
                                <div className="absolute z-20 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl"
                                    style={{
                                        top: '-1rem',
                                        left: '-1.5rem',
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '1px solid rgba(255,255,255,0.13)',
                                    }}>
                                    <p className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-brand-accent mb-1">
                                        #1 Ranked
                                    </p>
                                    <p className="text-white font-sans font-semibold text-sm leading-tight">
                                        AI Art Influencer
                                    </p>
                                    <p className="text-white/35 text-[9px] font-sans mt-0.5">
                                        Feedspot · 2025 &amp; 2026
                                    </p>
                                </div>

                                {/* ── Floating chip: bottom-right ── */}
                                <div className="absolute z-20 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl text-right"
                                    style={{
                                        bottom: '-1rem',
                                        right: '-1.5rem',
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '1px solid rgba(255,255,255,0.13)',
                                    }}>
                                    <p className="font-serif text-white leading-none"
                                        style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
                                        1B+
                                    </p>
                                    <p className="text-white/35 text-[9px] font-sans tracking-[0.15em] uppercase mt-1">
                                        Content Views
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
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
                                <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-6">
                                    Enter the Kingdom
                                </p>
                                <h2 className="font-serif tracking-tight leading-[1] mb-8 text-brand-dark-text"
                                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                                    Build with<br />
                                    <span className="italic text-brand-accent">Tropland.</span>
                                </h2>
                                <p className="text-brand-muted-light font-sans text-base leading-relaxed mb-10">
                                    For licensing inquiries, brand partnerships, and creative collaboration. We respond within 48 hours.
                                </p>
                                <div className="space-y-3">
                                    {['Brand partnerships', 'Character licensing', 'Content distribution'].map((item) => (
                                        <div key={item} className="flex items-center gap-3 text-brand-muted font-sans text-sm">
                                            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: 'rgba(232,93,58,0.6)' }} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-14 pt-10 border-t border-brand-dark-text/[0.07]">
                                    <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-brand-muted mb-3">
                                        Trusted by
                                    </p>
                                    <p className="text-brand-dark-text/40 font-sans text-sm leading-relaxed">
                                        Adobe · Meta · OpenAI<br />Topaz Labs · Kling AI
                                    </p>
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
                                    <p className="text-brand-muted font-sans text-sm">We'll be in touch within 48 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}
                                    className={`space-y-5 ${secContact.fade()}`}
                                    style={{ transitionDelay: '100ms' }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-[10px] font-sans font-semibold text-brand-muted uppercase tracking-[0.2em] mb-2">
                                                Name
                                            </label>
                                            <input type="text" required value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full rounded-xl border border-brand-dark-text/[0.12] bg-brand-dark-text/[0.03] px-5 py-4 text-brand-dark-text font-sans text-sm placeholder-brand-muted focus:outline-none focus:border-brand-accent/50 focus:bg-brand-dark-text/[0.05] transition-colors"
                                                placeholder="Your name" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-sans font-semibold text-brand-muted uppercase tracking-[0.2em] mb-2">
                                                Email
                                            </label>
                                            <input type="email" required value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full rounded-xl border border-brand-dark-text/[0.12] bg-brand-dark-text/[0.03] px-5 py-4 text-brand-dark-text font-sans text-sm placeholder-brand-muted focus:outline-none focus:border-brand-accent/50 focus:bg-brand-dark-text/[0.05] transition-colors"
                                                placeholder="Your email" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-sans font-semibold text-brand-muted uppercase tracking-[0.2em] mb-2">
                                            Message
                                        </label>
                                        <textarea required rows={6} value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full rounded-xl border border-brand-dark-text/[0.12] bg-brand-dark-text/[0.03] px-5 py-4 text-brand-dark-text font-sans text-sm placeholder-brand-muted focus:outline-none focus:border-brand-accent/50 focus:bg-brand-dark-text/[0.05] transition-colors resize-none"
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
                                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(232,93,58,0.4)]">
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
