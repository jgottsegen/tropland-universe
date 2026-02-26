import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import CometBackground from '../components/CometBackground';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');

    useEffect(() => { const t = setTimeout(() => setLoaded(true), 200); return () => clearTimeout(t); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const response = await fetch('https://formsubmit.co/ajax/partnerships@troplanduniverse.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ name, email, message, _subject: `New Tropland inquiry from ${name}` }),
            });
            if (response.ok) { setStatus('success'); setName(''); setEmail(''); setMessage(''); }
            else setStatus('error');
        } catch { setStatus('error'); }
    };

    const fade = () =>
        `transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

    return (
        <div className="min-h-screen bg-brand-deep">

            {/* ═══════════════════════════════════════════════════════════
                CONTACT — Split layout: info + form
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <CometBackground density={3} speed={0.8} />
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-brand-accent/12 rounded-full blur-[250px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-brand-purple/15 rounded-full blur-[200px] pointer-events-none"></div>
                <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none ambient-glow"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full py-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

                        {/* Left: Info */}
                        <div>
                            <div className={fade()} style={{ transitionDelay: '200ms' }}>
                                <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-brand-accent mb-6">
                                    Contact
                                </p>
                            </div>

                            <h1 className={`font-serif text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[0.9] tracking-tight text-white mb-6 ${fade()}`} style={{ transitionDelay: '400ms' }}>
                                Let's build <span className="italic text-brand-accent">something.</span>
                            </h1>

                            <p className={`text-lg text-white/50 font-sans font-light leading-relaxed mb-10 max-w-lg ${fade()}`} style={{ transitionDelay: '600ms' }}>
                                For licensing inquiries, brand partnerships, and collaboration opportunities.
                                We typically respond within 48 hours.
                            </p>

                            <div className={`space-y-4 mb-10 ${fade()}`} style={{ transitionDelay: '700ms' }}>
                                <div className="flex items-center gap-3">
                                    <Mail size={16} className="text-white/45" />
                                    <a href="mailto:partnerships@troplanduniverse.com" className="text-white/50 hover:text-brand-accent transition-colors font-sans text-sm underline underline-offset-2">
                                        partnerships@troplanduniverse.com
                                    </a>
                                </div>
                            </div>

                            <div className={`flex items-center gap-3 ${fade()}`} style={{ transitionDelay: '800ms' }}>
                                {[
                                    { icon: Instagram, href: 'https://instagram.com/troplanduniverse', label: 'Instagram' },
                                    { icon: Facebook, href: 'https://facebook.com/troplanduniverse', label: 'Facebook' },
                                    { icon: Youtube, href: 'https://youtube.com/@troplanduniverse', label: 'YouTube' },
                                ].map(social => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:border-brand-accent/30 transition-all duration-300"
                                            aria-label={social.label}
                                        >
                                            <Icon size={16} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className={fade()} style={{ transitionDelay: '500ms' }}>
                            {status === 'success' ? (
                                <div className="glass rounded-3xl p-12 text-center">
                                    <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                                    <h3 className="font-serif text-2xl text-white mb-2">Message sent!</h3>
                                    <p className="text-white/40 font-sans text-sm">We'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-sans font-semibold text-white/55 uppercase tracking-[0.15em] mb-2">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full glass rounded-xl px-5 py-4 text-white font-sans text-sm bg-transparent placeholder-white/45 focus:outline-none focus:border-brand-accent/40 transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-sans font-semibold text-white/55 uppercase tracking-[0.15em] mb-2">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full glass rounded-xl px-5 py-4 text-white font-sans text-sm bg-transparent placeholder-white/45 focus:outline-none focus:border-brand-accent/40 transition-colors"
                                                placeholder="Your email"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-sans font-semibold text-white/55 uppercase tracking-[0.15em] mb-2">Message</label>
                                        <textarea
                                            required
                                            rows={6}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full glass rounded-xl px-5 py-4 text-white font-sans text-sm bg-transparent placeholder-white/45 focus:outline-none focus:border-brand-accent/40 transition-colors resize-none"
                                            placeholder="Tell us about your project or inquiry"
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="flex items-center gap-3 glass rounded-xl px-5 py-3 border-red-500/20">
                                            <AlertCircle size={16} className="text-red-400" />
                                            <p className="text-red-300 font-sans text-sm">
                                                Something went wrong. Try emailing{' '}
                                                <a href="mailto:partnerships@troplanduniverse.com" className="underline text-brand-accent">
                                                    partnerships@troplanduniverse.com
                                                </a>
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(232,93,58,0.3)]"
                                    >
                                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                        <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactPage;
