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
  id?: string;
  ip?: string;
  name?: string;
  nodeData?: string;
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
