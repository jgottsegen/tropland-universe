import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Globe, Tv, ShoppingBag, Gamepad2, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

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

// ─── Stats ─────────────────────────────────────────────────────────────────
const stats = [
    { value: '1B+', label: 'Content Views Worldwide' },
    { value: '#1', label: 'AI Art Influencer 2025 & 2026' },
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
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { const t = setTimeout(() => setLoaded(true), 200); return () => clearTimeout(t); }, []);

    const sec2 = useFadeIn();

    const introFade = () =>
        `transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

    return (
        <div className="bg-brand-deep min-h-screen">

            {/* ═══════════════════════════════════════════════════════════
                SECTION 1 — Scrolling image background + glass overlay
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden">

                {/* Scrolling image background */}
                <div className="absolute inset-0 flex flex-col justify-center gap-2 pointer-events-none">
                    {/* Row 1 — scrolls left */}
                    <div className="flex-1 overflow-hidden flex items-center">
                        <div
                            className="flex gap-2 h-[90%]"
                            style={{
                                width: 'max-content',
                                animation: 'scrollL 60s linear infinite',
                            }}
                        >
                            {[...row1, ...row1].map((src, i) => (
                                <img key={i} src={src} alt="" className="h-full w-auto min-w-[340px] object-cover rounded-sm" />
                            ))}
                        </div>
                    </div>
                    {/* Row 2 — scrolls right */}
                    <div className="flex-1 overflow-hidden flex items-center">
                        <div
                            className="flex gap-2 h-[90%]"
                            style={{
                                width: 'max-content',
                                animation: 'scrollR 75s linear infinite',
                            }}
                        >
                            {[...row2, ...row2].map((src, i) => (
                                <img key={i} src={src} alt="" className="h-full w-auto min-w-[340px] object-cover rounded-sm" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dim overlay */}
                <div className="absolute inset-0" style={{ background: 'rgba(13,10,26,0.88)' }} />

                {/* Gradient warmth */}
                <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(232,93,58,0.06) 0%, transparent 60%)' }} />

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-32 md:py-40 text-center w-full">

                    <p className={`text-sm font-sans font-bold uppercase tracking-[0.3em] text-brand-accent mb-8 ${introFade()}`}
                        style={{ transitionDelay: '200ms' }}>
                        Licensing &amp; Partnerships
                    </p>

                    <h1 className={`font-serif leading-[1.05] tracking-tight text-white mb-8 ${introFade()}`}
                        style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', transitionDelay: '320ms' }}>
                        Bring Tropland to <span className="italic text-brand-accent">your brand.</span>
                    </h1>

                    <p className={`text-2xl md:text-3xl text-white/80 font-sans font-medium leading-relaxed max-w-3xl mx-auto mb-6 ${introFade()}`}
                        style={{ transitionDelay: '480ms' }}>
                        Tropland Universe™ is a character-driven wildlife media property with over a billion content views,
                        a 50K+ image and video library, and a global audience that spans all ages.
                    </p>

                    <p className={`text-xl text-white/60 font-sans leading-relaxed max-w-2xl mx-auto mb-16 ${introFade()}`}
                        style={{ transitionDelay: '560ms' }}>
                        Licensing is managed exclusively by <strong className="text-white/90 font-semibold">All American Licensing</strong>,
                        representing the property across consumer products, publishing, digital media, and entertainment worldwide.
                    </p>

                    {/* Key stats row */}
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 ${introFade()}`} style={{ transitionDelay: '640ms' }}>
                        {stats.map(s => (
                            <div key={s.label} className="glass rounded-2xl p-6 md:p-8 text-center border-shine">
                                <p className="font-serif text-brand-accent mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                                    {s.value}
                                </p>
                                <p className="font-sans text-white/65 text-base font-medium leading-snug">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${introFade()}`} style={{ transitionDelay: '720ms' }}>
                        <Link
                            to="/contact"
                            onClick={() => window.scrollTo(0, 0)}
                            className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-brand-accent text-white font-sans font-semibold text-lg hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,93,58,0.4)]"
                        >
                            Inquire About Licensing
                            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                        <a
                            href="https://www.aalmg.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border border-white/20 text-white font-sans font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                        >
                            Visit All American Licensing
                            <ArrowUpRight size={16} />
                        </a>
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION 2 — Cream editorial: categories + opportunity
            ═══════════════════════════════════════════════════════════ */}
            <section ref={sec2.ref as any} className="py-24 md:py-36 bg-brand-cream text-brand-dark-text relative overflow-hidden cream-texture">
                <div className="max-w-6xl mx-auto px-6 md:px-12">

                    <div className="text-center mb-20">
                        <p className={`text-sm font-sans font-bold uppercase tracking-[0.25em] text-brand-accent mb-8 ${sec2.fade()}`}>
                            The Opportunity
                        </p>
                        <h2 className={`font-serif leading-tight text-brand-dark-text mb-8 ${sec2.fade()}`}
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', transitionDelay: '80ms' }}>
                            A world of characters <span className="italic text-brand-accent">ready for product.</span>
                        </h2>
                        <p className={`text-xl md:text-2xl text-brand-dark-text/75 font-sans leading-relaxed max-w-3xl mx-auto ${sec2.fade()}`}
                            style={{ transitionDelay: '160ms' }}>
                            From the Tropland Forest to the Digital Animal Kingdom, our IP spans original children's books,
                            a globally ranked social media presence, and a character roster built for merchandise, media, and experiential activations.
                        </p>
                    </div>

                    {/* Product Categories Grid */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 ${sec2.fade()}`} style={{ transitionDelay: '240ms' }}>
                        {categories.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-brand-border-light/50 hover:border-brand-accent/30 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-brand-accent/10 border border-brand-accent/15 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors duration-300">
                                    <Icon size={26} className="text-brand-accent" />
                                </div>
                                <h3 className="font-sans font-bold text-xl text-brand-dark-text mb-3">{label}</h3>
                                <p className="font-sans text-base text-brand-muted leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Brand pillars */}
                    <div className={`bg-white/50 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-brand-border-light/40 mb-16 ${sec2.fade()}`} style={{ transitionDelay: '320ms' }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-sm font-sans font-bold uppercase tracking-[0.25em] text-brand-accent mb-5">Why Tropland</p>
                                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-brand-dark-text mb-6">
                                    Original IP. Global reach. <span className="italic text-brand-accent">Values-driven.</span>
                                </h3>
                                <p className="font-sans text-lg text-brand-dark-text/75 leading-relaxed mb-6">
                                    Tropland Universe™ is built on a foundation of original storytelling, beginning with published
                                    children's books in 2013 and evolving into a billion-view digital brand. Every character,
                                    narrative, and visual asset is wholly owned by OneLight Studios.
                                </p>
                                <p className="font-sans text-lg text-brand-dark-text/75 leading-relaxed">
                                    The brand's core themes of wildlife conservation, family, wellness, and curiosity
                                    position it naturally for family-friendly product lines across all major retail categories.
                                </p>
                            </div>
                            <div className="space-y-5">
                                {[
                                    { label: 'Wholly Owned IP', desc: 'All characters, stories, and visual assets are original and creator-owned' },
                                    { label: 'Proven Global Audience', desc: 'Ranked #1 AI Art Influencer with a worldwide fanbase across all platforms' },
                                    { label: 'Multi-Format Ready', desc: 'Publishing, social, video, and digital assets available for activation' },
                                    { label: 'Values-Aligned', desc: 'Family-friendly, wellness-focused, and conservation-positive brand positioning' },
                                ].map(item => (
                                    <div key={item.label} className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-brand-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                                        </div>
                                        <div>
                                            <p className="font-sans font-bold text-lg text-brand-dark-text">{item.label}</p>
                                            <p className="font-sans text-base text-brand-muted leading-snug mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className={`text-center ${sec2.fade()}`} style={{ transitionDelay: '400ms' }}>
                        <p className="font-sans text-xl text-brand-dark-text/70 mb-8 leading-relaxed max-w-2xl mx-auto">
                            For licensing inquiries, contact <strong className="text-brand-dark-text font-semibold">All American Licensing</strong> or
                            reach out to our partnerships team directly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                onClick={() => window.scrollTo(0, 0)}
                                className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-brand-accent text-white font-sans font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,93,58,0.3)]"
                            >
                                Contact Partnerships
                                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                            <a
                                href="mailto:partnerships@troplanduniverse.com"
                                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border border-brand-dark-text/20 text-brand-dark-text font-sans font-semibold text-lg hover:bg-brand-dark-text/5 hover:border-brand-dark-text/40 transition-all duration-300"
                            >
                                partnerships@troplanduniverse.com
                            </a>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default LicensingPage;
