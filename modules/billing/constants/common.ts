export const DEFAULT_ITEM_ID = 'STANDARD';
export const DEFAULT_ITEM_PRICE_ID = 'STANDARD-USD-M';
export const DEFAULT_BILLING_PERIOD = 'month';

export const AVAILABLE_PAYMENT_METHODS: AvailablePaymentMethod[] = [
  {
    id: 'american_express',
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
    title: 'Monthly',
  },
  {
    id: 'year',
    title: 'Yearly',
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
