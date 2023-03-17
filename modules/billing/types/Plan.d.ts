interface IPlan {
  id: string;
  object: string;
  active: boolean;
  aggregate_usage: any;
  amount: number;
  amount_decimal: string;
  billing_scheme: string;
  created: number;
  currency: string;
  interval: string;
  interval_count: number;
  livemode: boolean;
  metadata: {
    featured: boolean;
    features: {
      max_nodes: string;
      max_organizations: string;
      max_collaborators: string;
      support_type: string;
    };
  };
  nickname: string;
  product: string;
  statement_descriptor: string;
  tiers_mode: any;
  transform_usage: any;
  trial_period_days: any;
  usage_type: string;
}

interface IPlansHook {
  plans: IPlan[] | null;
  plansLoadingState: LoadingState;
  getPlans: VoidFunction;
}
