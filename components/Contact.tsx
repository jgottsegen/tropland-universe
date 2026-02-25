import React, { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import CometBackground from './CometBackground';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

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
    <section id="contact" className="py-24 md:py-32 bg-brand-deep relative overflow-hidden">

      {/* Comet animation */}
      <CometBackground density={2} speed={0.6} />

      {/* Animated ambient glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[250px] pointer-events-none ambient-glow"></div>
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-purple/20 rounded-full blur-[200px] pointer-events-none ambient-glow" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
        <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-brand-accent mb-4">
          Contact
        </p>

        <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-brand-text leading-[1.1] mb-4">
          Get in <span className="italic text-brand-accent">touch.</span>
        </h2>

        <p className="text-sm text-white/40 font-sans mb-12 max-w-xl leading-relaxed">
          For licensing inquiries, brand partnerships, and collaboration opportunities.
          We typically respond within 48 hours.
        </p>

        {status === 'success' ? (
          <div className="glass rounded-3xl p-12 text-center">
            <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-white mb-2">Message sent!</h3>
            <p className="text-white/40 font-sans text-sm">We'll get back to you shortly.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-sans font-semibold text-white/55 uppercase tracking-[0.15em] mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass rounded-xl px-5 py-4 text-white font-sans text-sm bg-transparent placeholder-white/20 focus:outline-none focus:border-brand-accent/40 transition-colors"
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
                  className="w-full glass rounded-xl px-5 py-4 text-white font-sans text-sm bg-transparent placeholder-white/20 focus:outline-none focus:border-brand-accent/40 transition-colors"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-sans font-semibold text-white/55 uppercase tracking-[0.15em] mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full glass rounded-xl px-5 py-4 text-white font-sans text-sm bg-transparent placeholder-white/20 focus:outline-none focus:border-brand-accent/40 transition-colors resize-none"
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

        {/* Direct email fallback */}
        <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-3">
          <Mail size={16} className="text-white/45" />
          <p className="text-white/55 font-sans text-sm">
            Or email directly:{' '}
            <a href="mailto:partnerships@troplanduniverse.com" className="text-white/60 hover:text-brand-accent transition-colors underline">
              partnerships@troplanduniverse.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
