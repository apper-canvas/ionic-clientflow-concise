import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import { formatDate, formatCurrency } from '../../utils/formatters'

export default function DealCard({ deal, customerName, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      draggable
      className="deal-card p-4 cursor-move hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-surface-900 dark:text-surface-100 group-hover:text-primary transition-colors">
          {deal.title}
        </h4>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(deal)}
            className="p-1 text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-all"
          >
            <ApperIcon name="Edit" className="w-3 h-3" />
          </button>
          <button
            onClick={() => onDelete(deal.id)}
            className="p-1 text-surface-400 hover:text-red-500 hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-all"
          >
            <ApperIcon name="Trash2" className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-accent">
            {formatCurrency(deal.value)}
          </span>
          <span className="text-sm text-surface-500 dark:text-surface-400">
            {deal.probability}%
          </span>
        </div>
        
        <div className="text-sm text-surface-600 dark:text-surface-400">
          <div className="flex items-center gap-1 mb-1">
            <ApperIcon name="User" className="w-3 h-3" />
            {customerName}
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Calendar" className="w-3 h-3" />
            {formatDate(deal.expectedCloseDate)}
          </div>
        </div>

        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${deal.probability}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  )
} 