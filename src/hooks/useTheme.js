import { useCallback, useEffect, useState } from 'react';

const THEME_KEY = 'app-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

/**
 * Custom hook to manage light / dark theme with persistence.
 * Saves the selected theme to localStorage and updates document.body.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return LIGHT_THEME;
    }

    const savedTheme = window.localStorage.getItem(THEME_KEY);
    return savedTheme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
  });

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.classList.remove(LIGHT_THEME, DARK_THEME);
    document.body.classList.add(theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    );
  }, []);

  return { theme, toggleTheme };
}
