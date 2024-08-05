type SubscriptionStatus =
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'paused';

type SubscriptionBillingPeriod = 'month' | 'year';

type SubscriptionActionConfig = {
  heading: string;
  content: string;
};

type SubscriptionView =
  | 'preview'
  | 'cancel-subscription'
  | 'reactivate-subscription'
  | 'restore-subscription';
