import React from 'react';
import Footer from '../components/Footer';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import voteBoxImage from '../assets/3d-blue-vote-box-ballot-600nw-2402267639-removebg-preview.png';

function Home() {
  return (
    <div className="bg-[#1e2533] text-white">
      {/* Hero Section */}
      <div className="relative bg-[#1e2533] overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-[#1e2533] sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Decentralized Voting</span>
                  <span className="block text-[#6366f1]">Made Easy</span>
                </h1>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  BallotDAO brings secure, transparent and tamper-proof voting to
                  the blockchain. Participate in governance or create your own polls
                  with our easy-to-use platform.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <ConnectButton
                      showBalance={false}
                      chainStatus="icon"
                      accountStatus="address"
                      label="Start Voting"
                      className="!w-full !flex !items-center !justify-center !px-32 !py-6 !border !border-transparent !text-2xl !font-bold !rounded-xl !text-white !bg-gradient-to-r !from-indigo-500 !to-green-400 hover:!from-indigo-600 hover:!to-green-500 hover:!scale-105 !transform !transition-all !duration-300 md:!py-8 md:!text-3xl md:!px-16"
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="./about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-700 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-800 hover:border-gray-500 transform transition-all duration-300 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
          <div className="h-full w-full flex items-center justify-center p-12">
            {/* 3D Voting Illustration */}
            <div className="relative w-full h-full max-w-md">
              <div className="relative">
                <img
                  src={voteBoxImage}
                  alt="3D Voting Illustration"
                  className="w-full h-auto animate-bounce-slow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-[#6366f1] font-semibold tracking-wide uppercase">
              FEATURES
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Why Choose BallotDAO?
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
              Our platform offers unique advantages for secure and transparent
              voting.
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative bg-[#232b3a] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] hover:bg-[#2a3347]">
                <div className="absolute -top-6 left-6 bg-[#6366f1] rounded-full p-3">
                  <i className="fas fa-lock text-white text-xl" />
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white">
                    Secure Voting
                  </h3>
                  <p className="mt-2 text-base text-gray-400">
                    Every vote is encrypted and recorded on the blockchain, ensuring
                    complete security and anonymity.
                  </p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="relative bg-[#232b3a] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] hover:bg-[#2a3347]">
                <div className="absolute -top-6 left-6 bg-green-500 rounded-full p-3">
                  <i className="fas fa-eye text-white text-xl" />
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white">
                    Transparent Results
                  </h3>
                  <p className="mt-2 text-base text-gray-400">
                    Real-time results that anyone can verify on the blockchain,
                    eliminating any possibility of tampering.
                  </p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="relative bg-[#232b3a] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] hover:bg-[#2a3347]">
                <div className="absolute -top-6 left-6 bg-[#6366f1] rounded-full p-3">
                  <i className="fas fa-bolt text-white text-xl" />
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white">
                    Fast &amp; Easy
                  </h3>
                  <p className="mt-2 text-base text-gray-400">
                    Simple interface that makes voting accessible to everyone, with
                    transactions completed in seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Proposals Section */}
      <div className="py-12 bg-[#1e2533] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-[#6366f1] font-semibold tracking-wide uppercase">
              VOTING
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Active Proposals
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
              Participate in ongoing governance decisions.
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Proposal 1 */}
            <div className="bg-[#232b3a] rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#6366f1]/10 p-3 rounded-full">
                    <i className="fas fa-file-alt text-[#6366f1] text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      DAO Treasury Allocation
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Ends in 2 days
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-400">
                  Proposal to allocate 40% of DAO treasury to development, 30% to
                  marketing, and 30% to community rewards.
                </p>
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Yes: 65%</span>
                    <span>No: 35%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2.5 flex">
                    <div
                      className="bg-green-500 h-2.5 rounded-l-full"
                      style={{ width: "65%" }}
                    />
                    <div
                      className="bg-gray-600 h-2.5 rounded-r-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-[#6366f1] hover:bg-[#5355d1] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
                    <i className="fas fa-vote-yea mr-2" /> Vote Now
                  </button>
                </div>
              </div>
            </div>
            {/* Proposal 2 */}
            <div className="bg-[#232b3a] rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#6366f1]/10 p-3 rounded-full">
                    <i className="fas fa-code-branch text-[#6366f1] text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      Protocol Upgrade v2.0
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Ends in 5 days
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-400">
                  Vote on the proposed upgrade to the protocol that includes new
                  features and improved gas efficiency.
                </p>
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Yes: 42%</span>
                    <span>No: 58%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2.5 flex">
                    <div
                      className="bg-green-500 h-2.5 rounded-l-full"
                      style={{ width: "42%" }}
                    />
                    <div
                      className="bg-gray-600 h-2.5 rounded-r-full"
                      style={{ width: "58%" }}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-[#6366f1] hover:bg-[#5355d1] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
                    <i className="fas fa-vote-yea mr-2" /> Vote Now
                  </button>
                </div>
              </div>
            </div>
            {/* Proposal 3 */}
            <div className="bg-[#232b3a] rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#6366f1]/10 p-3 rounded-full">
                    <i className="fas fa-users text-[#6366f1] text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      New Core Team Member
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Ends in 1 day
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-400">
                  Vote to approve @cryptodev as a new core team member responsible
                  for smart contract development.
                </p>
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Yes: 78%</span>
                    <span>No: 22%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2.5 flex">
                    <div
                      className="bg-green-500 h-2.5 rounded-l-full"
                      style={{ width: "78%" }}
                    />
                    <div
                      className="bg-gray-600 h-2.5 rounded-r-full"
                      style={{ width: "22%" }}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-[#6366f1] hover:bg-[#5355d1] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
                    <i className="fas fa-vote-yea mr-2" /> Vote Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <a
              href="/proposals"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              View All Proposals <i className="fas fa-arrow-right ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#6366f1]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to participate?</span>
            <span className="block">
              Connect your wallet and start voting today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <ConnectButton
                showBalance={false}
                chainStatus="icon"
                accountStatus="address"
                label="Connect Wallet"
                className="!inline-flex !items-center !justify-center !px-5 !py-3 !border !border-transparent !text-base !font-medium !rounded-md !text-[#6366f1] !bg-white hover:!bg-gray-100 !transition-all !duration-300 hover:!shadow-lg hover:!scale-105"
              />
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Learn How It Works
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;