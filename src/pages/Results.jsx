import React from 'react';
import RequireWallet from '../components/RequireWallet';

function Results() {
  return (
    <RequireWallet>
      <div className="bg-main text-main">
        <div className="bg-main pt-12 pb-16 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--brand-indigo)' }}>
                  Voting Results
                </h1>
                <p className="mt-3 max-w-md text-lg text-muted">
                  View finalized voting results and historical data for all proposals.
                </p>
              </div>
              <div className="mt-8 md:mt-0">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-[var(--brand-indigo)]/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-poll" style={{ color: 'var(--brand-indigo)', fontSize: 40 }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-accent py-12 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Result Card 1 */}
              <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>DAO Treasury Allocation</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                      Finalized
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted">
                      <i className="far fa-calendar-alt mr-1"></i> Oct 15 - Oct 22, 2023
                    </p>
                    <p className="text-sm text-muted mt-1">
                      <i className="fas fa-users mr-1"></i> 1,245 votes cast
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm font-medium" style={{ color: 'var(--brand-indigo)' }}>
                      <span>Yes (65%)</span>
                      <span>No (35%)</span>
                    </div>
                    <div className="mt-2 w-full bg-accent rounded-full h-2.5 flex">
                      <div className="bg-[var(--brand-green)] h-2.5 rounded-l-full" style={{ width: '65%' }}></div>
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-r-full opacity-30" style={{ width: '35%' }}></div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="pie-chart" style={{ background: 'conic-gradient(var(--brand-indigo) 0% 65%, var(--brand-green) 65% 100%)' }}></div>
                    <div className="text-right">
                      <p className="text-sm text-muted">Quorum: 80%</p>
                      <p className="text-sm text-muted">Threshold: 50%</p>
                      <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[var(--brand-indigo)] hover:bg-[var(--brand-green)] transition-colors duration-300">
                        View Full Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Card 2 */}
              <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Protocol Upgrade v2.0</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                      Finalized
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted">
                      <i className="far fa-calendar-alt mr-1"></i> Oct 5 - Oct 12, 2023
                    </p>
                    <p className="text-sm text-muted mt-1">
                      <i className="fas fa-users mr-1"></i> 982 votes cast
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm font-medium" style={{ color: 'var(--brand-indigo)' }}>
                      <span>Yes (42%)</span>
                      <span>No (58%)</span>
                    </div>
                    <div className="mt-2 w-full bg-accent rounded-full h-2.5 flex">
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-l-full" style={{ width: '42%' }}></div>
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-r-full opacity-30" style={{ width: '58%' }}></div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="pie-chart" style={{ background: 'conic-gradient(var(--brand-indigo) 0% 42%, var(--brand-green) 42% 100%)' }}></div>
                    <div className="text-right">
                      <p className="text-sm text-muted">Quorum: 75%</p>
                      <p className="text-sm text-muted">Threshold: 50%</p>
                      <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[var(--brand-indigo)] hover:bg-[var(--brand-green)] transition-colors duration-300">
                        View Full Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Card 3 */}
              <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>New Core Team Member</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                      Finalized
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted">
                      <i className="far fa-calendar-alt mr-1"></i> Sep 28 - Oct 5, 2023
                    </p>
                    <p className="text-sm text-muted mt-1">
                      <i className="fas fa-users mr-1"></i> 1,532 votes cast
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm font-medium" style={{ color: 'var(--brand-indigo)' }}>
                      <span>Yes (78%)</span>
                      <span>No (22%)</span>
                    </div>
                    <div className="mt-2 w-full bg-accent rounded-full h-2.5 flex">
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-l-full" style={{ width: '78%' }}></div>
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-r-full opacity-30" style={{ width: '22%' }}></div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="pie-chart" style={{ background: 'conic-gradient(var(--brand-indigo) 0% 78%, var(--brand-green) 78% 100%)' }}></div>
                    <div className="text-right">
                      <p className="text-sm text-muted">Quorum: 85%</p>
                      <p className="text-sm text-muted">Threshold: 60%</p>
                      <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[var(--brand-indigo)] hover:bg-[var(--brand-green)] transition-colors duration-300">
                        View Full Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Card 4 */}
              <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Tokenomics Adjustment</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                      Finalized
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted">
                      <i className="far fa-calendar-alt mr-1"></i> Sep 15 - Sep 22, 2023
                    </p>
                    <p className="text-sm text-muted mt-1">
                      <i className="fas fa-users mr-1"></i> 1,087 votes cast
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm font-medium" style={{ color: 'var(--brand-indigo)' }}>
                      <span>Yes (54%)</span>
                      <span>No (46%)</span>
                    </div>
                    <div className="mt-2 w-full bg-accent rounded-full h-2.5 flex">
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-l-full" style={{ width: '54%' }}></div>
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-r-full opacity-30" style={{ width: '46%' }}></div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="pie-chart" style={{ background: 'conic-gradient(var(--brand-indigo) 0% 54%, var(--brand-green) 54% 100%)' }}></div>
                    <div className="text-right">
                      <p className="text-sm text-muted">Quorum: 70%</p>
                      <p className="text-sm text-muted">Threshold: 50%</p>
                      <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[var(--brand-indigo)] hover:bg-[var(--brand-green)] transition-colors duration-300">
                        View Full Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Card 5 */}
              <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Partnership Proposal</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                      Finalized
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted">
                      <i className="far fa-calendar-alt mr-1"></i> Sep 1 - Sep 8, 2023
                    </p>
                    <p className="text-sm text-muted mt-1">
                      <i className="fas fa-users mr-1"></i> 876 votes cast
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm font-medium" style={{ color: 'var(--brand-indigo)' }}>
                      <span>Yes (68%)</span>
                      <span>No (32%)</span>
                    </div>
                    <div className="mt-2 w-full bg-accent rounded-full h-2.5 flex">
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-l-full" style={{ width: '68%' }}></div>
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-r-full opacity-30" style={{ width: '32%' }}></div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="pie-chart" style={{ background: 'conic-gradient(var(--brand-indigo) 0% 68%, var(--brand-green) 68% 100%)' }}></div>
                    <div className="text-right">
                      <p className="text-sm text-muted">Quorum: 65%</p>
                      <p className="text-sm text-muted">Threshold: 50%</p>
                      <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[var(--brand-indigo)] hover:bg-[var(--brand-green)] transition-colors duration-300">
                        View Full Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Card 6 */}
              <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Governance Framework</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                      Finalized
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted">
                      <i className="far fa-calendar-alt mr-1"></i> Aug 20 - Aug 27, 2023
                    </p>
                    <p className="text-sm text-muted mt-1">
                      <i className="fas fa-users mr-1"></i> 1,403 votes cast
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm font-medium" style={{ color: 'var(--brand-indigo)' }}>
                      <span>Yes (72%)</span>
                      <span>No (28%)</span>
                    </div>
                    <div className="mt-2 w-full bg-accent rounded-full h-2.5 flex">
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-l-full" style={{ width: '72%' }}></div>
                      <div className="bg-[var(--brand-indigo)] h-2.5 rounded-r-full opacity-30" style={{ width: '28%' }}></div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="pie-chart" style={{ background: 'conic-gradient(var(--brand-indigo) 0% 72%, var(--brand-green) 72% 100%)' }}></div>
                    <div className="text-right">
                      <p className="text-sm text-muted">Quorum: 80%</p>
                      <p className="text-sm text-muted">Threshold: 60%</p>
                      <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[var(--brand-indigo)] hover:bg-[var(--brand-green)] transition-colors duration-300">
                        View Full Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--brand-indigo)] hover:bg-[var(--brand-green)] transition-colors duration-300">
                Load More Results
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section - moved up and lighter background */}
        <div className="bg-stats py-8 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center" style={{ color: 'var(--brand-indigo)' }}>Voting Statistics</h2>

            <div className="grid gap-8 md:grid-cols-3 mt-8">
              {/* Stat 1 */}
              <div className="bg-card p-6 rounded-lg shadow-sm text-center transition-all duration-300 card-hover">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[var(--brand-indigo)]/10 text-[var(--brand-indigo)]">
                  <i className="fas fa-chart-line text-xl"></i>
                </div>
                <h3 className="mt-4 text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Total Votes</h3>
                <p className="mt-2 text-3xl font-bold" style={{ color: 'var(--brand-indigo)' }}>6,124</p>
                <p className="mt-1 text-sm text-muted">Across all proposals</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-card p-6 rounded-lg shadow-sm text-center transition-all duration-300 card-hover">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[var(--brand-indigo)]/10 text-[var(--brand-indigo)]">
                  <i className="fas fa-check-circle text-xl"></i>
                </div>
                <h3 className="mt-4 text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Approval Rate</h3>
                <p className="mt-2 text-3xl font-bold" style={{ color: 'var(--brand-indigo)' }}>63.5%</p>
                <p className="mt-1 text-sm text-muted">Average yes votes</p>
              </div>

              {/* Stat 3 */}
              <div className="bg-card p-6 rounded-lg shadow-sm text-center transition-all duration-300 card-hover">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[var(--brand-indigo)]/10 text-[var(--brand-indigo)]">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <h3 className="mt-4 text-lg font-medium" style={{ color: 'var(--brand-indigo)' }}>Active Voters</h3>
                <p className="mt-2 text-3xl font-bold" style={{ color: 'var(--brand-indigo)' }}>892</p>
                <p className="mt-1 text-sm text-muted">Unique wallet addresses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireWallet>
  );
}

export default Results;