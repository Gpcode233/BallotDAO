import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateProposalModal from '../components/CreateProposalModal'
import { useWallet } from '../web3/hooks'
import Footer from '../components/Footer'

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
            Dashboard
          </h1>
          
          {/* Network Warning */}
          {!isCorrectNetwork && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-exclamation-triangle text-yellow-400"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Wrong Network
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Please switch to Avalanche network to use BallotDAO.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={switchToAvalanche}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Switch to Avalanche
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Create New Proposal */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                Create a New Proposal
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-center">
                Start a new poll or proposal for the BallotDAO community to vote on.
              </p>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition"
                onClick={() => setIsModalOpen(true)}
                disabled={!isCorrectNetwork}
              >
                Create Proposal
              </button>
            </div>

            {/* Join Existing Proposals */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                Join Existing Proposals
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-center">
                View and participate in ongoing proposals. Cast your vote or join the discussion.
              </p>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition"
                onClick={() => navigate('/proposals')}
              >
                View Proposals
              </button>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                Your Voting Activity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your recent votes and proposal submissions here.
              </p>
              {/* You can add a list of user's recent activity here */}
            </div>
            <div className="bg-indigo-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                DAO Stats
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                See the number of active proposals, voters, and more.
              </p>
              {/* You can add DAO statistics here */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Dashboard