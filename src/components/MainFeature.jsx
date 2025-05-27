import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import Chart from 'react-apexcharts'

import { format } from 'date-fns'

const INITIAL_CUSTOMERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    status: 'Active',
    leadSource: 'Website',
    assignedTo: 'Sarah Johnson',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily.davis@innovate.io',
    phone: '+1 (555) 987-6543',
    company: 'Innovate Digital',
    status: 'Lead',
    leadSource: 'Referral',
    assignedTo: 'Mike Wilson',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '3',
    name: 'David Rodriguez',
    email: 'david.r@startupxyz.com',
    phone: '+1 (555) 456-7890',
    company: 'StartupXYZ',
    status: 'Prospect',
    leadSource: 'LinkedIn',
    assignedTo: 'Sarah Johnson',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-24')
  }
]

const INITIAL_DEALS = [
  {
    id: '1',
    title: 'Enterprise Software License',
    customerId: '1',
    value: 45000,
    stage: 'Proposal',
    probability: 75,
    expectedCloseDate: new Date('2024-02-28'),
    assignedTo: 'Sarah Johnson',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '2',
    title: 'Digital Marketing Package',
    customerId: '2',
    value: 12000,
    stage: 'Negotiation',
    probability: 60,
    expectedCloseDate: new Date('2024-02-15'),
    assignedTo: 'Mike Wilson',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-24')
  },
  {
    id: '3',
    title: 'Consulting Services',
    customerId: '3',
    value: 8000,
    stage: 'Qualified',
    probability: 40,
    expectedCloseDate: new Date('2024-03-10'),
    assignedTo: 'Sarah Johnson',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-23')
  }
]

const PIPELINE_STAGES = [
  { id: 'lead', name: 'Lead', color: 'bg-surface-400' },
  { id: 'qualified', name: 'Qualified', color: 'bg-blue-500' },
  { id: 'proposal', name: 'Proposal', color: 'bg-yellow-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-500' },
  { id: 'closed', name: 'Closed Won', color: 'bg-green-500' }
]

