import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  name: string;
  title: string;
  description: string;
}

const AnimatedHero: React.FC<HeroProps> = ({ name, title, description }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      gsap.from(nameRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });

      gsap.from(descRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
      });

      gsap.from(ctaRef.current, {
        scale: 0,
        rotation: -10,
        duration: 0.8,
        delay: 0.9,
        ease: "back.out(1.7)"
      });

      // Floating elements animation
      floatingElementsRef.current.forEach((el, i) => {
        if (!el) return;
        
        gsap.to(el, {
          y: 20,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

      // Background pulse
      gsap.to(heroRef.current, {
        backgroundPosition: "0% 100%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 flex items-center justify-center"
      style={{ backgroundSize: '400% 400%' }}
    >
      {/* Floating elements */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          ref={el => {floatingElementsRef.current[i - 1] = el}}
          className={`absolute w-8 h-8 rounded-full opacity-20 ${
            i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'
          }`}
          style={{
            top: `${20 + i * 10}%`,
            left: `${10 + i * 15}%`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h1 
          ref={nameRef}
          className="text-6xl md:text-8xl font-bold text-white mb-4"
        >
          {name.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block hover:text-blue-400 transition-colors cursor-pointer"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10,
                  scale: 1.2,
                  duration: 0.3,
                  ease: "back.out(1.7)"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
        
        <h2 
          ref={titleRef}
          className="text-3xl md:text-5xl font-semibold text-blue-400 mb-6"
        >
          {title}
        </h2>
        
        <p 
          ref={descRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {description}
        </p>
        
        <button
          ref={ctaRef}
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden group"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.5)",
              duration: 0.3
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
              duration: 0.3
            });
          }}
          onClick={(e) => {
            gsap.to(e.currentTarget, {
              scale: 0.95,
              duration: 0.1,
              yoyo: true,
              repeat: 1
            });
          }}
        >
          <span className="relative z-10">View My Work</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </section>
  );
};

export default AnimatedHero;