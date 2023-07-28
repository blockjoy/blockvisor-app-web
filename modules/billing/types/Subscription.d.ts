type UpdateSubscriptionNode =
  | Node
  | NodeLauncherState
  | NodeServiceCreateRequest;

type UpdateSubscriptionHost = Host | HostServiceCreateRequest;

type UpdateSubscriptionPayload = {
  node?: UpdateSubscriptionNode;
  host?: UpdateSubscriptionHost;
};
