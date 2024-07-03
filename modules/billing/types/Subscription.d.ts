type UpdateSubscriptionProperties = {
  period: {
    value: string;
    handleUpdate: (billingPeriod: BillingPeriod) => void;
  };
};

type SubscriptionMetadata = {
  subscriptionItems: SubscriptionMetadataItem[];
};

type SubscriptionMetadataItem = {
  id?: string;
  createdAt?: Date;
  itemPriceID?: string;
};

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
