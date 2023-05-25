interface ISubscriptionHook {
  subscription: any | null;
  subscriptionLoadingState: LoadingState;
  getSubscription: (subscriptionId: string) => void;
  createSubscription: (subscriptionInputParams: any) => void;
  updateSubscription: (subscription: any) => void;
  updateSubscriptionItems: (subscription: any) => void;
  cancelSubscription: (params: any) => void;
  restoreSubscription: VoidFunction;
  reactivateSubscription: VoidFunction;
  updateBillingProfile: (paymentMethodId: string) => void;
}
