import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Chart from 'react-apexcharts'
import ApperIcon from '../ApperIcon'
import { INITIAL_CUSTOMERS, INITIAL_DEALS } from '../../data/initialData'
import { format, subMonths, isAfter, isBefore } from 'date-fns'
import { formatCurrency } from '../../utils/formatters'
import CustomerList from './CustomerList'
import PipelineView from './PipelineView'
import CustomerModal from './CustomerModal'
import DealModal from './DealModal'

// Dashboard Widget Component
const DashboardWidget = ({ title, icon, children, className = "" }) => (
  <div className={`card-gradient rounded-xl p-6 shadow-card border border-surface-200 dark:border-surface-700 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
        <ApperIcon name={icon} className="w-4 h-4 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">{title}</h3>
    </div>
    {children}
  </div>
)

// Dashboard Component
const Dashboard = ({ deals, customers }) => {
  const [dateRange, setDateRange] = useState('3m')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const dateRanges = {
    '1m': { label: '1 Month', months: 1 },
    '3m': { label: '3 Months', months: 3 },
    '6m': { label: '6 Months', months: 6 },
    '1y': { label: '1 Year', months: 12 }
  }

  const getFilteredData = useMemo(() => {
    const endDate = new Date()
    const startDate = subMonths(endDate, dateRanges[dateRange].months)
    
    return {
      deals: deals.filter(deal => isAfter(deal.createdAt, startDate) && isBefore(deal.createdAt, endDate)),
      customers: customers.filter(customer => isAfter(customer.createdAt, startDate) && isBefore(customer.createdAt, endDate))
    }
  }, [deals, customers, dateRange])

  const analytics = useMemo(() => {
    const { deals: filteredDeals, customers: filteredCustomers } = getFilteredData
    
    const totalRevenue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0)
    const closedDeals = filteredDeals.filter(deal => deal.stage.toLowerCase() === 'closed')
    const totalClosedRevenue = closedDeals.reduce((sum, deal) => sum + deal.value, 0)
    const conversionRate = filteredCustomers.length > 0 ? (closedDeals.length / filteredCustomers.length) * 100 : 0
    
    const stageDistribution = {
      lead: filteredDeals.filter(d => d.stage.toLowerCase() === 'lead').length,
      qualified: filteredDeals.filter(d => d.stage.toLowerCase() === 'qualified').length,
      proposal: filteredDeals.filter(d => d.stage.toLowerCase() === 'proposal').length,
      negotiation: filteredDeals.filter(d => d.stage.toLowerCase() === 'negotiation').length,
      closed: closedDeals.length
    }

    const leadSources = filteredCustomers.reduce((acc, customer) => {
      acc[customer.leadSource] = (acc[customer.leadSource] || 0) + 1
      return acc
    }, {})

    const teamPerformance = filteredDeals.reduce((acc, deal) => {
      if (!acc[deal.assignedTo]) acc[deal.assignedTo] = { deals: 0, revenue: 0 }
      acc[deal.assignedTo].deals += 1
      acc[deal.assignedTo].revenue += deal.value
      return acc
    }, {})

    return {
      totalRevenue,
      totalClosedRevenue,
      conversionRate,
      totalDeals: filteredDeals.length,
      closedDeals: closedDeals.length,
      stageDistribution,
      leadSources,
      teamPerformance
    }
  }, [getFilteredData])

  const handleDateRangeChange = (range) => {
    setDateRange(range)
    toast.info(`Dashboard updated for ${dateRanges[range].label}`)
  }

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric)
    toast.success(`Viewing ${metric} metrics`)
  }

  // Revenue Trend Chart
  const revenueChartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      background: 'transparent'
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        colorStops: [
          { offset: 0, color: '#3B82F6', opacity: 0.8 },
          { offset: 100, color: '#3B82F6', opacity: 0.1 }
        ]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#64748b' } }
    },
    yaxis: {
      labels: {
        style: { colors: '#64748b' },
        formatter: (value) => formatCurrency(value)
      }
    },
    grid: { borderColor: '#e2e8f0' },
    tooltip: {
      y: {
        formatter: (value) => formatCurrency(value)
      }
    }
  }

  const revenueChartSeries = [{
    name: 'Revenue',
    data: [25000, 32000, 28000, 45000, 38000, 52000]
  }]

  // Deal Stage Distribution Chart
  const stageChartOptions = {
    chart: {
      type: 'donut',
      height: 350
    },
    labels: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed'],
    colors: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981'],
    legend: {
      position: 'bottom',
      labels: { colors: '#64748b' }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Deals',
              formatter: () => analytics.totalDeals
            }
          }
        }
      }
    }
  }

  const stageChartSeries = Object.values(analytics.stageDistribution)

  // Lead Sources Chart
  const leadSourcesChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: true
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: Object.keys(analytics.leadSources),
      labels: { style: { colors: '#64748b' } }
    },
    yaxis: {
      labels: { style: { colors: '#64748b' } }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: ['#8b5cf6'],
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.85
      }
    },
    colors: ['#3b82f6']
  }

  const leadSourcesChartSeries = [{
    name: 'Leads',
    data: Object.values(analytics.leadSources)
  }]

  return (
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
            Analyze your sales performance and key metrics
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="input-modern text-sm"
          >
            {Object.entries(dateRanges).map(([key, range]) => (
              <option key={key} value={key}>{range.label}</option>
            ))}
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => handleMetricChange(e.target.value)}
            className="input-modern text-sm"
          >
            <option value="revenue">Revenue</option>
            <option value="deals">Deals</option>
            <option value="conversion">Conversion</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardWidget title="Total Revenue" icon="DollarSign">
          <div className="text-2xl font-bold text-gradient">
            {formatCurrency(analytics.totalRevenue)}
          </div>
          <div className="text-sm text-surface-600 dark:text-surface-400 mt-1">
            Closed: {formatCurrency(analytics.totalClosedRevenue)}
          </div>
        </DashboardWidget>

        <DashboardWidget title="Deals Closed" icon="CheckCircle">
          <div className="text-2xl font-bold text-green-600">
            {analytics.closedDeals}
          </div>
          <div className="text-sm text-surface-600 dark:text-surface-400 mt-1">
            of {analytics.totalDeals} total deals
          </div>
        </DashboardWidget>

        <DashboardWidget title="Conversion Rate" icon="TrendingUp">
          <div className="text-2xl font-bold text-primary">
            {analytics.conversionRate.toFixed(1)}%
          </div>
          <div className="text-sm text-surface-600 dark:text-surface-400 mt-1">
            Leads to customers
          </div>
        </DashboardWidget>

        <DashboardWidget title="Avg Deal Size" icon="Target">
          <div className="text-2xl font-bold text-secondary">
            {formatCurrency(analytics.totalDeals > 0 ? analytics.totalRevenue / analytics.totalDeals : 0)}
          </div>
          <div className="text-sm text-surface-600 dark:text-surface-400 mt-1">
            Per deal average
          </div>
        </DashboardWidget>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardWidget title="Revenue Trend" icon="BarChart3">
          <Chart
            options={revenueChartOptions}
            series={revenueChartSeries}
            type="area"
            height={300}
          />
        </DashboardWidget>

        <DashboardWidget title="Deal Stage Distribution" icon="PieChart">
          <Chart
            options={stageChartOptions}
            series={stageChartSeries}
            type="donut"
            height={300}
          />
        </DashboardWidget>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardWidget title="Lead Sources" icon="Users">
          <Chart
            options={leadSourcesChartOptions}
            series={leadSourcesChartSeries}
            type="bar"
            height={300}
          />
        </DashboardWidget>

        <DashboardWidget title="Team Performance" icon="Award">
          <div className="space-y-4">
            {Object.entries(analytics.teamPerformance).map(([name, data]) => (
              <div key={name} className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div>
                  <div className="font-medium text-surface-900 dark:text-surface-100">{name}</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">{data.deals} deals</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{formatCurrency(data.revenue)}</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">revenue</div>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </div>
    </motion.div>
  )
}


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
                    <ApperIcon name="BarChart4" className="w-4 h-4" />
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
            <CustomerList
              customers={customers}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAddCustomer={() => {
                setEditingCustomer(null)
                resetCustomerForm()
                setShowCustomerModal(true)
              }}
              onEditCustomer={handleEditCustomer}
              onDeleteCustomer={handleDeleteCustomer}
            />
          )}

          {activeTab === 'pipeline' && (
            <PipelineView
              deals={deals}
              customers={customers}
              onAddDeal={() => {
                setEditingDeal(null)
                resetDealForm()
                setShowDealModal(true)
              }}
              onEditDeal={handleEditDeal}
              onDeleteDeal={handleDeleteDeal}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              deals={deals}
              customers={customers}
            />
          )}

        </AnimatePresence>
      </main>

      {/* Modals */}
      <CustomerModal
        show={showCustomerModal}
        onClose={() => {
          setShowCustomerModal(false)
          setEditingCustomer(null)
          resetCustomerForm()
        }}
        customerForm={customerForm}
        setCustomerForm={setCustomerForm}
        onSubmit={handleCustomerSubmit}
        isEditing={!!editingCustomer}
      />

      <DealModal
        show={showDealModal}
        onClose={() => {
          setShowDealModal(false)
          setEditingDeal(null)
          resetDealForm()
        }}
        dealForm={dealForm}
        setDealForm={setDealForm}
        onSubmit={handleDealSubmit}
        isEditing={!!editingDeal}
        customers={customers}
      />
    </div>
  )
} 