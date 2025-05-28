import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import CustomerCard from './CustomerCard'

export default function CustomerList({ 
  customers, 
  searchTerm, 
  onSearchChange, 
  onAddCustomer, 
  onEditCustomer, 
  onDeleteCustomer 
}) {
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      key="customers"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Customers Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-100">
            Customer Management
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Manage your customer relationships and contact information
          </p>
        </div>
        <button
          onClick={onAddCustomer}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card-gradient rounded-2xl p-4 sm:p-6 shadow-card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search customers by name, company, or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-modern pl-10 w-full"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <span className="px-4 py-2 bg-surface-200 dark:bg-surface-700 rounded-lg text-sm font-medium text-surface-700 dark:text-surface-300 whitespace-nowrap">
              Total: {filteredCustomers.length}
            </span>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredCustomers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onEdit={onEditCustomer}
            onDelete={onDeleteCustomer}
          />
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="Users" className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-2">
            No customers found
          </h3>
          <p className="text-surface-600 dark:text-surface-400">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first customer'}
          </p>
        </div>
      )}
    </motion.div>
  )
} 