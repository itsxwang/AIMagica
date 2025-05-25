import { useState, useEffect } from 'react';
import useLocalStorage from './localStorage';

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage<string>('toggleTheme', 'system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const getResolvedTheme = () => {
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return theme as 'dark' | 'light';
    };

    setResolvedTheme(getResolvedTheme());

    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => {
        const newTheme = getResolvedTheme();
        setResolvedTheme(newTheme);
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  return { theme, setTheme, resolvedTheme };
}
