import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, Download, Image, BookOpen, FileText, Mail, Lock } from 'lucide-react';

interface AssetSection {
    id: string;
    title: string;
    description: string;
    icon: React.FC<{ size?: number; className?: string }>;
    items: { label: string; type: string; comingSoon?: boolean }[];
}

const assetSections: AssetSection[] = [
    {
        id: 'brand',
        title: 'Brand Assets',
        description: 'Official logos, color palettes, typography, and brand guidelines.',
        icon: Image,
        items: [
            { label: 'Tropland Universe Logo Suite', type: 'ZIP', comingSoon: true },
            { label: 'Brand Color Palette & Typography', type: 'PDF', comingSoon: true },
            { label: 'Brand Usage Guidelines', type: 'PDF', comingSoon: true },
        ],
    },
    {
        id: 'characters',
        title: 'Character Library',
        description: 'High-resolution character art approved for licensed use.',
        icon: BookOpen,
        items: [
            { label: 'Rockford T. Honeypot — Character Pack', type: 'ZIP', comingSoon: true },
            { label: 'Joosh & Friends — Character Pack', type: 'ZIP', comingSoon: true },
            { label: 'Digital Animal Kingdom — Key Characters', type: 'ZIP', comingSoon: true },
            { label: 'Secondary Character Library', type: 'ZIP', comingSoon: true },
        ],
    },
    {
        id: 'guidelines',
        title: 'Usage Guidelines',
        description: 'Licensing terms, approved use cases, and artwork specifications.',
        icon: FileText,
        items: [
            { label: 'Licensee Agreement Summary', type: 'PDF', comingSoon: true },
            { label: 'Approved Use Cases & Restrictions', type: 'PDF', comingSoon: true },
            { label: 'Artwork Specifications & Safe Zones', type: 'PDF', comingSoon: true },
        ],
    },
];

const TroplandLibrary: React.FC = () => {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        await supabase.auth.signOut();
        navigate('/tropland-licensing/login');
    };

    return (
        <div className="min-h-screen bg-brand-deep">

            {/* Portal Header */}
            <header className="border-b border-white/[0.06] bg-brand-deep/95 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="/images/tropland-logo.png" alt="Tropland Universe" className="h-6" />
                        <div className="w-px h-5 bg-white/15" />
                        <p className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-brand-accent">
                            Licensee Portal
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 font-sans text-sm transition-all duration-300"
                    >
                        <LogOut size={14} />
                        {loggingOut ? 'Signing out…' : 'Sign Out'}
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 md:px-12 py-16">

                {/* Welcome */}
                <div className="mb-16">
                    <p className="text-[11px] font-sans font-bold uppercase tracking-[0.35em] text-brand-accent mb-3">
                        Welcome
                    </p>
                    <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
                        Tropland Universe <span className="italic text-brand-accent">Library.</span>
                    </h1>
                    <p className="text-white/50 font-sans text-lg max-w-2xl leading-relaxed">
                        Licensed assets, brand materials, and usage guidelines for authorized partners.
                        All assets are exclusive to licensees of Tropland Universe™.
                    </p>
                </div>

                {/* Access notice */}
                <div className="flex items-start gap-4 glass rounded-2xl p-5 mb-12 border border-brand-accent/15">
                    <Lock size={16} className="text-brand-accent mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-white/75 font-sans text-sm font-semibold mb-1">Secure, Confidential Assets</p>
                        <p className="text-white/45 font-sans text-sm">
                            These materials are licensed exclusively to your organization. Redistribution or sublicensing
                            without written consent from All-American Licensing is prohibited.
                        </p>
                    </div>
                </div>

                {/* Asset sections */}
                <div className="space-y-8">
                    {assetSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div key={section.id} className="glass rounded-3xl p-8 border border-white/[0.06]">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-brand-accent/15 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                                        <Icon size={18} className="text-brand-accent" />
                                    </div>
                                    <div>
                                        <h2 className="font-sans font-bold text-white text-lg leading-tight mb-1">
                                            {section.title}
                                        </h2>
                                        <p className="text-white/45 font-sans text-sm">
                                            {section.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {section.items.map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-center justify-between p-4 rounded-xl border border-white/[0.05] hover:border-white/[0.1] transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                                                    <Download size={13} className="text-white/35" />
                                                </div>
                                                <div>
                                                    <p className="font-sans text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                                        {item.label}
                                                    </p>
                                                    <p className="font-sans text-xs text-white/30 uppercase tracking-wider">
                                                        {item.type}
                                                    </p>
                                                </div>
                                            </div>
                                            {item.comingSoon ? (
                                                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-white/25 border border-white/10 rounded-full px-3 py-1">
                                                    Coming Soon
                                                </span>
                                            ) : (
                                                <button className="text-[11px] font-sans font-semibold uppercase tracking-wider text-brand-accent border border-brand-accent/30 rounded-full px-3 py-1 hover:bg-brand-accent/10 transition-colors">
                                                    Download
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact support */}
                <div className="mt-12 glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Mail size={18} className="text-brand-accent flex-shrink-0" />
                        <div>
                            <p className="font-sans font-semibold text-white/80 text-sm">Need help or additional assets?</p>
                            <p className="font-sans text-white/45 text-sm">Our licensing team is here to support you.</p>
                        </div>
                    </div>
                    <a
                        href="mailto:partnerships@troplanduniverse.com"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm hover:bg-brand-accent-hover transition-all duration-300 flex-shrink-0"
                    >
                        Contact Support
                    </a>
                </div>

            </main>
        </div>
    );
};

export default TroplandLibrary;
