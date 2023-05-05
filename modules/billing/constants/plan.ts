type SupportPlanType = {
  [key: string]: {
    monthly: string;
    yearly: string;
  };
};

export const PLANS = {
  SINGLE_NODE: {
    monthly: 'single-node-USD-Monthly',
    yearly: 'single-node-USD-Yearly',
  },
};

export const SUPPORT_PLANS: SupportPlanType = {
  'support-gold': {
    monthly: 'support-gold-USD-Monthly',
    yearly: 'support-gold-USD-Yearly',
  },
  'support-platinum': {
    monthly: 'support-platinum-USD-Monthly',
    yearly: 'support-platinum-USD-Yearly',
  },
  'support-palladium': {
    monthly: 'support-palladium-USD-Monthly',
    yearly: 'support-palladium-USD-Yearly',
  },
};
