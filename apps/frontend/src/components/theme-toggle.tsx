import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { SidebarItem } from './sidebar';

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme based on html tag's class
  useEffect(() => {
    const htmlElement = document.documentElement;
    setIsDarkMode(htmlElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      htmlElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  return (
    <SidebarItem onClick={toggleDarkMode} href="#">
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </SidebarItem>
  );
}
