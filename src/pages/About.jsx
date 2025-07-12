import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faBolt, faLeaf, faProjectDiagram, faQuoteRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet, NETWORKS } from '../web3/hooks';

const About = () => {
  const { isConnected } = useWallet();
  const supportedNetworks = Object.values(NETWORKS).map(network => network.name).join(' and ');
  return (
    <div className="bg-main text-main">
      {/* Hero Section */}
      <section className="bg-main py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-main sm:text-5xl md:text-6xl">
              About{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-green-400 bg-clip-text text-transparent">
                BallotDAO
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-muted sm:text-xl md:mt-5 md:max-w-3xl">
              Reimagining Democracy with Web3
            </p>
            <div className="mt-10 flex justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faNetworkWired} className="text-indigo-500 text-5xl animate-grow-slow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--brand-indigo)' }}>
              Our Mission
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-muted lg:mx-auto">
              To empower decentralized governance through secure, transparent, and accessible voting.
            </p>
          </div>
          <div className="mt-16">
            <div className="bg-card rounded-lg p-6 mb-6 shadow-lg">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--brand-indigo)' }}>Democracy Rebooted</h2>
                  <p className="text-muted mb-4">
                    Traditional voting systems suffer from inefficiencies, lack of transparency, and accessibility barriers.
                    Studies show that <span className="font-medium" style={{ color: 'var(--brand-indigo)' }}>30% of eligible voters</span> don't participate due to these systemic issues.
                  </p>
                  <p className="text-muted mb-4">
                    BallotDAO is built on {supportedNetworks}, high-performance blockchain networks that ensure fast,
                    secure, and low-cost transactions. Our platform leverages the power of
                    decentralized technology to create a truly democratic voting experience.
                  </p>
                </div>
                <div className="mt-8 md:mt-0 md:w-1/2 md:pl-10">
                  <div className="bg-accent rounded-lg p-6 mb-6">
                    <blockquote className="text-lg italic text-muted">
                      "The blockchain doesn't just change how we vote, it changes what voting means.
                      It transforms it from a periodic event to an ongoing conversation."
                    </blockquote>
                    <div className="mt-4 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-[var(--brand-indigo)]/10 flex items-center justify-center">
                          <FontAwesomeIcon icon={faQuoteRight} style={{ color: 'var(--brand-indigo)' }} />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium" style={{ color: 'var(--brand-indigo)' }}>Vitalik Buterin</div>
                        <div className="text-sm text-muted">Ethereum Co-founder</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Umi Section */}
      <section className="bg-main py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--brand-indigo)' }}>
              Why We Chose Umi
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-muted lg:mx-auto">
              Building on the most scalable, eco-friendly blockchain ecosystem
            </p>
          </div>
          <div className="mt-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <FontAwesomeIcon icon={faNetworkWired} className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--brand-indigo)' }}>Blockchain Powered</h3>
                    <p className="text-muted">Secure • Transparent • Decentralized</p>
                  </div>
                </div>
                <div className="mt-8 space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="feature-icon">
                        <FontAwesomeIcon icon={faBolt} style={{ color: 'var(--brand-indigo)' }} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Lightning Fast</h4>
                      <p className="mt-1 text-muted">
                        Umi's unique consensus protocol enables sub-second transaction finality,
                        making voting results available almost instantly.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="feature-icon">
                        <FontAwesomeIcon icon={faLeaf} style={{ color: 'var(--brand-indigo)' }} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Eco-Friendly</h4>
                      <p className="mt-1 text-muted">
                        Unlike proof-of-work chains, Umi uses a sustainable consensus mechanism
                        that consumes minimal energy while maintaining security.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="feature-icon">
                        <FontAwesomeIcon icon={faProjectDiagram} style={{ color: 'var(--brand-indigo)' }} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Interoperable</h4>
                      <p className="mt-1 text-muted">
                        Built-in cross-chain compatibility allows seamless integration with other
                        DeFi protocols and blockchain ecosystems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Side Gradient Card */}
              <div className="mt-12 md:mt-0 md:w-1/2 md:pl-10">
                <div className="bg-card rounded-xl p-8 flex flex-col items-center justify-center shadow-lg">
                  <div className="aspect-w-16 aspect-h-9 w-full flex items-center justify-center">
                    <div
                      className="w-full h-64 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(90deg, var(--brand-indigo) 0%, var(--brand-green) 100%)',
                      }}
                    >
                      <FontAwesomeIcon icon={faNetworkWired} style={{ color: '#ffffff', fontSize: '4rem' }} />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center w-full">
                    <div>
                      <p className="text-3xl font-bold" style={{ color: 'var(--brand-indigo)' }}>4,500+</p>
                      <p className="text-sm text-muted">TPS</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold" style={{ color: 'var(--brand-indigo)' }}>1.5s</p>
                      <p className="text-sm text-muted">Finality</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold" style={{ color: 'var(--brand-indigo)' }}>0.001%</p>
                      <p className="text-sm text-muted">Energy vs. Bitcoin</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Right Side Gradient Card */}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-accent py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--brand-indigo)' }}>
              Our Vision for the Future
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-muted lg:mx-auto">
              Building the governance infrastructure for tomorrow's decentralized organizations
            </p>
          </div>
          <div className="mt-16">
            <div className="space-y-12">
              <div className="bg-card rounded-lg p-6 mb-6 shadow-lg">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--brand-indigo)' }}>Roadmap Highlights</h2>
                    <div className="mt-6 space-y-6">
                      {/* Updated Roadmap: Start July 2024, continue into 2025 */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-[var(--brand-indigo)]/10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--brand-indigo)', fontSize: '1.1rem' }} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-main font-semibold">July 2025</p>
                          <p className="text-muted text-sm">Launch of mobile voting app with biometric authentication</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-[var(--brand-indigo)]/10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--brand-indigo)', fontSize: '1.1rem' }} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-main font-semibold">September 2025</p>
                          <p className="text-muted text-sm">Multi-chain governance with cross-chain voting</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-[var(--brand-indigo)]/10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--brand-indigo)', fontSize: '1.1rem' }} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-main font-semibold">October 2025</p>
                          <p className="text-muted text-sm">Delegated voting with reputation system</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-[var(--brand-indigo)]/10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--brand-indigo)', fontSize: '1.1rem' }} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-main font-semibold">Nov - Dec 2025</p>
                          <p className="text-muted text-sm">DAO-to-DAO governance interoperability</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-0 md:w-1/2 md:pl-10">
                    <div className="bg-accent rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Join the Movement</h4>
                      <p className="mt-2 text-muted">
                        BallotDAO is an open-source project built by and for the community.
                        We welcome developers, designers, and governance enthusiasts to contribute.
                      </p>
                      <div className="mt-4">
                        <a href="https://github.com/Gpcode233/BallotDAO" className="inline-flex items-center" style={{ color: 'var(--brand-indigo)' }}>
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
      </section>

      {/* CTA Section */}
      <section className="bg-main py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--brand-indigo)] rounded-2xl px-6 py-16 sm:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to participate in decentralized governance?
              </h2>
              <p className="mt-5 text-xl text-indigo-100">
                Connect your wallet and start voting on proposals or submit your own ideas to shape the future of BallotDAO.
              </p>
              <div className="mt-8 flex justify-center">
                <ConnectButton
                  showBalance={false}
                  chainStatus="icon"
                  accountStatus="address"
                  label="Connect Wallet"
                  className="!bg-white !text-[var(--brand-indigo)] !rounded-md !px-8 !py-3 !font-medium !text-base !hover:bg-accent md:py-4 md:text-lg md:px-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;