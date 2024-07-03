export enum CreditCardBrand {
  visa = 'Visa',
  mastercard = 'MasterCard',
  amex = 'American Express',
  discover = 'Discover',
  jcb = 'JCB',
  diners = "Diner's Club",
}

export enum InvoiceStatus {
  paid = 'paid',
  draft = 'draft',
  open = 'open',
  uncollectible = 'uncollectible',
  void = 'void',
}

export enum SubscriptionStatus {
  active = 'active',
  non_renewing = 'non_renewing',
  cancelled = 'cancelled',
}
