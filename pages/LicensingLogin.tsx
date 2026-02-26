import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isConfigured } from '../lib/supabase';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const LicensingLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!isConfigured) {
            setError('Portal is currently being configured. Please try again later.');
            setLoading(false);
            return;
        }

        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

        if (authError) {
            setError('Invalid credentials. Please check your email and password.');
            setLoading(false);
        } else {
            navigate('/tropland-licensing');
        }
    };

    return (
        <div className="min-h-screen bg-brand-deep flex items-center justify-center px-6 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-accent/8 rounded-full blur-[200px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/12 rounded-full blur-[180px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-10">
                    <img src="/images/tropland-logo.png" alt="Tropland Universe" className="h-8 mx-auto mb-4" />
                    <p className="text-[11px] font-sans font-bold uppercase tracking-[0.35em] text-brand-accent mb-1">
                        Licensee Portal
                    </p>
                    <p className="text-white/40 font-sans text-sm">
                        Authorized access only
                    </p>
                </div>

                {/* Form card */}
                <div className="glass rounded-3xl p-8 border border-white/[0.07]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-sans font-semibold text-white/55 uppercase tracking-[0.15em] mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full glass rounded-xl pl-11 pr-5 py-4 text-white font-sans text-sm bg-transparent placeholder-white/30 focus:outline-none focus:border-brand-accent/40 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-sans font-semibold text-white/55 uppercase tracking-[0.15em] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full glass rounded-xl pl-11 pr-5 py-4 text-white font-sans text-sm bg-transparent placeholder-white/30 focus:outline-none focus:border-brand-accent/40 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 glass rounded-xl px-4 py-3 border-red-500/20">
                                <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
                                <p className="text-red-300 font-sans text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_24px_rgba(232,93,58,0.3)] mt-2"
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/20 font-sans text-xs mt-8">
                    Need access?{' '}
                    <a href="mailto:partnerships@troplanduniverse.com" className="hover:text-white/40 transition-colors underline">
                        Contact us
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LicensingLogin;
