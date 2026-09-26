import { useEffect, useState, type ReactNode } from 'react';
import { THEME, THEME_STORAGE_KEY, type Theme } from '@/constants/theme';
import { ThemeProviderContext } from '@/contexts/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

const getStoredTheme = (defaultTheme: Theme): Theme => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (
    storedTheme === THEME.LIGHT ||
    storedTheme === THEME.DARK ||
    storedTheme === THEME.SYSTEM
  ) {
    return storedTheme;
  }

  return defaultTheme;
};

export function ThemeProvider({
  children,
  defaultTheme = THEME.SYSTEM,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme(defaultTheme));

  useEffect(() => {
    const root = document.documentElement;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      root.classList.remove(THEME.LIGHT, THEME.DARK);

      if (theme === THEME.SYSTEM) {
        root.classList.add(mediaQuery.matches ? THEME.DARK : THEME.LIGHT);

        return;
      }

      root.classList.add(theme);
    };

    applyTheme();

    if (theme === THEME.SYSTEM) {
      mediaQuery.addEventListener('change', applyTheme);

      return () => {
        mediaQuery.removeEventListener('change', applyTheme);
      };
    }
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}
