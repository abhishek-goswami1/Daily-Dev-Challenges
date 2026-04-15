import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // Content Animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards Stagger Animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const coreValues = [
    {
      title: 'Performance First',
      description: 'Optimizing every line of code to ensure lightning-fast load times and smooth interactions.',
      icon: '🚀',
    },
    {
      title: 'Clean Architecture',
      description: 'Building scalable and maintainable systems using modern design patterns and best practices.',
      icon: '🏗️',
    },
    {
      title: 'User-Centric Design',
      description: 'Creating intuitive interfaces that prioritize accessibility and seamless user experiences.',
      icon: '🎨',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 bg-[var(--color-bg)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[var(--color-primary)] opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16">
          <h2 className="section-title text-left">The Story So Far</h2>
          <p className="text-[var(--color-muted)] mt-2">Driven by curiosity, fueled by caffeine, and obsessed with details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Bio Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-xl text-[var(--color-text)] leading-relaxed">
              I am a <span className="text-[var(--color-primary)] font-semibold">Full-Stack Developer</span> based in Nepal, 
              with a passion for crafting digital products that are as functional as they are beautiful.
            </p>
            <p className="text-[var(--color-muted)] leading-relaxed">
              My journey began with a curiosity about how things work on the internet, which quickly evolved into a 
              career dedicated to bringing complex ideas to life. I specialize in the modern web ecosystem, 
              leveraging technologies like React, Node.js, and Cloud Infrastructure to build robust applications.
            </p>
            <p className="text-[var(--color-muted)] leading-relaxed">
              When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, 
              or experimenting with emerging technologies. I believe that every pixel tells a story, and I'm here 
              to make those stories memorable.
            </p>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/5">
              <div>
                <p className="text-3xl font-bold hero-gradient-text">980+</p>
                <p className="text-sm text-[var(--color-muted)] uppercase tracking-wider">GitHub Commits</p>
              </div>
              <div>
                <p className="text-3xl font-bold hero-gradient-text">15+</p>
                <p className="text-sm text-[var(--color-muted)] uppercase tracking-wider">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid grid-cols-1 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="glass-card p-8 group hover:border-[var(--color-primary)]/30 transition-all duration-500"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
