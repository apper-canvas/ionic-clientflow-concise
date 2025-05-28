import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import DealCard from './DealCard'
import { PIPELINE_STAGES } from '../../data/pipelineStages'
import { formatCurrency } from '../../utils/formatters'

export default function PipelineView({ 
  deals, 
  customers, 
  onAddDeal, 
  onEditDeal, 
  onDeleteDeal,
  onDragStart,
  onDragOver,
  onDrop
}) {
  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId)
    return customer ? customer.name : 'Unknown Customer'
  }

  const getDealsByStage = (stage) => {
    return deals.filter(deal => deal.stage.toLowerCase() === stage)
  }

  const getTotalPipelineValue = () => {
    return deals.reduce((total, deal) => total + deal.value, 0)
  }

  return (
    <motion.div
      key="pipeline"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Pipeline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-100">
            Sales Pipeline
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Track and manage your sales opportunities
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="px-4 py-2 bg-gradient-to-r from-accent to-green-400 text-white rounded-xl font-medium">
            Total Value: {formatCurrency(getTotalPipelineValue())}
          </div>
          <button
            onClick={onAddDeal}
            className="btn-primary flex items-center gap-2 justify-center"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            Add Deal
          </button>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {PIPELINE_STAGES.map((stage) => (
          <div
            key={stage.id}
            className="stage-card p-4 min-h-96"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, stage.id)}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
              <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                {stage.name}
              </h3>
              <span className="text-sm text-surface-500 dark:text-surface-400">
                ({getDealsByStage(stage.id).length})
              </span>
            </div>

            <div className="space-y-3">
              {getDealsByStage(stage.id).map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  customerName={getCustomerName(deal.customerId)}
                  onEdit={onEditDeal}
                  onDelete={onDeleteDeal}
                  onDragStart={(e) => onDragStart(e, deal)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {deals.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="BarChart3" className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-2">
            No deals in pipeline
          </h3>
          <p className="text-surface-600 dark:text-surface-400">
            Start tracking your sales opportunities by adding your first deal
          </p>
        </div>
      )}
    </motion.div>
  )
} 