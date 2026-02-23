import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const books = [
    { src: '/images/book-snackbook.jpg', title: 'Snackbook Adventures', genre: "Children's / Wellness", url: 'https://www.amazon.com/Jooshs-Juice-Bar-Snackbook-Adventure/dp/1539538818/' },
    { src: '/images/book-teeoff.jpg', title: 'The Tropland Tee-Off', genre: "Children's / Adventure", url: 'https://www.amazon.com/gp/product/1500736082' },
    { src: '/images/book-banana.jpg', title: 'Banana Berry Adventures', genre: "Children's / Wellness", url: 'https://www.amazon.com/Jooshs-Juice-Bar-Banana-Adventure/dp/1493546848' },
];

const JooshPage: React.FC = () => {
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
        <div className="bg-brand-deep min-h-screen pt-20" ref={sectionRef}>

            {/* Hero Content */}
            <section className="py-20 md:py-32 relative overflow-hidden bg-brand-deep">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                    <p className={`text-xs font-sans font-bold uppercase tracking-[0.25em] text-brand-accent mb-6 ${fade(0)}`}>
                        The Original Series
                    </p>
                    <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-6 ${fade(1)}`}>
                        Joosh's Juice <span className="italic text-brand-accent">Bar</span>
                    </h1>
                    <p className={`text-xl text-white/70 font-sans leading-relaxed mb-16 max-w-2xl mx-auto ${fade(2)}`}>
                        A vibrant children's book series blending wellness, friendship, and adventure. These foundational stories established the creative DNA of Tropland Universe.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {books.map((book, i) => (
                            <a
                                key={book.title}
                                href={book.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group flex flex-col items-center ${fade(i + 3)}`}
                                style={{ transitionDelay: `${(i + 3) * 100}ms` }}
                            >
                                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-6 glass border-white/10 group-hover:border-brand-accent/30 transition-all duration-500">
                                    <img src={book.src} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-white font-sans font-semibold text-sm translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            View Book <ArrowUpRight size={16} />
                                        </span>
                                    </div>
                                </div>
                                <h3 className="font-serif text-2xl text-white group-hover:text-brand-accent transition-colors leading-tight mb-2 text-center">
                                    {book.title}
                                </h3>
                                <p className="text-sm font-sans font-semibold text-white/40 uppercase tracking-widest text-center">
                                    {book.genre}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default JooshPage;
