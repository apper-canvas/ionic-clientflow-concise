import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <header className="bg-white dark:bg-surface-800 shadow-soft border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center"
              >
                <ApperIcon name="ArrowLeft" className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gradient">Sales Dashboard</h1>
                <p className="text-sm text-surface-600 dark:text-surface-400">Analytics and Insights</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center py-20">
            <ApperIcon name="TrendingUp" className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
              Dashboard Coming Soon
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-8">
              Advanced analytics and reporting features will be available here.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Back to CRM
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
