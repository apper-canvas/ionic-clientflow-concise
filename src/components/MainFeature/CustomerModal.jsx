import { useState } from 'react'
import { format } from 'date-fns'

import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import { AnimatePresence } from 'framer-motion'

export default function CustomerModal({ 
  show, 
  onClose, 
  customerForm, 
  setCustomerForm, 
  onSubmit, 
  isEditing,
  appointments = [],
  onAddAppointment,
  onEditAppointment,
  onDeleteAppointment
}) {
  const [activeTab, setActiveTab] = useState('details')
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [appointmentForm, setAppointmentForm] = useState({
    title: '',
    type: 'meeting',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    status: 'scheduled'
  })

  const resetAppointmentForm = () => {
    setAppointmentForm({
      title: '',
      type: 'meeting',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      status: 'scheduled'
    })
  }

  const handleAppointmentSubmit = (e) => {
    e.preventDefault()
    
    if (!appointmentForm.title || !appointmentForm.startDate || !appointmentForm.endDate) {
      return
    }

    const appointmentData = {
      ...appointmentForm,
      startDate: new Date(appointmentForm.startDate),
      endDate: new Date(appointmentForm.endDate),
      customerId: customerForm.id || Date.now().toString()
    }

    if (editingAppointment) {
      onEditAppointment({ ...editingAppointment, ...appointmentData })
    } else {
      onAddAppointment(appointmentData)
    }

    setShowAppointmentForm(false)
    setEditingAppointment(null)
    resetAppointmentForm()
  }

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment)
    setAppointmentForm({
      title: appointment.title,
      type: appointment.type,
      description: appointment.description,
      startDate: format(appointment.startDate, 'yyyy-MM-dd\'T\'HH:mm'),
      endDate: format(appointment.endDate, 'yyyy-MM-dd\'T\'HH:mm'),
      location: appointment.location,
      status: appointment.status
    })
    setShowAppointmentForm(true)
  }

  const customerAppointments = appointments.filter(apt => 
    apt.customerId === customerForm.id || 
    (isEditing && apt.customerId === customerForm.id)
  )

  const getAppointmentTypeIcon = (type) => {
    switch(type) {
      case 'meeting': return 'Users'
      case 'call': return 'Phone'
      case 'email': return 'Mail'
      case 'task': return 'CheckSquare'
      default: return 'Calendar'
    }
  }

  const getAppointmentTypeColor = (type) => {
    switch(type) {
      case 'meeting': return 'text-blue-600'
      case 'call': return 'text-green-600'
      case 'email': return 'text-purple-600'
      case 'task': return 'text-orange-600'
      default: return 'text-primary'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                  {isEditing ? 'Edit Customer' : 'Add New Customer'}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex bg-surface-100 dark:bg-surface-700 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'details'
                      ? 'bg-white dark:bg-surface-800 shadow-md text-primary'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                  }`}
                >
                  <span className="flex items-center gap-2 justify-center">
                    <ApperIcon name="User" className="w-4 h-4" />
                    Details
                  </span>
                </button>
                {isEditing && (
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === 'calendar'
                        ? 'bg-white dark:bg-surface-800 shadow-md text-primary'
                        : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                    }`}
                  >
                    <span className="flex items-center gap-2 justify-center">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      Appointments
                    </span>
                  </button>
                )}
              </div>

              {/* Tab Content */}
              {activeTab === 'details' && (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      onClick={onClose}
                      className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1 sm:flex-none justify-center"
                    >
                      {isEditing ? 'Update Customer' : 'Create Customer'}
                    </button>
                  </div>
                </form>
              )}

              {/* Calendar Tab */}
              {activeTab === 'calendar' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                      Scheduled Appointments
                    </h4>
                    <button
                      onClick={() => {
                        setEditingAppointment(null)
                        resetAppointmentForm()
                        setShowAppointmentForm(true)
                      }}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <ApperIcon name="Plus" className="w-4 h-4" />
                      Schedule Appointment
                    </button>
                  </div>

                  {/* Appointment Form */}
                  {showAppointmentForm && (
                    <div className="appointment-card">
                      <form onSubmit={handleAppointmentSubmit} className="appointment-form">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-semibold text-surface-900 dark:text-surface-100">
                            {editingAppointment ? 'Edit Appointment' : 'New Appointment'}
                          </h5>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAppointmentForm(false)
                              setEditingAppointment(null)
                              resetAppointmentForm()
                            }}
                            className="text-surface-400 hover:text-surface-600"
                          >
                            <ApperIcon name="X" className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Title *
                            </label>
                            <input
                              type="text"
                              value={appointmentForm.title}
                              onChange={(e) => setAppointmentForm({ ...appointmentForm, title: e.target.value })}
                              className="input-modern w-full"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Type
                            </label>
                            <select
                              value={appointmentForm.type}
                              onChange={(e) => setAppointmentForm({ ...appointmentForm, type: e.target.value })}
                              className="input-modern w-full"
                            >
                              <option value="meeting">Meeting</option>
                              <option value="call">Phone Call</option>
                              <option value="email">Email</option>
                              <option value="task">Task</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Status
                            </label>
                            <select
                              value={appointmentForm.status}
                              onChange={(e) => setAppointmentForm({ ...appointmentForm, status: e.target.value })}
                              className="input-modern w-full"
                            >
                              <option value="scheduled">Scheduled</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Start Date & Time *
                            </label>
                            <input
                              type="datetime-local"
                              value={appointmentForm.startDate}
                              onChange={(e) => setAppointmentForm({ ...appointmentForm, startDate: e.target.value })}
                              className="input-modern w-full"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              End Date & Time *
                            </label>
                            <input
                              type="datetime-local"
                              value={appointmentForm.endDate}
                              onChange={(e) => setAppointmentForm({ ...appointmentForm, endDate: e.target.value })}
                              className="input-modern w-full"
                              required
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              value={appointmentForm.location}
                              onChange={(e) => setAppointmentForm({ ...appointmentForm, location: e.target.value })}
                              className="input-modern w-full"
                              placeholder="e.g., Conference Room A, Video Call, Client Office"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Description
                            </label>
                            <textarea
                              value={appointmentForm.description}
                              onChange={(e) => setAppointmentForm({ ...appointmentForm, description: e.target.value })}
                              className="input-modern w-full h-20 resize-none"
                              placeholder="Add appointment details..."
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAppointmentForm(false)
                              setEditingAppointment(null)
                              resetAppointmentForm()
                            }}
                            className="px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-all duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn-primary"
                          >
                            {editingAppointment ? 'Update Appointment' : 'Schedule Appointment'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Appointments List */}
                  <div className="calendar-timeline">
                    {customerAppointments.length > 0 ? (
                      customerAppointments
                        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                        .map((appointment) => (
                          <div key={appointment.id} className="timeline-item">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getAppointmentTypeColor(appointment.type)} bg-opacity-20`}>
                              <ApperIcon name={getAppointmentTypeIcon(appointment.type)} className={`w-4 h-4 ${getAppointmentTypeColor(appointment.type)}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h6 className="font-medium text-surface-900 dark:text-surface-100">
                                    {appointment.title}
                                  </h6>
                                  <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                                    {format(appointment.startDate, 'MMM dd, yyyy')} at {format(appointment.startDate, 'HH:mm')} - {format(appointment.endDate, 'HH:mm')}
                                  </p>
                                  {appointment.location && (
                                    <p className="text-sm text-surface-500 dark:text-surface-500 flex items-center gap-1 mt-1">
                                      <ApperIcon name="MapPin" className="w-3 h-3" />
                                      {appointment.location}
                                    </p>
                                  )}
                                  {appointment.description && (
                                    <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
                                      {appointment.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                    appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                    appointment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  }`}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                  </span>
                                  <button
                                    onClick={() => handleEditAppointment(appointment)}
                                    className="p-1 text-surface-400 hover:text-primary transition-all"
                                  >
                                    <ApperIcon name="Edit" className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => onDeleteAppointment(appointment.id)}
                                    className="p-1 text-surface-400 hover:text-red-500 transition-all"
                                  >
                                    <ApperIcon name="Trash" className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8">
                        <ApperIcon name="Calendar" className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-3" />
                        <p className="text-surface-600 dark:text-surface-400">
                          No appointments scheduled yet
                        </p>
                        <button
                          onClick={() => {
                            setEditingAppointment(null)
                            resetAppointmentForm()
                            setShowAppointmentForm(true)
                          }}
                          className="text-primary hover:text-primary-dark text-sm mt-2"
                        >
                          Schedule your first appointment
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={onClose}
                      className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-all duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
