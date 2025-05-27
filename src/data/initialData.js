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