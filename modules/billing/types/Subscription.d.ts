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
