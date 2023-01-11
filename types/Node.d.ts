type NodeTypeConfig = {
  name: string;
  default: string;
  ui_type: string;
  value?: any;
  disabled?: boolean;
  required: boolean;
};

type NodeFiles = {
  name: string;
  files: File[];
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
  nodeTypeConfigDetails: { label: string; data: string }[];
  nodeTypeConfig?: NodeTypeConfig[];
};

type CreateNodeParams = {
  nodeType: number;
  blockchain: string;
  nodeTypeProperties: NodeTypeConfig[];
  key_files?: File[];
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
