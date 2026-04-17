import React from 'react';

/**
 * Reusable theme toggle button.
 * Receives current theme and action from the parent App component.
 */
export default function ThemeToggle({ theme = 'light', onToggle }) {
  const nextMode = theme === 'light' ? 'Dark' : 'Light';

  return (
    <button type="button" onClick={onToggle}>
      Switch to {nextMode} Mode
    </button>
  );
}