export default function MainFeature() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS)
  const [deals, setDeals] = useState(INITIAL_DEALS)
  const [activeTab, setActiveTab] = useState('customers')
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [showDealModal, setShowDealModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [editingDeal, setEditingDeal] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [draggedDeal, setDraggedDeal] = useState(null)
  const [dateRange, setDateRange] = useState('7d')
  const [dashboardWidgets, setDashboardWidgets] = useState({
    revenue: true,
    deals: true,
    conversion: true,
    performance: true
  })


  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'Lead',
    leadSource: 'Website',
    assignedTo: 'Sarah Johnson'
  })

  const [dealForm, setDealForm] = useState({
    title: '',
    customerId: '',
    value: '',
    stage: 'lead',
    probability: 25,
    expectedCloseDate: '',
    assignedTo: 'Sarah Johnson'
  })

  const resetCustomerForm = () => {
    setCustomerForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'Lead',
      leadSource: 'Website',
      assignedTo: 'Sarah Johnson'
    })
  }

  const resetDealForm = () => {
    setDealForm({
      title: '',
      customerId: '',
      value: '',
      stage: 'lead',
      probability: 25,
      expectedCloseDate: '',
      assignedTo: 'Sarah Johnson'
    })
  }

  const handleCustomerSubmit = (e) => {
    e.preventDefault()
    
    if (!customerForm.name || !customerForm.email || !customerForm.company) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingCustomer) {
      setCustomers(customers.map(customer => 
        customer.id === editingCustomer.id 
          ? { ...customer, ...customerForm, updatedAt: new Date() }
          : customer
      ))
      toast.success('Customer updated successfully')
    } else {
      const newCustomer = {
        id: Date.now().toString(),
        ...customerForm,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setCustomers([...customers, newCustomer])
      toast.success('Customer created successfully')
    }

    setShowCustomerModal(false)
    setEditingCustomer(null)
    resetCustomerForm()
  }

  const handleDealSubmit = (e) => {
    e.preventDefault()
    
    if (!dealForm.title || !dealForm.customerId || !dealForm.value) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingDeal) {
      setDeals(deals.map(deal => 
        deal.id === editingDeal.id 
          ? { 
              ...deal, 
              ...dealForm, 
              value: parseFloat(dealForm.value),
              expectedCloseDate: new Date(dealForm.expectedCloseDate),
              updatedAt: new Date() 
            }
          : deal
      ))
      toast.success('Deal updated successfully')
    } else {
      const newDeal = {
        id: Date.now().toString(),
        ...dealForm,
        value: parseFloat(dealForm.value),
        expectedCloseDate: new Date(dealForm.expectedCloseDate),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setDeals([...deals, newDeal])
      toast.success('Deal created successfully')
    }

    setShowDealModal(false)
    setEditingDeal(null)
    resetDealForm()
  }

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer)
    setCustomerForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      status: customer.status,
      leadSource: customer.leadSource,
      assignedTo: customer.assignedTo
    })
    setShowCustomerModal(true)
  }

  const handleEditDeal = (deal) => {
    setEditingDeal(deal)
    setDealForm({
      title: deal.title,
      customerId: deal.customerId,
      value: deal.value.toString(),
      stage: deal.stage.toLowerCase(),
      probability: deal.probability,
      expectedCloseDate: format(deal.expectedCloseDate, 'yyyy-MM-dd'),
      assignedTo: deal.assignedTo
    })
    setShowDealModal(true)
  }

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter(customer => customer.id !== customerId))
    toast.success('Customer deleted successfully')
  }

  const handleDeleteDeal = (dealId) => {
    setDeals(deals.filter(deal => deal.id !== dealId))
    toast.success('Deal deleted successfully')
  }

  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, newStage) => {
    e.preventDefault()
    
    if (draggedDeal && draggedDeal.stage.toLowerCase() !== newStage) {
      const updatedDeals = deals.map(deal => 
        deal.id === draggedDeal.id 
          ? { 
              ...deal, 
              stage: newStage.charAt(0).toUpperCase() + newStage.slice(1),
              updatedAt: new Date()
            }
          : deal
      )
      setDeals(updatedDeals)
      toast.success(`Deal moved to ${newStage.charAt(0).toUpperCase() + newStage.slice(1)}`)
    }
    
    setDraggedDeal(null)
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const getRevenueData = () => {
    const today = new Date()
    const data = []
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today)
      date.setMonth(date.getMonth() - i)
      const closedDeals = deals.filter(deal => 
        deal.stage === 'Closed' || deal.stage === 'closed'
      )
      const monthlyRevenue = Math.floor(Math.random() * 50000) + 20000
      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        value: monthlyRevenue
      })
    }
    return data
  }

  const getConversionRate = () => {
    const totalDeals = deals.length
    const closedDeals = deals.filter(deal => 
      deal.stage === 'Closed' || deal.stage === 'closed'
    ).length
    return totalDeals > 0 ? Math.round((closedDeals / totalDeals) * 100) : 0
  }

  const getAverageDealSize = () => {
    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
    return deals.length > 0 ? Math.round(totalValue / deals.length) : 0
  }

  const getDealStageData = () => {
    return PIPELINE_STAGES.map(stage => ({
      name: stage.name,
      value: getDealsByStage(stage.id).length,
      color: stage.color.replace('bg-', '')
    }))
  }

  const getMonthlyDealsData = () => {
    const data = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        deals: Math.floor(Math.random() * 15) + 5
      })
    }
    return data
  }

  const handleDateRangeChange = (range) => {
    setDateRange(range)
    toast.success(`Date range updated to ${range}`)
  }

  const toggleWidget = (widget) => {
    setDashboardWidgets(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }))
    toast.success(`Widget ${dashboardWidgets[widget] ? 'hidden' : 'shown'}`)
  }


  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-soft border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Users" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gradient">ClientFlow</h1>
                <p className="text-sm text-surface-600 dark:text-surface-400">Customer Relationship Management</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex bg-surface-100 dark:bg-surface-700 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'customers'
                      ? 'bg-white dark:bg-surface-800 shadow-md text-primary'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ApperIcon name="Users" className="w-4 h-4" />
                    <span className="hidden sm:inline">Customers</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'pipeline'
                      ? 'bg-white dark:bg-surface-800 shadow-md text-primary'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ApperIcon name="BarChart3" className="w-4 h-4" />
                    <span className="hidden sm:inline">Pipeline</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'dashboard'
                      ? 'bg-white dark:bg-surface-800 shadow-md text-primary'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ApperIcon name="PieChart" className="w-4 h-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </span>
                </button>

              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'customers' && (
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
                  onClick={() => {
                    setEditingCustomer(null)
                    resetCustomerForm()
                    setShowCustomerModal(true)
                  }}
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
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                  <motion.div
                    key={customer.id}
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
                          onClick={() => handleEditCustomer(customer)}
                          className="p-2 text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
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
          )}

          {activeTab === 'pipeline' && (
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
                    Total Value: ${getTotalPipelineValue().toLocaleString()}
                  </div>
                  <button
                    onClick={() => {
                      setEditingDeal(null)
                      resetDealForm()
                      setShowDealModal(true)
                    }}
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
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, stage.id)}
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
                        <motion.div
                          key={deal.id}
                          layout
                          draggable
                          onDragStart={(e) => handleDragStart(e, deal)}
                          className="deal-card p-4 cursor-move hover:shadow-lg transition-all duration-200 group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium text-surface-900 dark:text-surface-100 group-hover:text-primary transition-colors">
                              {deal.title}
                            </h4>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEditDeal(deal)}
                                className="p-1 text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-all"
                              >
                                <ApperIcon name="Edit" className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteDeal(deal.id)}
                                className="p-1 text-surface-400 hover:text-red-500 hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-all"
                              >
                                <ApperIcon name="Trash2" className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-accent">
                                ${deal.value.toLocaleString()}
                              </span>
                              <span className="text-sm text-surface-500 dark:text-surface-400">
                                {deal.probability}%
                              </span>
                            </div>
                            
                            <div className="text-sm text-surface-600 dark:text-surface-400">
                              <div className="flex items-center gap-1 mb-1">
                                <ApperIcon name="User" className="w-3 h-3" />
                                {getCustomerName(deal.customerId)}
                              </div>
                              <div className="flex items-center gap-1">
                                <ApperIcon name="Calendar" className="w-3 h-3" />
                                {format(deal.expectedCloseDate, 'MMM dd')}
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

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dashboard Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-100">
                    Sales Dashboard
                  </h2>
                  <p className="text-surface-600 dark:text-surface-400 mt-1">
                    Interactive charts and analytics for sales performance
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex bg-surface-100 dark:bg-surface-700 rounded-xl p-1">
                    <button
                      onClick={() => handleDateRangeChange('7d')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        dateRange === '7d'
                          ? 'bg-white dark:bg-surface-800 shadow-md text-primary'
                          : 'text-surface-600 dark:text-surface-400'
                      }`}
                    >
                      7D
                    </button>
                    <button
                      onClick={() => handleDateRangeChange('30d')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        dateRange === '30d'
                          ? 'bg-white dark:bg-surface-800 shadow-md text-primary'
                          : 'text-surface-600 dark:text-surface-400'
                      }`}
                    >
                      30D
                    </button>
                    <button
                      onClick={() => handleDateRangeChange('90d')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        dateRange === '90d'
                          ? 'bg-white dark:bg-surface-800 shadow-md text-primary'
                          : 'text-surface-600 dark:text-surface-400'
                      }`}
                    >
                      90D
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <motion.div
                  layout
                  className="card-gradient rounded-2xl p-6 shadow-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <ApperIcon name="DollarSign" className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                      +12.5%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                    ${getTotalPipelineValue().toLocaleString()}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    Total Pipeline Value
                  </p>
                </motion.div>

                <motion.div
                  layout
                  className="card-gradient rounded-2xl p-6 shadow-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <ApperIcon name="Target" className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                      +8.3%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                    {deals.length}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    Active Deals
                  </p>
                </motion.div>

                <motion.div
                  layout
                  className="card-gradient rounded-2xl p-6 shadow-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full">
                      +5.7%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                    {getConversionRate()}%
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    Conversion Rate
                  </p>
                </motion.div>

                <motion.div
                  layout
                  className="card-gradient rounded-2xl p-6 shadow-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200 px-2 py-1 rounded-full">
                      +15.2%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                    ${getAverageDealSize().toLocaleString()}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    Avg Deal Size
                  </p>
                </motion.div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart */}
                {dashboardWidgets.revenue && (
                  <motion.div
                    layout
                    className="card-gradient rounded-2xl p-6 shadow-card"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                        Revenue Trend
                      </h3>
                      <button
                        onClick={() => toggleWidget('revenue')}
                        className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
                      >
                        <ApperIcon name="EyeOff" className="w-4 h-4" />
                      </button>
                    </div>
                    <Chart
                      options={{
                        chart: {
                          type: 'area',
                          toolbar: { show: false },
                          background: 'transparent'
                        },
                        colors: ['#3B82F6'],
                        dataLabels: { enabled: false },
                        stroke: { curve: 'smooth', width: 3 },
                        fill: {
                          type: 'gradient',
                          gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.4,
                            opacityTo: 0.1
                          }
                        },
                        xaxis: {
                          categories: getRevenueData().map(d => d.month),
                          labels: { style: { colors: '#64748b' } }
                        },
                        yaxis: {
                          labels: {
                            style: { colors: '#64748b' },
                            formatter: (val) => `$${(val / 1000).toFixed(0)}k`
                          }
                        },
                        grid: { borderColor: '#e2e8f0' },
                        tooltip: {
                          y: {
                            formatter: (val) => `$${val.toLocaleString()}`
                          }
                        }
                      }}
                      series={[{
                        name: 'Revenue',
                        data: getRevenueData().map(d => d.value)
                      }]}
                      type="area"
                      height={300}
                    />
                  </motion.div>
                )}

                {/* Deal Stage Distribution */}
                {dashboardWidgets.deals && (
                  <motion.div
                    layout
                    className="card-gradient rounded-2xl p-6 shadow-card"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                        Deal Distribution
                      </h3>
                      <button
                        onClick={() => toggleWidget('deals')}
                        className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
                      >
                        <ApperIcon name="EyeOff" className="w-4 h-4" />
                      </button>
                    </div>
                    <Chart
                      options={{
                        chart: {
                          type: 'donut',
                          background: 'transparent'
                        },
                        colors: ['#94a3b8', '#3b82f6', '#eab308', '#f97316', '#22c55e'],
                        labels: getDealStageData().map(d => d.name),
                        dataLabels: {
                          enabled: true,
                          formatter: function (val, opts) {
                            return opts.w.config.series[opts.seriesIndex]
                          }
                        },
                        plotOptions: {
                          pie: {
                            donut: {
                              size: '70%',
                              labels: {
                                show: true,
                                total: {
                                  show: true,
                                  label: 'Total',
                                  formatter: () => deals.length
                                }
                              }
                            }
                          }
                        },
                        legend: {
                          position: 'bottom',
                          labels: { colors: '#64748b' }
                        },
                        tooltip: {
                          y: {
                            formatter: (val) => `${val} deals`
                          }
                        }
                      }}
                      series={getDealStageData().map(d => d.value)}
                      type="donut"
                      height={300}
                    />
                  </motion.div>
                )}
              </div>

              {/* Additional Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Deals */}
                {dashboardWidgets.conversion && (
                  <motion.div
                    layout
                    className="card-gradient rounded-2xl p-6 shadow-card"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                        Monthly Deals
                      </h3>
                      <button
                        onClick={() => toggleWidget('conversion')}
                        className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
                      >
                        <ApperIcon name="EyeOff" className="w-4 h-4" />
                      </button>
                    </div>
                    <Chart
                      options={{
                        chart: {
                          type: 'bar',
                          toolbar: { show: false },
                          background: 'transparent'
                        },
                        colors: ['#8B5CF6'],
                        plotOptions: {
                          bar: {
                            borderRadius: 8,
                            columnWidth: '60%'
                          }
                        },
                        dataLabels: { enabled: false },
                        xaxis: {
                          categories: getMonthlyDealsData().map(d => d.month),
                          labels: { style: { colors: '#64748b' } }
                        },
                        yaxis: {
                          labels: { style: { colors: '#64748b' } }
                        },
                        grid: { borderColor: '#e2e8f0' },
                        tooltip: {
                          y: {
                            formatter: (val) => `${val} deals`
                          }
                        }
                      }}
                      series={[{
                        name: 'Deals',
                        data: getMonthlyDealsData().map(d => d.deals)
                      }]}
                      type="bar"
                      height={300}
                    />
                  </motion.div>
                )}

                {/* Performance Metrics */}
                {dashboardWidgets.performance && (
                  <motion.div
                    layout
                    className="card-gradient rounded-2xl p-6 shadow-card"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                        Team Performance
                      </h3>
                      <button
                        onClick={() => toggleWidget('performance')}
                        className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
                      >
                        <ApperIcon name="EyeOff" className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <ApperIcon name="User" className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-surface-900 dark:text-surface-100">Sarah Johnson</h4>
                            <p className="text-sm text-surface-600 dark:text-surface-400">Senior Sales Rep</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-surface-900 dark:text-surface-100">$125k</div>
                          <div className="text-sm text-green-600">+18.5%</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <ApperIcon name="User" className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-surface-900 dark:text-surface-100">Mike Wilson</h4>
                            <p className="text-sm text-surface-600 dark:text-surface-400">Sales Rep</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-surface-900 dark:text-surface-100">$98k</div>
                          <div className="text-sm text-blue-600">+12.3%</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                            <ApperIcon name="User" className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-surface-900 dark:text-surface-100">Emily Chen</h4>
                            <p className="text-sm text-surface-600 dark:text-surface-400">Junior Sales Rep</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-surface-900 dark:text-surface-100">$76k</div>
                          <div className="text-sm text-purple-600">+8.7%</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Widget Controls */}
              <div className="mt-8 card-gradient rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  Widget Controls
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => toggleWidget('revenue')}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      dashboardWidgets.revenue
                        ? 'border-primary bg-primary bg-opacity-10 text-primary'
                        : 'border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    <ApperIcon name="TrendingUp" className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium">Revenue</div>
                  </button>
                  <button
                    onClick={() => toggleWidget('deals')}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      dashboardWidgets.deals
                        ? 'border-primary bg-primary bg-opacity-10 text-primary'
                        : 'border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    <ApperIcon name="PieChart" className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium">Deals</div>
                  </button>
                  <button
                    onClick={() => toggleWidget('conversion')}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      dashboardWidgets.conversion
                        ? 'border-primary bg-primary bg-opacity-10 text-primary'
                        : 'border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    <ApperIcon name="BarChart3" className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium">Monthly</div>
                  </button>
                  <button
                    onClick={() => toggleWidget('performance')}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      dashboardWidgets.performance
                        ? 'border-primary bg-primary bg-opacity-10 text-primary'
                        : 'border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    <ApperIcon name="Users" className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium">Team</div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          )}
        </AnimatePresence>
      </main>

      {/* Customer Modal */}
      <AnimatePresence>
        {showCustomerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowCustomerModal(false)
              setEditingCustomer(null)
              resetCustomerForm()
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card-gradient rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                  {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                </h3>
                <button
                  onClick={() => {
                    setShowCustomerModal(false)
                    setEditingCustomer(null)
                    resetCustomerForm()
                  }}
                  className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCustomerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerForm.name}
                      onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                      className="input-modern w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerForm.email}
                      onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                      className="input-modern w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerForm.phone}
                      onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                      className="input-modern w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={customerForm.company}
                      onChange={(e) => setCustomerForm({ ...customerForm, company: e.target.value })}
                      className="input-modern w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Status
                    </label>
                    <select
                      value={customerForm.status}
                      onChange={(e) => setCustomerForm({ ...customerForm, status: e.target.value })}
                      className="input-modern w-full"
                    >
                      <option value="Lead">Lead</option>
                      <option value="Prospect">Prospect</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Lead Source
                    </label>
                    <select
                      value={customerForm.leadSource}
                      onChange={(e) => setCustomerForm({ ...customerForm, leadSource: e.target.value })}
                      className="input-modern w-full"
                    >
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Trade Show">Trade Show</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Assigned To
                    </label>
                    <select
                      value={customerForm.assignedTo}
                      onChange={(e) => setCustomerForm({ ...customerForm, assignedTo: e.target.value })}
                      className="input-modern w-full"
                    >
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Mike Wilson">Mike Wilson</option>
                      <option value="Emily Chen">Emily Chen</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomerModal(false)
                      setEditingCustomer(null)
                      resetCustomerForm()
                    }}
                    className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 sm:flex-none justify-center"
                  >
                    {editingCustomer ? 'Update Customer' : 'Create Customer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deal Modal */}
      <AnimatePresence>
        {showDealModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowDealModal(false)
              setEditingDeal(null)
              resetDealForm()
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card-gradient rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                  {editingDeal ? 'Edit Deal' : 'Add New Deal'}
                </h3>
                <button
                  onClick={() => {
                    setShowDealModal(false)
                    setEditingDeal(null)
                    resetDealForm()
                  }}
                  className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleDealSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Deal Title *
                  </label>
                  <input
                    type="text"
                    value={dealForm.title}
                    onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })}
                    className="input-modern w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Customer *
                    </label>
                    <select
                      value={dealForm.customerId}
                      onChange={(e) => setDealForm({ ...dealForm, customerId: e.target.value })}
                      className="input-modern w-full"
                      required
                    >
                      <option value="">Select Customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} - {customer.company}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Deal Value *
                    </label>
                    <input
                      type="number"
                      value={dealForm.value}
                      onChange={(e) => setDealForm({ ...dealForm, value: e.target.value })}
                      className="input-modern w-full"
                      min="0"
                      step="100"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Stage
                    </label>
                    <select
                      value={dealForm.stage}
                      onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value })}
                      className="input-modern w-full"
                    >
                      {PIPELINE_STAGES.map((stage) => (
                        <option key={stage.id} value={stage.id}>
                          {stage.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Probability (%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={dealForm.probability}
                      onChange={(e) => setDealForm({ ...dealForm, probability: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-surface-500 dark:text-surface-400 mt-1">
                      <span>0%</span>
                      <span className="font-medium">{dealForm.probability}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Expected Close Date
                    </label>
                    <input
                      type="date"
                      value={dealForm.expectedCloseDate}
                      onChange={(e) => setDealForm({ ...dealForm, expectedCloseDate: e.target.value })}
                      className="input-modern w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Assigned To
                    </label>
                    <select
                      value={dealForm.assignedTo}
                      onChange={(e) => setDealForm({ ...dealForm, assignedTo: e.target.value })}
                      className="input-modern w-full"
                    >
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Mike Wilson">Mike Wilson</option>
                      <option value="Emily Chen">Emily Chen</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDealModal(false)
                      setEditingDeal(null)
                      resetDealForm()
                    }}
                    className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 sm:flex-none justify-center"
                  >
                    {editingDeal ? 'Update Deal' : 'Create Deal'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}