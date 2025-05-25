import React, { useState } from 'react';
import '../../styles/home.css';

export default function ThemeSelector({ theme, setTheme }: { theme: string; setTheme: React.Dispatch<React.SetStateAction<string>> }) {
  const [open, setOpen] = useState(false);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    setOpen(false);
  };

  return (
    <div className="custom-st-theme-selector fixed top-4 right-4 z-50 md:top-6 md:right-6">
      <div className="relative inline-block text-left">
        <button
          onClick={() => setOpen(!open)}
          className="bg-slate-900 text-slate-200 hover:bg-slate-800 transition-all duration-300 px-4 py-2 rounded-2xl shadow-lg shadow-slate-900 hover:scale-105 active:scale-95 focus:outline-none flex items-center gap-2 text-sm md:text-base"
        >
          {theme === 'system' ? '🖥️ System' : theme === 'light' ? '🌞 Light' : '🌑 Dark'}
          <svg
            className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="custom-st-theme-options origin-top-right absolute right-0 mt-2 w-36 rounded-xl shadow-xl bg-slate-800 ring-1 ring-slate-800 ring-opacity-5 text-sm">
            <div className="divide-y divide-slate-700">
              <button
                onClick={() => handleThemeChange('system')}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 text-slate-200 flex gap-2 items-center rounded-t-xl"
              >
                🖥️ System
              </button>
              <button
                onClick={() => handleThemeChange('light')}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 text-slate-200 flex gap-2 items-center"
              >
                🌞 Light
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 text-slate-200 flex gap-2 items-center rounded-b-xl"
              >
                🌑 Dark
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
