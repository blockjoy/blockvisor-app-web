type NodeFiles = {
  name: string;
  files: File[];
};

type BlockjoyNode = {
  id: string;
  hostId: string;
  name: string;
  ip: string;
  created?: string;
  status: number;
  blockchainId: string;
  blockchainName: string;
  propertiesList: Node.NodeProperty.AsObject[];
  type: number;
  hostName?: string;
  address?: string;
  version?: string;
  blockHeight?: string;
  network?: string;
};

type UpdateNodeParams = {
  nodeId: string;
  mevBoost?: boolean | undefined;
  validatorKeys?: File[] | undefined;
};

type NodeMetrics = {
  name: number;
  value: string;
};

type NodeFirewallRule = {
  ip: string;
  description?: string;
};
