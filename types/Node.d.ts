type NodeTypeConfig = {
  name: string;
  default: string;
  ui_type: string;
  value?: any;
  disabled?: boolean;
};

type BlockjoyNode = {
  id: string;
  hostId: string;
  name: string;
  ip: string;
  created: string;
  status: number;
  blockchainId: string;
  details: { label: string; data: string }[];
  nodeTypeConfig?: NodeTypeConfig[];
};

type CreateNodeParams = {
  nodeType: number;
  host: string;
  blockchain: string;
};

type UpdateNodeParams = {
  nodeId: string;
  mevBoost?: boolean | undefined;
  validatorKeys?: File[] | undefined;
};
