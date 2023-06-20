type BillingState = {
  customer: Customer | null;
  subscriptions: {
    'hosted-nodes': Subscription | null;
    'self-managed-hosts': Subscription | null;
    'fully-managed-hosts': Subscription | null;
  };
};
