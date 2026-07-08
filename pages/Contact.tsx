import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, CheckCircle, AlertCircle, Instagram, Facebook, Youtube } from 'lucide-react';
import SectionTag from '../components/fx/SectionTag';
import Reveal from '../components/fx/Reveal';
import MagneticButton from '../components/MagneticButton';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
    'w-full bg-transparent border-b border-bone/20 px-0 py-4 text-bone font-display text-lg placeholder-bone/30 focus:outline-none focus:border-ember transition-colors duration-300';

const socials = [
    { icon: Instagram, href: 'https://instagram.com/troplanduniverse', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/troplanduniverse', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com/@troplanduniverse', label: 'YouTube' },
];

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, source: 'Contact Page' }),
            });
            if (response.ok) { setStatus('success'); setName(''); setEmail(''); setMessage(''); }
            else setStatus('error');
        } catch { setStatus('error'); }
    };

    return (
        <div className="min-h-screen bg-ink-2">
            <Helmet>
                <title>Contact · Tropland Universe</title>
                <meta name="description" content="Partner with Tropland Universe on licensing, brand campaigns, and content collaborations. Direct line to the studio." />
                <meta property="og:title" content="Contact · Tropland Universe™" />
                <meta property="og:description" content="Partner with Tropland Universe on licensing, brand campaigns, and content collaborations. Direct line to the studio." />
                <meta property="og:url" content="https://troplanduniverse.com/contact" />
            </Helmet>

            {/* ═══════════════════════════════════════════════════════════
                CONTACT — Split layout: info + form
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-2">

                {/* Ember horizon glow */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none ambient-glow"
                    style={{ background: 'radial-gradient(ellipse, rgba(255,77,28,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
                />

                <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10 w-full pt-28 pb-20 md:pt-32 md:pb-24">

                    <Reveal>
                        <SectionTag index="01" label="Contact" className="mb-8 md:mb-10" />
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                        {/* Left: Info */}
                        <div className="lg:col-span-5">
                            <Reveal>
                                <h1 className="font-display font-extrabold text-[11vw] md:text-[4.4vw] leading-[0.95] tracking-[-0.02em] text-bone uppercase mb-8">
                                    Let's build<br />
                                    <span className="font-edit italic font-light normal-case text-ember tracking-normal">something.</span>
                                </h1>
                            </Reveal>

                            <Reveal delay={0.1}>
                                <p className="font-display font-light text-lg text-bone/60 leading-relaxed max-w-sm mb-10">
                                    For licensing inquiries, brand partnerships, and collaboration opportunities.
                                </p>

                                <div className="space-y-3 mb-12">
                                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone/40">Direct line</p>
                                    <a
                                        href="mailto:partnerships@troplanduniverse.com"
                                        className="tu-link font-display text-lg md:text-xl text-bone hover:text-ember transition-colors duration-300 inline-block"
                                    >
                                        partnerships@troplanduniverse.com
                                    </a>
                                </div>

                                <div className="flex items-center gap-3">
                                    {socials.map(({ icon: Icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-11 h-11 border border-bone/20 flex items-center justify-center text-bone/55 hover:text-ember hover:border-ember transition-colors duration-300"
                                            aria-label={label}
                                        >
                                            <Icon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:col-span-7">
                            {status === 'success' ? (
                                <Reveal>
                                    <div className="border border-bone/15 p-12 text-center">
                                        <CheckCircle size={44} className="text-ember mx-auto mb-5" />
                                        <h3 className="font-display font-bold text-2xl text-bone mb-2">Message sent!</h3>
                                        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/45">
                                            We'll get back to you shortly
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

                                        {status === 'error' && (
                                            <div className="flex items-center gap-3 border border-ember/30 px-5 py-3">
                                                <AlertCircle size={15} className="text-ember" />
                                                <p className="text-bone/70 font-display text-sm">
                                                    Something went wrong. Try emailing{' '}
                                                    <a href="mailto:partnerships@troplanduniverse.com" className="underline text-ember">
                                                        partnerships@troplanduniverse.com
                                                    </a>
                                                </p>
                                            </div>
                                        )}

                                        <MagneticButton>
                                            <button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="group inline-flex items-center gap-3 px-10 py-5 bg-ember text-ink font-display font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-ember-soft transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {status === 'submitting' ? 'Sending…' : 'Send Message'}
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

export default ContactPage;
