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
    updatedAt: new Date('2024-01-20'),
    companySize: 150,
    engagementLevel: 'High',
    responseTime: 2,
    leadScore: 82,
    scoringHistory: [
      { date: new Date('2024-01-15'), score: 75, reason: 'Initial scoring' },
      { date: new Date('2024-01-18'), score: 82, reason: 'Engagement level updated' }
    ]
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
    updatedAt: new Date('2024-01-22'),
    companySize: 45,
    engagementLevel: 'Medium',
    responseTime: 12,
    leadScore: 76,
    scoringHistory: [
      { date: new Date('2024-01-18'), score: 76, reason: 'Initial scoring' }
    ]
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
    updatedAt: new Date('2024-01-24'),
    companySize: 12,
    engagementLevel: 'Low',
    responseTime: 48,
    leadScore: 45,
    scoringHistory: [
      { date: new Date('2024-01-20'), score: 45, reason: 'Initial scoring' }
    ]
  }
]
// Default lead scoring criteria
export const DEFAULT_SCORING_CRITERIA = [
  {
    id: '1',
    name: 'Company Size',
    description: 'Score based on company employee count',
    weight: 25,
    type: 'range',
    ranges: [
      { min: 0, max: 10, score: 10, label: '1-10 employees' },
      { min: 11, max: 50, score: 20, label: '11-50 employees' },
      { min: 51, max: 200, score: 35, label: '51-200 employees' },
      { min: 201, max: 1000, score: 45, label: '201-1000 employees' },
      { min: 1001, max: 99999, score: 50, label: '1000+ employees' }
    ]
  },
  {
    id: '2',
    name: 'Deal Value',
    description: 'Score based on potential deal value',
    weight: 30,
    type: 'range',
    ranges: [
      { min: 0, max: 5000, score: 10, label: 'Under $5K' },
      { min: 5001, max: 15000, score: 25, label: '$5K - $15K' },
      { min: 15001, max: 50000, score: 40, label: '$15K - $50K' },
      { min: 50001, max: 100000, score: 50, label: '$50K - $100K' },
      { min: 100001, max: 999999, score: 60, label: 'Over $100K' }
    ]
  },
  {
    id: '3',
    name: 'Lead Source Quality',
    description: 'Score based on lead source effectiveness',
    weight: 20,
    type: 'categorical',
    categories: [
      { value: 'Referral', score: 50, label: 'Referral' },
      { value: 'LinkedIn', score: 40, label: 'LinkedIn' },
      { value: 'Website', score: 30, label: 'Website' },
      { value: 'Cold Call', score: 20, label: 'Cold Call' },
      { value: 'Email', score: 25, label: 'Email Campaign' }
    ]
  },
  {
    id: '4',
    name: 'Engagement Level',
    description: 'Score based on customer engagement',
    weight: 15,
    type: 'categorical',
    categories: [
      { value: 'High', score: 50, label: 'High Engagement' },
      { value: 'Medium', score: 30, label: 'Medium Engagement' },
      { value: 'Low', score: 15, label: 'Low Engagement' },
      { value: 'None', score: 5, label: 'No Engagement' }
    ]
  },
  {
    id: '5',
    name: 'Response Time',
    description: 'Score based on response speed to inquiries',
    weight: 10,
    type: 'range',
    ranges: [
      { min: 0, max: 1, score: 50, label: 'Within 1 hour' },
      { min: 2, max: 24, score: 40, label: '1-24 hours' },
      { min: 25, max: 72, score: 25, label: '1-3 days' },
      { min: 73, max: 168, score: 15, label: '3-7 days' },
      { min: 169, max: 9999, score: 5, label: 'Over 1 week' }
    ]
  }
]


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