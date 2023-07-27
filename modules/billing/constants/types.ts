export enum CreditCardTypes {
  visa = 'Visa',
  mastercard = 'MasterCard',
  american_express = 'American Express',
  discover = 'Discover',
  jcb = 'JCB',
  diners_club = "Diner's Club",
  bancontact = 'Bancontact',
  other = 'Other',
  not_applicable = 'HM',
}

export enum SubscriptionStatus {
  future = 'future',
  in_trial = 'in_trial',
  active = 'active',
  non_renewing = 'non_renewing',
  paused = 'paused',
  cancelled = 'cancelled',
}

export enum InvoiceStatus {
  paid = 'paid',
  posted = 'posted',
  payment_due = 'payment_due',
  not_paid = 'not_paid',
  voided = 'voided',
  pending = 'pending',
}
