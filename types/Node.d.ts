type BlockjoyNode = {
  id: string;
  hostId: string;
  name: string;
  ip: string;
  created: string;
  status: number;
  details: { label: string; data: string }[];
};

type CreateNodeParams = {
  nodeType: number;
  host: string;
  blockchain: string;
};
