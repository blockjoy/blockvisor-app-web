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
  period: {
    value: string;
    handleUpdate: (billingPeriod: BillingPeriod) => void;
  };
};
