import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'NeuralSync AI',
    category: 'AI / Machine Learning',
    description: 'A deep learning dashboard for monitoring training progress and visualizing neural network architectures in real-time.',
    tech: ['React', 'TensorFlow.js', 'Framer Motion', 'Tailwind'],
    image: '/neuralsync.png',
    link: '#'
  },
  {
    title: 'VividFlow',
    category: 'Creative Tool',
    description: 'A creative prototyping software interface, modern and vibrant, dark mode, showcasing UI/UX design components.',
    tech: ['Next.js', 'TypeScript', 'GSAP', 'Node.js'],
    image: '/vividflow.png',
    link: '#'
  },
  {
    title: 'Titan ERP',
    category: 'Enterprise Solution',
    description: 'A high-performance enterprise resource planning system with modular architecture and real-time analytics.',
    tech: ['React', 'GraphQL', 'PostgreSQL', 'Docker'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    link: '#'
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      // Cards stagger
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 md:px-12 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16">
          <h2 className="section-title text-center">Featured Projects</h2>
          <p className="text-[var(--color-muted)] text-center max-w-2xl mx-auto mt-2">
            A selection of my recent works where design meets code to create impactful digital experiences.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass-card overflow-hidden group hover:border-[var(--color-primary)]/30 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="hero-badge text-[10px] uppercase font-bold tracking-widest bg-[var(--color-bg)]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--color-muted)] text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono text-[var(--color-accent)] opacity-70">
                      #{t.replace(/\s/g, '').toLowerCase()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                   <a 
                    href={project.link} 
                    className="flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all"
                  >
                    View Project 
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
