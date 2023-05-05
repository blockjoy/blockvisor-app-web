type NodeFiles = {
  name: string;
  files: File[];
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

type FilteredIpAddr = {
  ip: string;
  description?: string;
};
