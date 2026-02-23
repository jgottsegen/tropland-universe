import React, { useState } from 'react';
import { Loader2, Check, X, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setStatus('submitting');
    try {
      const response = await fetch("https://formsubmit.co/ajax/josh@onelightstudios.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name, email: formData.email, message: formData.message,
          _honey: '', _template: 'table',
          _subject: `New inquiry from ${formData.name}`, _captcha: 'false'
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setStatus('idle'), 4000);
        } else {
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000);
        }
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-brand-purple relative overflow-hidden">

      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">

        <div className="mb-12">
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-white leading-[1.1] mb-4">
            New <span className="italic text-brand-accent">project?</span>
          </h2>
          <p className="text-white/50 font-sans font-light text-base">
            Partnerships, licensing, brand deals, or creative projects.
          </p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
              <Check size={28} className="text-white" strokeWidth={3} />
            </div>
            <h3 className="font-sans text-2xl font-bold text-white mb-2">Message sent.</h3>
            <p className="text-white/50 font-sans">We'll be in touch shortly.</p>
          </div>
        ) : status === 'error' ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-6">
              <X size={28} className="text-red-400" strokeWidth={3} />
            </div>
            <h3 className="font-sans text-2xl font-bold text-white mb-2">Something went wrong.</h3>
            <p className="text-white/50 font-sans mb-4">The form service may need activation.</p>
            <a
              href={`mailto:josh@onelightstudios.com?subject=Inquiry from ${encodeURIComponent(formData.name || 'Website')}&body=${encodeURIComponent(formData.message || '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-sans font-semibold text-sm hover:bg-white/10 transition-all"
            >
              Email us directly instead
              <ArrowUpRight size={14} />
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">Name</label>
                <input
                  type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-accent/50 focus:bg-white/10 outline-none text-white font-sans text-base transition-all placeholder:text-white/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">Email</label>
                <input
                  type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-accent/50 focus:bg-white/10 outline-none text-white font-sans text-base transition-all placeholder:text-white/20"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">Message</label>
              <textarea
                id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-accent/50 focus:bg-white/10 outline-none text-white font-sans text-base transition-all resize-none placeholder:text-white/20"
                placeholder="Tell us about your project"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit" disabled={status === 'submitting'}
                className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(232,93,58,0.4)] disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === 'submitting' ? (
                  <><Loader2 size={18} className="animate-spin" /> Sending...</>
                ) : (
                  <>Send Message <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
