import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'

export default function CustomerCard({ customer, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="card-gradient rounded-2xl p-6 shadow-card hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <ApperIcon name="User" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary transition-colors">
              {customer.name}
            </h3>
            <p className="text-sm text-surface-600 dark:text-surface-400">
              {customer.company}
            </p>
          </div>
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(customer)}
            className="p-2 text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
          >
            <ApperIcon name="Edit" className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(customer.id)}
            className="p-2 text-surface-400 hover:text-red-500 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <ApperIcon name="Mail" className="w-4 h-4 text-surface-400" />
          <span className="text-surface-600 dark:text-surface-400">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ApperIcon name="Phone" className="w-4 h-4 text-surface-400" />
          <span className="text-surface-600 dark:text-surface-400">{customer.phone}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            customer.status === 'Active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : customer.status === 'Lead'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {customer.status}
          </span>
          <span className="text-xs text-surface-500 dark:text-surface-400">
            {customer.leadSource}
          </span>
        </div>
      </div>
    </motion.div>
  )
} 