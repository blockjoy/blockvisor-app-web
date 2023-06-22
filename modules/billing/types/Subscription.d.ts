interface ISubscriptionHook {
  subscriptionLoadingState: LoadingState;
  getSubscription: (subscriptionId: string) => void;
  createSubscription: (params: _subscription.create_with_items_params) => void;
  updateSubscription: (params: _subscription.update_for_items_params) => void;
  cancelSubscription: (params: _subscription.update_for_items_params) => void;
  restoreSubscription: (id: string) => void;
  reactivateSubscription: (id: string) => void;
  updateBillingProfile: (id: string, params) => void;
}
interface IUpdateSubscriptionHook {
  subscriptionLoadingState: LoadingState;
  updateSubscriptionItems: (action: { type: string; payload: any }) => void;
}
