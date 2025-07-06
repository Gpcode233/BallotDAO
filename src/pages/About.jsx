import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';
import umiImage from '../assets/umi.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const About = () => {
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              About{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-green-400 bg-clip-text text-transparent">
                BallotDAO
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-400 sm:text-xl md:mt-5 md:max-w-3xl">
              Reimagining Democracy with Web3
            </p>
            <div className="mt-10 flex justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-universal-access text-indigo-500 text-5xl floating-icon animate-grow-slow"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              To empower decentralized governance through secure, transparent, and accessible voting.
            </p>
          </div>

          <div className="mt-16">
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden transition-all duration-300 card-hover">
              <div className="px-6 py-8 sm:p-10">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Democracy Rebooted</h3>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                      Traditional voting systems suffer from inefficiencies, lack of transparency, and accessibility barriers.
                      Studies show that <span className="font-medium text-indigo-600 dark:text-indigo-400">30% of eligible voters</span> don't participate due to these systemic issues.
                    </p>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                      BallotDAO leverages blockchain technology to create tamper-proof, verifiable voting systems that are accessible to anyone with an internet connection.
                    </p>
                  </div>
                  <div className="mt-8 md:mt-0 md:w-1/2 md:pl-10">
                    <div className="bg-gray-50 dark:bg-gray-600 p-6 rounded-lg">
                      <blockquote className="text-lg italic text-gray-600 dark:text-gray-300">
                        "The blockchain doesn't just change how we vote, it changes what voting means.
                        It transforms it from a periodic event to an ongoing conversation."
                      </blockquote>
                      <div className="mt-4 flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <i className="fas fa-quote-right text-indigo-500"></i>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Vitalik Buterin</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Ethereum Co-founder</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Umi Section */}
      <div className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 sm:text-4xl">
              Why We Chose Umi
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Building on the most scalable, eco-friendly blockchain ecosystem
            </p>
          </div>

          <div className="mt-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <div className="flex items-center">
                  <img src={umiImage} alt="Umi Logo" className="h-16 w-16 rounded-full object-cover" />
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Umi Network</h3>
                    <p className="text-gray-500 dark:text-gray-400">Sub-second finality • EVM compatible • Carbon neutral</p>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="feature-icon">
                        <i className="fas fa-bolt text-indigo-500"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Lightning Fast</h4>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Umi's unique consensus protocol enables sub-second transaction finality,
                        making voting results available almost instantly.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="feature-icon">
                        <i className="fas fa-leaf text-indigo-500"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Eco-Friendly</h4>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Unlike proof-of-work chains, Umi uses a sustainable consensus mechanism
                        that consumes minimal energy while maintaining security.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="feature-icon">
                        <i className="fas fa-project-diagram text-indigo-500"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Interoperable</h4>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Built-in cross-chain compatibility allows seamless integration with other
                        DeFi protocols and blockchain ecosystems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Gradient Card */}
              <div className="mt-12 md:mt-0 md:w-1/2 md:pl-10">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center justify-center">
                  <div className="aspect-w-16 aspect-h-9 w-full flex items-center justify-center">
                    <div
                      className="w-full h-64 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)', // indigo-500 to teal-400
                      }}
                    >
                      {/* Increase the icon size using size="4x" or style={{fontSize: "4rem"}} */}
                      <FontAwesomeIcon icon={faNetworkWired} style={{ color: "#ffffff", fontSize: "4rem" }} />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center w-full">
                    <div>
                      <p className="text-3xl font-bold text-indigo-600">4,500+</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">TPS</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-indigo-600">1.5s</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Finality</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-indigo-600">0.001%</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Energy vs. Bitcoin</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Right Side Gradient Card */}
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 sm:text-4xl">
              Our Vision for the Future
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Building the governance infrastructure for tomorrow's decentralized organizations
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-12">
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden transition-all duration-300 card-hover">
                <div className="px-6 py-8 sm:p-10">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                      <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Roadmap Highlights</h3>
                      <div className="mt-6 space-y-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                              <i className="fas fa-check text-indigo-500 text-xs"></i>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-500 dark:text-gray-400">
                              <span className="font-medium text-indigo-700 dark:text-indigo-300">Q1 2024:</span> Mobile voting app with biometric authentication
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                              <i className="fas fa-check text-indigo-500 text-xs"></i>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-500 dark:text-gray-400">
                              <span className="font-medium text-indigo-700 dark:text-indigo-300">Q2 2024:</span> Multi-chain governance with cross-chain voting
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                              <i className="fas fa-check text-indigo-500 text-xs"></i>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-500 dark:text-gray-400">
                              <span className="font-medium text-indigo-700 dark:text-indigo-300">Q3 2024:</span> Delegated voting with reputation system
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                              <i className="fas fa-check text-indigo-500 text-xs"></i>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-500 dark:text-gray-400">
                              <span className="font-medium text-indigo-700 dark:text-indigo-300">Q4 2024:</span> DAO-to-DAO governance interoperability
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 md:mt-0 md:w-1/2 md:pl-10">
                      <div className="bg-gray-50 dark:bg-gray-600 p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Join the Movement</h4>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                          BallotDAO is an open-source project built by and for the community.
                          We welcome developers, designers, and governance enthusiasts to contribute.
                        </p>
                        <div className="mt-4">
                          <a href="#" className="inline-flex items-center text-indigo-300 hover:text-indigo-500">
                            <i className="fab fa-github mr-2"></i> View on GitHub
                            <i className="fas fa-arrow-right ml-1 text-xs"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-2xl px-6 py-16 sm:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to participate in decentralized governance?
              </h2>
              <p className="mt-5 text-xl text-indigo-100">
                Connect your wallet and start voting on proposals or submit your own ideas to shape the future of BallotDAO.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="rounded-md shadow">
                  <ConnectButton
                    showBalance={false}
                    chainStatus="icon"
                    accountStatus="address"
                    label="Connect Wallet"
                    className="!bg-white !text-indigo-600 !rounded-md !px-8 !py-3 !font-medium !text-base !hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;