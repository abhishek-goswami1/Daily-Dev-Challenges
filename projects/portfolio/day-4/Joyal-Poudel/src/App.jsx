import React from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans antialiased">
      <Navbar />
      <Hero />
      <About />

      <section id="projects" className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card p-12 text-center max-w-xl w-full">
          <p className="section-title text-3xl mb-4">Projects</p>
          <p className="text-[var(--color-muted)]">Coming in Phase 5…</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card p-12 text-center max-w-xl w-full">
          <p className="section-title text-3xl mb-4">Contact</p>
          <p className="text-[var(--color-muted)]">Coming in Phase 6…</p>
        </div>
      </section>
    </div>
  )
}

export default App
