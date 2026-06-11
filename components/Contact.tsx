import React, { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import SectionTag from './fx/SectionTag';
import Reveal from './fx/Reveal';
import MagneticButton from './MagneticButton';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full bg-transparent border-b border-bone/20 px-0 py-4 text-bone font-display text-lg placeholder-bone/30 focus:outline-none focus:border-ember transition-colors duration-300';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('https://formsubmit.co/ajax/partnerships@troplanduniverse.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: `New Tropland inquiry from ${name}` }),
      });
      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-ink-2 relative overflow-hidden">

      {/* Ember horizon glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none ambient-glow"
        style={{ background: 'radial-gradient(ellipse, rgba(255,77,28,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-[1480px] mx-auto px-6 md:px-12 relative z-10">

        <Reveal>
          <SectionTag index="07" label="Contact" className="mb-12 md:mb-16" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: headline + direct line */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display font-extrabold text-[11vw] md:text-[4.4vw] leading-[0.95] tracking-[-0.02em] text-bone uppercase mb-8">
                Start the<br />
                <span className="font-edit italic font-light normal-case text-ember tracking-normal">conversation.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display font-light text-lg text-bone/60 leading-relaxed max-w-sm mb-10">
                Licensing inquiries, brand partnerships, and collaboration
                opportunities. Direct to the studio, answered by the founder.
              </p>
              <div className="space-y-3">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone/40">Direct line</p>
                <a
                  href="mailto:partnerships@troplanduniverse.com"
                  className="tu-link font-display text-lg md:text-xl text-bone hover:text-ember transition-colors duration-300 inline-block"
                >
                  partnerships@troplanduniverse.com
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <Reveal>
                <div className="border border-bone/15 p-12 text-center">
                  <CheckCircle size={44} className="text-ember mx-auto mb-5" />
                  <h3 className="font-display font-bold text-2xl text-bone mb-2">Message received.</h3>
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/45">
                    We'll get back to you shortly
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.15}>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label className="block font-mono text-[10px] tracking-[0.22em] uppercase text-bone/45 mb-1">
                        01 — Name
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
                        02 — Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.22em] uppercase text-bone/45 mb-1">
                      03 — Message
                    </label>
                    <textarea
                      required
                      rows={4}
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
  );
};

export default Contact;
