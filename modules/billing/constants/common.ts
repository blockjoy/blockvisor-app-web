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
