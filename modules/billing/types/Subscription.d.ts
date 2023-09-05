type UpdateSubscriptionNode =
  | Node
  | NodeLauncherState
  | NodeServiceCreateRequest;

type UpdateSubscriptionHost = Host | HostServiceCreateRequest;

type UpdateSubscriptionPayload = {
  node?: UpdateSubscriptionNode;
  host?: UpdateSubscriptionHost;
};

type UpdateSubscriptionProperties = {
  renew: {
    value: boolean;
    handleUpdate: VoidFunction;
  };
  period: {
    value: string;
    handleUpdate: (billingPeriod: BillingPeriod) => void;
  };
};
