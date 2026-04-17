import React from 'react';
import useTheme from './hooks/useTheme';
import ThemeToggle from './components/ThemeToggle';
import './styles/theme.css';

/**
 * Main app component that initializes theme state and renders the toggle.
 */
export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main>
      <header>
        <h1>React Theme Toggle</h1>
      </header>

      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <p>Current theme: <strong>{theme}</strong></p>
    </main>
  );
}
