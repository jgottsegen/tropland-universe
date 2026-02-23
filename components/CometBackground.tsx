import React, { useEffect, useRef } from 'react';

interface CometBackgroundProps {
    density?: number;     // number of concurrent comets (default 4)
    speed?: number;       // base speed multiplier (default 1)
    color?: string;       // comet head color (default '#E85D3A')
    className?: string;
}

const CometBackground: React.FC<CometBackgroundProps> = ({
    density = 4,
    speed = 1,
    color = '#E85D3A',
    className = '',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let comets: Comet[] = [];
        let stars: Star[] = [];

        interface Star {
            x: number;
            y: number;
            size: number;
            opacity: number;
            twinkleSpeed: number;
            twinklePhase: number;
        }

        interface Comet {
            x: number;
            y: number;
            angle: number;
            speed: number;
            tailLength: number;
            size: number;
            opacity: number;
            fadeIn: number;
            life: number;
            maxLife: number;
            hue: number;
        }

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };

        const createStar = (): Star => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.3,
            opacity: Math.random() * 0.4 + 0.1,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinklePhase: Math.random() * Math.PI * 2,
        });

        const createComet = (): Comet => {
            const angle = (Math.random() * 40 + 20) * (Math.PI / 180); // 20-60 degree angle
            const fromLeft = Math.random() > 0.3;
            return {
                x: fromLeft ? -50 : canvas.width + 50,
                y: Math.random() * canvas.height * 0.6 - canvas.height * 0.1,
                angle: fromLeft ? angle : Math.PI - angle,
                speed: (Math.random() * 3 + 2) * speed,
                tailLength: Math.random() * 80 + 40,
                size: Math.random() * 2 + 1,
                opacity: 0,
                fadeIn: 0,
                life: 0,
                maxLife: Math.random() * 200 + 150,
                hue: Math.random() * 30 - 15, // slight hue variation
            };
        };

        const initStars = () => {
            const starCount = Math.floor((canvas.width * canvas.height) / 8000);
            stars = Array.from({ length: starCount }, createStar);
        };

        const initComets = () => {
            comets = [];
            for (let i = 0; i < density; i++) {
                const comet = createComet();
                comet.life = Math.random() * comet.maxLife; // stagger start
                comets.push(comet);
            }
        };

        const drawStar = (star: Star, time: number) => {
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
            const alpha = star.opacity * twinkle;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
        };

        const drawComet = (comet: Comet) => {
            // Fade in/out
            if (comet.fadeIn < 1) comet.fadeIn += 0.02;
            const lifeRatio = comet.life / comet.maxLife;
            const fadeOut = lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1;
            comet.opacity = Math.min(comet.fadeIn, fadeOut);

            if (comet.opacity <= 0) return;

            // Draw tail (gradient line)
            const tailX = comet.x - Math.cos(comet.angle) * comet.tailLength;
            const tailY = comet.y - Math.sin(comet.angle) * comet.tailLength;

            const gradient = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y);
            gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
            gradient.addColorStop(0.6, `rgba(255, 200, 150, ${0.15 * comet.opacity})`);
            gradient.addColorStop(1, `rgba(232, 93, 58, ${0.6 * comet.opacity})`);

            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(comet.x, comet.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = comet.size;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Draw head glow
            const glowGradient = ctx.createRadialGradient(
                comet.x, comet.y, 0,
                comet.x, comet.y, comet.size * 6
            );
            glowGradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 * comet.opacity})`);
            glowGradient.addColorStop(0.3, `rgba(232, 93, 58, ${0.3 * comet.opacity})`);
            glowGradient.addColorStop(1, 'rgba(232, 93, 58, 0)');

            ctx.beginPath();
            ctx.arc(comet.x, comet.y, comet.size * 6, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();

            // Draw bright head
            ctx.beginPath();
            ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${comet.opacity})`;
            ctx.fill();
        };

        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time++;

            // Draw stars
            stars.forEach(star => drawStar(star, time));

            // Update and draw comets
            comets.forEach((comet, i) => {
                comet.x += Math.cos(comet.angle) * comet.speed;
                comet.y += Math.sin(comet.angle) * comet.speed;
                comet.life++;

                drawComet(comet);

                // Reset comet when it dies or goes off screen
                if (
                    comet.life >= comet.maxLife ||
                    comet.x > canvas.width + 100 ||
                    comet.x < -100 ||
                    comet.y > canvas.height + 100
                ) {
                    comets[i] = createComet();
                    // Add random delay between comets
                    comets[i].life = -Math.random() * 100;
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        resize();
        initStars();
        initComets();
        animate();

        const resizeObserver = new ResizeObserver(resize);
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
        };
    }, [density, speed, color]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            style={{ zIndex: 0 }}
        />
    );
};

export default CometBackground;
