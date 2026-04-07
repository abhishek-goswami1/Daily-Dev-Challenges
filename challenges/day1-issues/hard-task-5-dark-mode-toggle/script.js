const themeToggle = document.getElementById('theme-toggle');
const rootEl = document.documentElement;

const storedTheme = localStorage.getItem('preferred-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    rootEl.classList.toggle('dark', isDark);
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.querySelector('.icon').textContent = isDark ? '☀️' : '🌙';
    themeToggle.querySelector('.label').textContent = isDark ? 'Light Mode' : 'Dark Mode';
};

const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
    const nextTheme = rootEl.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('preferred-theme', nextTheme);
});
