export const BILLING_PLANS = [
  {
    id: 'gold',
    title: 'Gold',
    description: 'You save 12$/month by choosing the annual plan.',
    features: [
      'Unlimited Nodes',
      'Unlimited Organizations',
      'Unlimited Collaborators',
      'Email Support',
    ],
    pricing: '$99.00',
    featured: false,
  },
  {
    id: 'platinum',
    title: 'Platinum',
    description: 'You save 24$/month by choosing the annual plan.',
    features: [
      'Unlimited Nodes',
      'Unlimited Organizations',
      'Unlimited Collaborators',
      'Chat Support',
    ],
    pricing: '$199.00',
    featured: true,
  },
  {
    id: 'palladium',
    title: 'Palladium',
    description: 'You save 36$/month by choosing the annual plan.',
    features: [
      'Unlimited Nodes',
      'Unlimited Organizations',
      'Unlimited Collaborators',
      '24/7 Support',
    ],
    pricing: '$299.00',
    featured: false,
  },
];

export const PLAN_DATA = [
  {
    label: 'Active Plan',
    data: 'Pro',
  },
  {
    label: 'Price',
    data: '$199.00',
  },
];
