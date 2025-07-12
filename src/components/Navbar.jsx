import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Classic } from '@theme-toggles/react';
import '@theme-toggles/react/css/Classic.css';

// Theme toggle styles
const themeToggleClasses = "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200";
const themeToggleThumbClasses = "inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const { isConnected } = useAccount();

  // Apply theme to document and persist to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const getNavLinks = () => {
    if (isConnected) {
      return [
        { name: 'Dashboard', to: '/dashboard' },
        { name: 'Proposals', to: '/proposals' },
        { name: 'Results', to: '/results' },
        { name: 'About', to: '/about' },
      ];
    }
    // Only show Home and About when not connected
    return [
      { name: 'Home', to: '/' },
      { name: 'About', to: '/about' },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="glass-navbar shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo Left */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center">
              <i className="fas fa-vote-yea text-white text-xl"></i>
            </div>
            <span className="ml-3 text-xl font-bold text-white hidden sm:block">
              BallotDAO
            </span>
          </div>

          {/* Nav Links Centered */}
          <div className="flex-1 flex justify-center">
            <div className="hidden sm:flex sm:space-x-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition
                    ${isActive
                      ? 'border-[#6366f1] text-white font-semibold'
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-indigo-500'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Connect Wallet */}
          <div className="hidden sm:flex sm:items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`${themeToggleClasses} ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`${themeToggleThumbClasses} ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
              >
                <Classic
                  toggled={darkMode}
                  toggle={toggleTheme}
                  className="h-4 w-4 text-gray-700 dark:text-gray-200"
                />
              </span>
            </button>

            {/* Connect Wallet Button */}
            <div className="flex items-center">
              <ConnectButton
                label="Connect Wallet"
                accountStatus="address"
                showBalance={false}
                chainStatus="none"
                className="connect-wallet-btn"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <div className="hamburger">
                <div className="hamburger-top"></div>
                <div className="hamburger-middle"></div>
                <div className="hamburger-bottom"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden bg-gray-800 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition
                ${isActive
                  ? 'bg-[#232b3a] border-[#1e2533] text-white'
                  : 'border-transparent text-gray-400 hover:bg-gray-700 hover:border-gray-300 hover:text-gray-200'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="px-4 py-2 flex items-center justify-between">
            {/* Theme Toggle Button for Mobile */}
            <Classic
              toggled={darkMode}
              toggle={toggleTheme}
              duration={750}
              className="theme-toggle"
              style={{ color: '#fbbf24', width: 40, height: 40, cursor: 'pointer' }}
              title="Toggle theme"
              aria-label="Toggle theme"
            />
            {isConnected ? (
              <NavLink
                to="/profile"
                className="bg-[#6366f1] hover:bg-[#4f46e5] text px-6 py-2 rounded-md text-sm font-medium flex items-center justify-center transition duration-150 ease-in-out"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user mr-2"></i> Profile
              </NavLink>
            ) : (
              <div onClick={() => setIsMenuOpen(false)}>
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;