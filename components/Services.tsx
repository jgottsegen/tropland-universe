import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Layers, MonitorPlay, PenTool, BrainCircuit } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: 'Strategy & Development',
    description: 'Brand positioning, pitch decks, and go-to-market strategy that turn complex ideas into compelling narratives.',
    tags: ['Pitch Decks', 'Brand Strategy', 'Market Positioning'],
  },
  {
    icon: Layers,
    title: 'Creative Direction',
    description: 'Guiding the visual and narrative identity of your project from concept through final execution.',
    tags: ['Art Direction', 'Visual Identity', 'Brand Voice'],
  },
  {
    icon: MonitorPlay,
    title: 'Motion & Video',
    description: 'Video editing, 2D/3D animation, VFX, and color grading. Thousands of assets produced across two decades.',
    tags: ['Animation', 'VFX', 'Post Production'],
  },
  {
    icon: PenTool,
    title: 'Script & Copywriting',
    description: 'Brand voice development, technical scripts, and creative storytelling for entertainment and industry leaders.',
    tags: ['Scriptwriting', 'Copywriting', 'Storytelling'],
  },
  {
    icon: BrainCircuit,
    title: 'AI Workflow Consulting',
    description: 'Integrate AI into your creative pipeline. From content generation to production automation, built on real-world experience.',
    tags: ['AI Integration', 'Workflow Design', 'Creative AI'],
  },
];

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fade = (delay: number) =>
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 bg-brand-purple relative">

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <div className={`mb-16 ${fade(0)}`} style={{ transitionDelay: '0ms' }}>
          <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-brand-muted mb-4 block">
            What We Do
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-brand-text leading-[1.1]">
            Creative services,<br />
            <span className="italic text-brand-muted">built to perform.</span>
          </h2>
        </div>

        {/* 3 + 2 grid layout for 5 services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {services.slice(0, 3).map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative p-8 md:p-10 rounded-2xl bg-white/5 border border-brand-border hover:border-brand-purple-mid hover:bg-white/10 transition-all duration-500 cursor-default ${fade(i + 1)}`}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-accent/5 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={22} className="text-brand-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-brand-text mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-muted font-sans text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-brand-border text-brand-muted group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.slice(3).map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative p-8 md:p-10 rounded-2xl bg-white/5 border border-brand-border hover:border-brand-purple-mid hover:bg-white/10 transition-all duration-500 cursor-default ${fade(i + 4)}`}
                style={{ transitionDelay: `${(i + 4) * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-accent/5 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={22} className="text-brand-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-brand-text mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-muted font-sans text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-brand-border text-brand-muted group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
