import React, { useEffect, useState } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`darkTogglePanel ${open ? 'open' : ''}`}>
      <button
        className="darkToggleArrow"
        onClick={() => setOpen(!open)}
        aria-label="Toggle dark mode panel"
      >
        {open ? '➖' : '☰'}
      </button>

      {open && (
        <button
          className="darkModeToggleButton"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '🌙 Dark Mode On' : '☀️ Light Mode'}
        </button>
      )}
    </div>
  );
};

export default DarkModeToggle;
