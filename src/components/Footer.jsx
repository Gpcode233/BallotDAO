import React from 'react';

function Footer() {
  return (
         
          <footer className="bg-[#1e2533] transition-colors duration-300">
             {/* Footer */}
          <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <nav
              className="-mx-5 -my-2 flex flex-wrap justify-center"
              aria-label="Footer"
            >
              {['Home', 'Proposals', 'Results', 'About', 'Privacy', 'Terms'].map((item) => (
                <div className="px-5 py-2" key={item}>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-y-[-2px] inline-block"
                  >
                    {item}
                  </a>
                </div>
              ))}
            </nav>
            <div className="mt-8 flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Discord</span>
                <i className="fab fa-discord text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">GitHub</span>
                <i className="fab fa-github text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Medium</span>
                <i className="fab fa-medium text-xl" />
              </a>
            </div>
            <p className="mt-8 text-center text-base text-gray-400">
              © 2025 BallotDAO. All rights reserved.
            </p>
          </div>
        </footer>
  );
}

export default Footer;