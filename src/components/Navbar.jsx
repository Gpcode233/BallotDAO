import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ConnectWalletModal from './ConnectWalletModal';

const Navbar = ({ setIsWalletConnected, isWalletConnected }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const getNavLinks = () => {
    if (isWalletConnected) {
      return [
        { name: 'Dashboard', to: '/dashboard' },
        { name: 'Proposals', to: '/proposals' },
        { name: 'Results', to: '/results' },
        { name: 'About', to: '/about' },
      ];
    }
    return [
      { name: 'Home', to: '/' },
      { name: 'Proposals', to: '/proposals' },
      { name: 'Results', to: '/results' },
      { name: 'About', to: '/about' },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-[#232b3a] shadow-sm sticky top-0 z-50 dark:bg-[#232b3a] transition-colors duration-300">
      <ConnectWalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        setIsWalletConnected={setIsWalletConnected}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Blue circle logo */}
              <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center">
                <i className="fas fa-vote-yea text-white text-xl"></i>
              </div>
              <span className="ml-3 text-xl font-bold text-white hidden sm:block">
                BallotDAO
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
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
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#2d3446] text-gray-300 hover:text-white focus:outline-none"
            >
              <i className={`fas fa-sun theme-toggle-icon sun ${darkMode ? 'hidden' : ''}`}></i>
              <i className={`fas fa-moon theme-toggle-icon moon ${darkMode ? '' : 'hidden'}`}></i>
            </button>
            {isWalletConnected ? (
              <NavLink
                to="/profile"
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2 rounded-md text-sm font-medium flex items-center justify-center transition duration-150 ease-in-out"
              >
                <i className="fas fa-user mr-2"></i> Profile
              </NavLink>
            ) : (
              <button
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2 rounded-md text-sm font-medium flex items-center justify-center transition duration-150 ease-in-out"
                onClick={() => setWalletModalOpen(true)}
              >
                <i className="fas fa-wallet mr-2"></i> Connect Wallet
              </button>
            )}
          </div>
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
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden bg-[#232b3a] border-t border-gray-200 dark:border-gray-700`}>
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
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#2d3446] text-gray-300 hover:text-white focus:outline-none"
            >
              <i className={`fas fa-sun theme-toggle-icon sun ${darkMode ? 'hidden' : ''}`}></i>
              <i className={`fas fa-moon theme-toggle-icon moon ${darkMode ? '' : 'hidden'}`}></i>
            </button>
            {isWalletConnected ? (
              <NavLink
                to="/profile"
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2 rounded-md text-sm font-medium flex items-center justify-center transition duration-150 ease-in-out"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user mr-2"></i> Profile
              </NavLink>
            ) : (
              <button
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2 rounded-md text-sm font-medium flex items-center justify-center transition duration-150 ease-in-out"
                onClick={() => {
                  setWalletModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <i className="fas fa-wallet mr-2"></i> Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;