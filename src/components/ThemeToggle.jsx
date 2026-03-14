import { useThemeStore } from '../store/useStore';
import './ThemeToggle.css';

function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const themes = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'system', icon: '💻', label: 'System' }
  ];

  return (
    <div className="theme-toggle">
      <div className="theme-toggle-container">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`theme-toggle-button ${theme === t.value ? 'active' : ''}`}
            title={`Switch to ${t.label} theme`}
            aria-label={`Switch to ${t.label} theme`}
          >
            <span className="theme-toggle-icon">{t.icon}</span>
            <span className="theme-toggle-label">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeToggle;