import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f0f1a]/70 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-4'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300"
        >
          Joyal.dev
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[var(--color-muted)] hover:text-white text-sm font-medium transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[var(--color-primary)] to-[#5249e5] hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-[var(--color-muted)] hover:text-white transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-64 border-b border-white/10 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0f0f1a]/95 backdrop-blur-xl px-6 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[var(--color-muted)] hover:text-white text-sm font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2 mt-2 w-max rounded-full text-sm font-medium text-white bg-gradient-to-r from-[var(--color-primary)] to-[#5249e5] shadow-lg">
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
