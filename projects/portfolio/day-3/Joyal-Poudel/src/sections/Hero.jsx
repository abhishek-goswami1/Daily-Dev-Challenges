import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ── Tech stack data ─────────────────────────────────────────────────
const techStack = [
  { label: 'React', color: '#61dafb', icon: '⚛️' },
  { label: 'Node.js', color: '#6cc24a', icon: '🟢' },
  { label: 'TypeScript', color: '#3178c6', icon: '🔷' },
  { label: 'Python', color: '#ffd43b', icon: '🐍' },
  { label: 'PostgreSQL', color: '#336791', icon: '🐘' },
  { label: 'Docker', color: '#2496ed', icon: '🐳' },
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Joyal-Poudel',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/joyal-poudel',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/joyal_poudel',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ── Floating badge positions (around the orb) ──────────────────────
const floatingBadgePositions = [
  { top: '8%',  left: '72%', label: 'React 19' },
  { top: '25%', left: '88%', label: 'TypeScript' },
  { top: '55%', left: '82%', label: 'Node.js' },
  { top: '78%', left: '65%', label: 'PostgreSQL' },
  { top: '80%', left: '5%',  label: 'Docker' },
  { top: '50%', left: '-2%', label: 'Python' },
  { top: '20%', left: '4%',  label: 'GSAP' },
  { top: '5%',  left: '25%', label: 'Tailwind' },
];

const Hero = () => {
  // ── Refs for GSAP targets ───────────────────────────────────────
  const heroRef       = useRef(null);
  const badgeRef      = useRef(null);
  const taglineRef    = useRef(null);
  const headingRef    = useRef(null);
  const subheadRef    = useRef(null);
  const ctaRowRef     = useRef(null);
  const statsRowRef   = useRef(null);
  const socialRowRef  = useRef(null);
  const orbRef        = useRef(null);
  const glowPriRef    = useRef(null);
  const glowAccRef    = useRef(null);
  const scrollIndRef  = useRef(null);
  const floatBadgeRefs = useRef([]);

  useEffect(() => {
    // ── Master timeline ─────────────────────────────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 0. Background glows fade in first
      tl.fromTo(
        [glowPriRef.current, glowAccRef.current],
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.4, stagger: 0.2, ease: 'power2.out' },
        0,
      );

      // 1. Availability badge drops in
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        0.4,
      );

      // 2. Tagline slides up
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55 },
        0.65,
      );

      // 3. Main heading — each word staggers in
      const words = headingRef.current?.querySelectorAll('.hero-word');
      if (words?.length) {
        tl.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -30 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power4.out',
          },
          0.8,
        );
      }

      // 4. Subheading paragraph
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.65 },
        1.35,
      );

      // 5. CTA buttons
      tl.fromTo(
        ctaRowRef.current?.children,
        { opacity: 0, y: 24, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15 },
        1.6,
      );

      // 6. Stats row
      tl.fromTo(
        statsRowRef.current?.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        1.85,
      );

      // 7. Social icons
      tl.fromTo(
        socialRowRef.current?.children,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' },
        2.05,
      );

      // 8. Tech orb scales in
      tl.fromTo(
        orbRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'elastic.out(1, 0.55)' },
        0.7,
      );

      // 9. Floating badges pop in around the orb
      tl.fromTo(
        floatBadgeRefs.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, scale: 1,
          duration: 0.45,
          stagger: { amount: 0.8, from: 'random' },
          ease: 'back.out(1.8)',
        },
        1.4,
      );

      // 10. Scroll indicator fades in last
      tl.fromTo(
        scrollIndRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        2.2,
      );
    }, heroRef);

    // ── Parallax orb on mouse move ──────────────────────────────
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) / cx;
      const dy = (clientY - cy) / cy;

      gsap.to(orbRef.current, {
        x: dx * 18,
        y: dy * 12,
        duration: 1.2,
        ease: 'power2.out',
      });
      gsap.to(glowPriRef.current, {
        x: dx * 30,
        y: dy * 20,
        duration: 1.8,
        ease: 'power2.out',
      });
      gsap.to(glowAccRef.current, {
        x: -dx * 25,
        y: -dy * 15,
        duration: 2.0,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── Floating badge idle bob animation ───────────────────────
    floatBadgeRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: `${i % 2 === 0 ? '-8' : '8'}`,
        duration: 2.5 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background glows ──────────────────────────────────── */}
      <div
        ref={glowPriRef}
        className="hero-glow-primary"
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '55vw',
          height: '55vw',
          maxWidth: '700px',
          maxHeight: '700px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        ref={glowAccRef}
        className="hero-glow-accent"
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-8%',
          width: '45vw',
          height: '45vw',
          maxWidth: '600px',
          maxHeight: '600px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Subtle grid overlay ──────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Text content */}
          <div className="flex flex-col gap-6">

            {/* Availability badge */}
            <div ref={badgeRef} className="hero-badge w-max">
              <span className="dot" />
              Available for opportunities
            </div>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-muted)]"
            >
              Full-Stack Developer &amp; Designer
            </p>

            {/* Main heading — split into words for stagger */}
            <h1
              ref={headingRef}
              className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
              style={{ perspective: '800px' }}
            >
              {['Crafting', 'Digital', 'Experiences', 'That', 'Inspire.'].map((word, i) => (
                <span
                  key={i}
                  className={`hero-word inline-block mr-3 ${
                    i >= 3
                      ? 'hero-gradient-text'
                      : 'text-white'
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subheading */}
            <p
              ref={subheadRef}
              className="text-[var(--color-muted)] text-lg leading-relaxed max-w-lg"
            >
              I'm <span className="text-white font-semibold">Joyal Poudel</span>, a
              developer who blends elegant code with stunning interfaces — building
              fast, accessible, and beautifully animated web applications.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRowRef} className="flex flex-wrap items-center gap-4 mt-2">
              <a href="#projects" className="hero-cta-primary" id="hero-cta-projects">
                View My Work
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#contact" className="hero-cta-secondary" id="hero-cta-contact">
                Get In Touch
              </a>
            </div>

            {/* Stats row */}
            <div
              ref={statsRowRef}
              className="flex items-center gap-8 mt-4 pt-6 border-t border-white/8"
            >
              <div className="hero-stat">
                <span className="stat-value">3+</span>
                <span className="stat-label">Years Exp.</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">20+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">10+</span>
                <span className="stat-label">Challenges</span>
              </div>
            </div>

            {/* Social links */}
            <div ref={socialRowRef} className="flex items-center gap-4 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center text-[var(--color-muted)] hover:text-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-250"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Tech orb visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div
              ref={orbRef}
              className="tech-orb"
              style={{ width: '380px', height: '380px', position: 'relative' }}
            >
              {/* Rings */}
              <div className="orb-ring" />
              <div className="orb-ring" />
              <div className="orb-ring" />

              {/* Core */}
              <div className="orb-core">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-5xl">⚡</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--color-muted)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    joyal.dev
                  </span>
                </div>
              </div>

              {/* Floating tech badges */}
              {floatingBadgePositions.map((pos, i) => (
                <div
                  key={i}
                  ref={(el) => (floatBadgeRefs.current[i] = el)}
                  className="floating-badge"
                  style={{ top: pos.top, left: pos.left }}
                >
                  {pos.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndRef}
          className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <span className="text-xs text-[var(--color-muted)] tracking-[0.2em] uppercase mb-2">
            Scroll
          </span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
