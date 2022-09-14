import { useRecoilValue, useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store';
import { apiClient } from '@modules/client';
import { Node, Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { toast } from 'react-toastify';

export type CreateNodeParams = {
  nodeType: string;
  host: string;
};

type Hook = {
  loadHosts: VoidFunction;
  createNode: (args: CreateNodeParams) => void;
};

export const useNodeAdd = (): Hook => {
  const [layout, setLayout] = useRecoilState(layoutState);

  const loadHosts = async () => {
    setLayout({
      ...layout,
      nodeAddHostsListLoading: true,
    });
    const hosts: any = await apiClient.getHosts();

    const mappedHosts = hosts.map((host: any) => ({
      value: host.id.value,
      label: host.name,
    }));

    setLayout({
      ...layout,
      nodeAddHostsList: mappedHosts,
      nodeAddHostsListLoading: false,
    });

    console.log('useNodeAdd Load hosts', mappedHosts);
  };

  const createNode = async (params: CreateNodeParams) => {
    console.log('createNode', params);

    setLayout({
      ...layout,
      nodeAddCreating: true,
    });

    const nodeType = Node.NodeType[params.nodeType];

    const hostId = new Uuid();
    hostId.setValue(params.host);

    const node = new Node();
    node.setType(nodeType);
    node.setHostId();

    await apiClient.createNode(node);

    toast.success('Node Created');

    setLayout({
      ...layout,
      isNodeAddOpen: false,
      nodeAddCreating: false,
    });
  };

  return {
    loadHosts,
    createNode,
  };
};
