import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateProposalModal from '../components/CreateProposalModal'
import { useWallet } from '../web3/hooks'

const Dashboard = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isConnected, isCorrectNetwork, switchToAvalanche } = useWallet()

  // Redirect to home if wallet is not connected
  useEffect(() => {
    if (!isConnected) {
      navigate('/')
    }
  }, [isConnected, navigate])

  if (!isConnected) {
    return null
  }

  return (
    <>
      <CreateProposalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="min-h-screen bg-main py-10 px-4" style={{ background: 'linear-gradient(180deg, #f7f8fa 0%, #f0f4ff 100%)' }}>
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-6 flex items-center" style={{ color: 'var(--brand-indigo)' }}>
            <span className="mr-2 text-4xl" style={{ color: 'var(--brand-indigo)' }}><i className="fas fa-tachometer-alt" /></span> Dashboard
          </h1>
          
          {/* Network Warning */}
          {!isCorrectNetwork && (
            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6 flex items-center">
              <i className="fas fa-exclamation-triangle text-yellow-400 text-2xl mr-4"></i>
              <div>
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Wrong Network
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-100">
                  <p>
                    Please switch to Umi network to use BallotDAO.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={switchToAvalanche}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Switch to Umi
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Create New Proposal */}
            <div className="bg-card rounded-xl p-8 flex flex-col items-center border border-main shadow-main">
              <div className="mb-3 text-3xl" style={{ color: 'var(--brand-indigo)' }}>
                <i className="fas fa-plus-circle" />
              </div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--brand-indigo)' }}>
                Create a New Proposal
              </h2>
              <p className="text-muted mb-4 text-center">
                Start a new poll or proposal for the BallotDAO community to vote on.
              </p>
              <button
                className="bg-[var(--brand-indigo)] hover:bg-[var(--brand-green)] text-white px-6 py-2 rounded-md font-medium transition shadow-sm"
                onClick={() => setIsModalOpen(true)}
                disabled={!isCorrectNetwork}
              >
                Create Proposal
              </button>
            </div>

            {/* Join Existing Proposals */}
            <div className="bg-card rounded-xl p-8 flex flex-col items-center border border-main shadow-main">
              <div className="mb-3 text-3xl" style={{ color: 'var(--brand-green)' }}>
                <i className="fas fa-users" />
              </div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--brand-green)' }}>
                Join Existing Proposals
              </h2>
              <p className="text-muted mb-4 text-center">
                View and participate in ongoing proposals. Cast your vote or join the discussion.
              </p>
              <button
                className="bg-[var(--brand-indigo)] hover:bg-[var(--brand-green)] text-white px-6 py-2 rounded-md font-medium transition shadow-sm"
                onClick={() => navigate('/proposals')}
              >
                View Proposals
              </button>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-accent rounded-xl p-6 flex flex-col border border-main shadow-main">
              <div className="mb-2 text-2xl" style={{ color: 'var(--brand-indigo)' }}>
                <i className="fas fa-vote-yea" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--brand-indigo)' }}>
                Your Voting Activity
              </h3>
              <p className="text-muted">
                Track your recent votes and proposal submissions here.
              </p>
              {/* You can add a list of user's recent activity here */}
            </div>
            <div className="bg-accent rounded-xl p-6 flex flex-col border border-main shadow-main">
              <div className="mb-2 text-2xl" style={{ color: 'var(--brand-green)' }}>
                <i className="fas fa-chart-bar" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--brand-green)' }}>
                DAO Stats
              </h3>
              <p className="text-muted">
                See the number of active proposals, voters, and more.
              </p>
              {/* You can add DAO statistics here */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard