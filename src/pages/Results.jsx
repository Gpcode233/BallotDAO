import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Results() {
  return (
    <div>
      <div className="bg-white dark:bg-gray-900 pt-12 pb-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400 sm:text-5xl">
                Voting Results
              </h1>
              <p className="mt-3 max-w-md text-lg text-gray-500 dark:text-gray-400">
                View finalized voting results and historical data for all proposals.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-poll text-indigo-500 text-5xl floating-icon animate-grow-slow"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Result Card 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">DAO Treasury Allocation</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Finalized
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <i className="far fa-calendar-alt mr-1"></i> Oct 15 - Oct 22, 2023
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <i className="fas fa-users mr-1"></i> 1,245 votes cast
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    <span>Yes (65%)</span>
                    <span>No (35%)</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600 flex">
                    <div className="bg-indigo-500 h-2.5 rounded-l-full" style={{ width: '65%' }}></div>
                    <div className="bg-gray-400 h-2.5 rounded-r-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="pie-chart"></div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quorum: 80%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Threshold: 50%</p>
                    <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Card 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Protocol Upgrade v2.0</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Finalized
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <i className="far fa-calendar-alt mr-1"></i> Oct 5 - Oct 12, 2023
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <i className="fas fa-users mr-1"></i> 982 votes cast
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    <span>Yes (42%)</span>
                    <span>No (58%)</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600 flex">
                    <div className="bg-indigo-500 h-2.5 rounded-l-full" style={{ width: '42%' }}></div>
                    <div className="bg-gray-400 h-2.5 rounded-r-full" style={{ width: '58%' }}></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="pie-chart" style={{ background: 'conic-gradient(#4F46E5 0% 42%, #10B981 42% 100%)' }}></div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quorum: 75%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Threshold: 50%</p>
                    <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Card 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">New Core Team Member</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Finalized
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <i className="far fa-calendar-alt mr-1"></i> Sep 28 - Oct 5, 2023
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <i className="fas fa-users mr-1"></i> 1,532 votes cast
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    <span>Yes (78%)</span>
                    <span>No (22%)</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600 flex">
                    <div className="bg-indigo-500 h-2.5 rounded-l-full" style={{ width: '78%' }}></div>
                    <div className="bg-gray-400 h-2.5 rounded-r-full" style={{ width: '22%' }}></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="pie-chart" style={{ background: 'conic-gradient(#4F46E5 0% 78%, #10B981 78% 100%)' }}></div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quorum: 85%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Threshold: 60%</p>
                    <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Card 4 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Tokenomics Adjustment</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Finalized
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <i className="far fa-calendar-alt mr-1"></i> Sep 15 - Sep 22, 2023
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <i className="fas fa-users mr-1"></i> 1,087 votes cast
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    <span>Yes (54%)</span>
                    <span>No (46%)</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600 flex">
                    <div className="bg-indigo-500 h-2.5 rounded-l-full" style={{ width: '54%' }}></div>
                    <div className="bg-gray-400 h-2.5 rounded-r-full" style={{ width: '46%' }}></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="pie-chart" style={{ background: 'conic-gradient(#4F46E5 0% 54%, #10B981 54% 100%)' }}></div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quorum: 70%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Threshold: 50%</p>
                    <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Card 5 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Partnership Proposal</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Finalized
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <i className="far fa-calendar-alt mr-1"></i> Sep 1 - Sep 8, 2023
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <i className="fas fa-users mr-1"></i> 876 votes cast
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    <span>Yes (68%)</span>
                    <span>No (32%)</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600 flex">
                    <div className="bg-indigo-500 h-2.5 rounded-l-full" style={{ width: '68%' }}></div>
                    <div className="bg-gray-400 h-2.5 rounded-r-full" style={{ width: '32%' }}></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="pie-chart" style={{ background: 'conic-gradient(#4F46E5 0% 68%, #10B981 68% 100%)' }}></div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quorum: 65%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Threshold: 50%</p>
                    <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Card 6 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Governance Framework</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Finalized
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <i className="far fa-calendar-alt mr-1"></i> Aug 20 - Aug 27, 2023
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <i className="fas fa-users mr-1"></i> 1,403 votes cast
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    <span>Yes (72%)</span>
                    <span>No (28%)</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600 flex">
                    <div className="bg-indigo-500 h-2.5 rounded-l-full" style={{ width: '72%' }}></div>
                    <div className="bg-gray-400 h-2.5 rounded-r-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="pie-chart" style={{ background: 'conic-gradient(#4F46E5 0% 72%, #10B981 72% 100%)' }}></div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quorum: 80%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Threshold: 60%</p>
                    <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Load More Results
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-8">Voting Statistics</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Stat 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center transition-all duration-300 card-hover">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/10 text-indigo-500">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <h3 className="mt-4 text-lg font-medium text-indigo-700 dark:text-indigo-300">Total Votes</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600">6,124</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Across all proposals</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center transition-all duration-300 card-hover">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/10 text-indigo-500">
                <i className="fas fa-check-circle text-xl"></i>
              </div>
              <h3 className="mt-4 text-lg font-medium text-indigo-700 dark:text-indigo-300">Approval Rate</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600">63.5%</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Average yes votes</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center transition-all duration-300 card-hover">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/10 text-indigo-500">
                <i className="fas fa-users text-xl"></i>
              </div>
              <h3 className="mt-4 text-lg font-medium text-indigo-700 dark:text-indigo-300">Active Voters</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600">892</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Unique wallet addresses</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Results;