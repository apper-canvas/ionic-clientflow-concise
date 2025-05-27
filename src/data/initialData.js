export const INITIAL_CUSTOMERS = [
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

export const INITIAL_DEALS = [
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

export const INITIAL_APPOINTMENTS = [
  {
    id: '1',
    title: 'Product Demo Meeting',
    customerId: '1',
    type: 'meeting',
    description: 'Demonstrate new enterprise features and discuss implementation timeline',
    startDate: new Date('2024-02-10T10:00:00'),
    endDate: new Date('2024-02-10T11:00:00'),
    assignedTo: 'Sarah Johnson',
    status: 'scheduled',
    location: 'Conference Room A',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '2',
    title: 'Follow-up Call',
    customerId: '2',
    type: 'call',
    description: 'Discuss marketing package requirements and budget',
    startDate: new Date('2024-02-12T14:30:00'),
    endDate: new Date('2024-02-12T15:00:00'),
    assignedTo: 'Mike Wilson',
    status: 'scheduled',
    location: 'Phone Call',
    createdAt: new Date('2024-01-26'),
    updatedAt: new Date('2024-01-26')
  },
  {
    id: '3',
    title: 'Contract Review Meeting',
    customerId: '1',
    type: 'meeting',
    description: 'Review final contract terms and conditions',
    startDate: new Date('2024-02-15T16:00:00'),
    endDate: new Date('2024-02-15T17:30:00'),
    assignedTo: 'Sarah Johnson',
    status: 'scheduled',
    location: 'Client Office',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: '4',
    title: 'Initial Consultation',
    customerId: '3',
    type: 'meeting',
    description: 'Understand business requirements and propose solutions',
    startDate: new Date('2024-02-14T11:00:00'),
    endDate: new Date('2024-02-14T12:00:00'),
    assignedTo: 'Sarah Johnson',
    status: 'scheduled',
    location: 'Video Call',
    createdAt: new Date('2024-01-29'),
    updatedAt: new Date('2024-01-29')
  },
  {
    id: '5',
    title: 'Proposal Presentation',
    customerId: '2',
    type: 'meeting',
    description: 'Present comprehensive digital marketing proposal',
    startDate: new Date('2024-02-16T13:00:00'),
    endDate: new Date('2024-02-16T14:30:00'),
    assignedTo: 'Mike Wilson',
    status: 'scheduled',
    location: 'Client Office',
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30')
  }
]
