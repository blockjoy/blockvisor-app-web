interface ISubscription {
  id: string;
  object: string;
  application: any;
  application_fee_percent: any;
  automatic_tax: {
    enabled: boolean;
  };
  billing_cycle_anchor: number;
  billing_thresholds: any;
  cancel_at: any;
  cancel_at_period_end: boolean;
  canceled_at: any;
  cancellation_details: {
    comment: any;
    feedback: any;
    reason: any;
  };
  collection_method: string;
  created: number;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  days_until_due: any;
  default_payment_method: any;
  default_source: any;
  default_tax_rates: any;
  description: any;
  discount: any;
  ended_at: any;
  items: {
    object: string;
    data: {
      id: string;
      object: string;
      billing_thresholds: any;
      created: number;
      metadata: {};
      price: {
        id: string;
        object: string;
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: string;
        custom_unit_amount: any;
        livemode: boolean;
        lookup_key: any;
        metadata: {};
        nickname: any;
        product: string;
        recurring: {
          aggregate_usage: any;
          interval: string;
          interval_count: number;
          usage_type: string;
        };
        tax_behavior: string;
        tiers_mode: any;
        transform_quantity: any;
        type: string;
        unit_amount: number;
        unit_amount_decimal: string;
      };
      quantity: number;
      subscription: string;
      tax_rates: any;
    }[];
    has_more: boolean;
    url: string;
  };
  latest_invoice: any;
  livemode: boolean;
  metadata: {};
  next_pending_invoice_item_invoice: any;
  on_behalf_of: any;
  pause_collection: any;
  payment_settings: {
    payment_method_options: any;
    payment_method_types: any;
    save_default_payment_method: any;
  };
  pending_invoice_item_interval: any;
  pending_setup_intent: any;
  pending_update: any;
  schedule: any;
  start_date: number;
  status: string;
  test_clock: any;
  transfer_data: any;
  trial_end: any;
  trial_settings: {
    end_behavior: {
      missing_payment_method: string;
    };
  };
  trial_start: any;
}

interface ISubscriptionHook {
  subscription: ISubscription | null;
  subscriptionLoadingState: LoadingState;
  getSubscription: VoidFunction;
  createSubscription: (subscription: ISubscription) => void;
  updateSubscription: (subscription: ISubscription) => void;
  cancelSubscription: VoidFunction;
}
