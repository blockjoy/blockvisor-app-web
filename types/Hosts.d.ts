type HostNode = {
  address?: string;
  blockHeight?: number;
  blockchainId?: string;
  createdAt?: {
    nanos: number;
    seconds: number;
  };
  groupsList: string[];
  hostId?: string;
  id: {
    value: string;
  };
  ip: string;
  name: string;
  nodeData: string;
  orgId: {
    value: string;
  };
  status: number;
  type: number;
  updatedAt: {
    nanos: number;
    seconds: number;
  };
  version: string;
  walletAddress: string;
};

type Host = {
  cpuCount?: number;
  createdAt?: {
    nanos: number;
    seconds: number;
  };
  created_at_datetime?: string;
  diskSize?: number;
  id?: string;
  ip?: string;
  location?: string;
  name?: string;
  memSize?: number;
  nodesList?: HostNode[];
  orgId?: string;
  os?: string;
  osVersion?: string;
  status?: number;
  version?: string;
};
