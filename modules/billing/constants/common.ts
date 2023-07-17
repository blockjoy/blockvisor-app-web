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
  in_trial = 'in trial',
  active = 'active',
  non_renewing = 'non renewing',
  paused = 'paused',
  cancelled = 'cancelled',
}

export enum InvoiceStatus {
  paid = 'paid',
  posted = 'posted',
  payment_due = 'payment due',
  not_paid = 'not paid',
  voided = 'voided',
  pending = 'pending',
}
