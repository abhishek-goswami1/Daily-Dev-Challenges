import React from 'react'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-[200vh] bg-[var(--color-bg)] text-[var(--color-text)] font-sans antialiased">
      {/* Import the Phase 2 Glassmorphic Navbar here */}
      <Navbar />

      <main className="pt-32 flex flex-col justify-center items-center px-6">
        <h1 className="section-title mt-16 text-4xl md:text-6xl font-extrabold mb-4">Portfolio Phase 2</h1>
        <p className="section-subtitle max-w-2xl text-lg mb-12">
          This page features our brand new <span className="text-[var(--color-accent)] font-semibold">Glassmorphic Navbar</span>. 
          Try scrolling down the page to see the background blur and shadow effects dynamically adjust.
        </p>
        
        <div className="glass-card p-8 text-center max-w-xl w-full">
          <p className="text-xl font-medium text-[var(--color-primary)] mb-6 tracking-wide">Phase 2: Navbar Complete</p>
          <ul className="text-left text-[var(--color-muted)] space-y-4 text-base">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✨</div>
              <span>Responsive Glassmorphism Navigation</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✨</div>
              <span>Smooth scrolling background states</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✨</div>
              <span>Dynamic link hover underlines</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✨</div>
              <span>Mobile-optimized offcanvas menu drawer</span>
            </li>
          </ul>
        </div>
        
        {/* Placeholder spacer blocks to demonstrate the scroll functionality */}
        <div className="mt-32 w-full max-w-4xl space-y-16 pb-32">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-64 w-full rounded-2xl glass-card opacity-50 flex items-center justify-center">
              <p className="text-[var(--color-muted)] tracking-[0.2em] uppercase text-sm">Scroll Context Block 0{item}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
