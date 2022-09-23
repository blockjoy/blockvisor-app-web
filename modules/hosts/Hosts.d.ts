type Node = {
  address: string;
  blockHeight: number;
  blockchainId: {
    value: string;
  };
  createdAt: string;
  groupsList: string[];
  hostId: {
    value: string;
  };
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
  cpuCount: number;
  createdAt: {
    nanos: number;
    seconds: number;
  };
  created_at_datetime: string;
  diskSize: number;
  id: {
    value: string;
  };
  id_str: string;
  ip: string;
  location: string;
  name: string;
  memSize: number;
  nodesList: Node[];
  orgId: {
    value: string;
  };
  os: string;
  osVersion: string;
  status: number;
  version: string;
};
