import {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
} from '@stripe/stripe-js';

export const DEFAULT_ITEM_ID = 'STANDARD';
export const DEFAULT_ITEM_PRICE_ID = 'STANDARD-USD-M';
export const DEFAULT_BILLING_PERIOD = 'month';

export const PLAN_ITEM = {
  description: '',
  features: [
    {
      name: 'FMN',
      description: 'Pay for what you use',
      title: 'Fully-Managed Nodes',
    },
    {
      name: 'SMH',
      description: '$5 per thread',
      title: 'Self-Managed Hosts',
    },
    {
      name: 'UO',
      description: 'No restrictions on growth',
      title: 'Unlimited Organizations',
    },
    {
      name: 'UC',
      description: 'Foster collaboration without limits',
      title: 'Unlimited Collaborators',
    },
  ],
  priceInfo: [
    'Starts at $0',
    'Usage-Based Pricing',
    'Flexible Billing Options',
  ],
  priceLabel: 'Pay As You Go',
  title: 'Standard',
};

export const AVAILABLE_PAYMENT_METHODS: AvailablePaymentMethod[] = [
  {
    id: 'amex',
    name: 'AmericanExpress',
    title: 'American Express',
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    title: 'Master Card',
  },
  {
    id: 'visa',
    name: 'Visa',
    title: 'Visa',
  },
  {
    id: 'discover',
    name: 'Discover',
    title: 'Discover',
  },
];

export const BILLING_PERIOD: BillingPeriod[] = [
  {
    id: 'month',
    name: 'Monthly',
  },
  {
    id: 'year',
    name: 'Yearly',
  },
];

export const PROMO_CODE_ERROR_MESSAGES = {
  INVALID: 'Invalid promo code',
  REDEEMED: 'Promo code redeemed',
  EXPIRED: 'Promo code expired',
  UNEXPECTED: 'Unexpected error occurred',
};

export const LAUNCH_ERRORS = {
  NO_PERMISSION: 'Insufficient permissions to launch.',
  NO_BILLING: 'Payment required to launch.',
  NO_ACTIVE_SUBSCRIPTION: 'Active subscription required to launch.',
};

export const CARD_ELEMENT_OPTIONS:
  | StripeCardNumberElementOptions
  | StripeCardExpiryElementOptions
  | StripeCardCvcElementOptions = {
  style: {
    base: {
      color: '#f7faf5',
      fontSize: '16px',
      '::placeholder': {
        color: '#a5a8a3',
      },
    },
  },
};
