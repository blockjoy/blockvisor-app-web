interface ISubscriptionHook {
  subscriptionLoadingState: LoadingState;
  getSubscription: (subscriptionId: string) => void;
  createSubscription: (subscriptionInputParams: any) => void;
  updateSubscription: (id: string) => void;
  cancelSubscription: (
    id: string,
    params: _subscription.update_for_items_params,
  ) => void;
  restoreSubscription: (id: string) => void;
  reactivateSubscription: (id: string) => void;
  updateBillingProfile: (id: string, params) => void;
}
interface IUpdateSubscriptionHook {
  subscriptionLoadingState: LoadingState;
  updateSubscriptionItems: (action: { type: string; payload: any }) => void;
}
