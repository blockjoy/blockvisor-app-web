import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { apiClient } from '@modules/client';
import { Blockchain, Node, Uuid } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { GrpcHostObject } from '@modules/client/grpc_client';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNodeList } from './useNodeList';
import NodeType = Node.NodeType;

type Hook = {
  loadLookups: VoidFunction;
  createNode: (args: CreateNodeParams) => void;
  isLoading: boolean;
  blockchainList: any[];
  hostList: any[];
};

export const useNodeAdd = (): Hook => {
  const [layout, setLayout] = useRecoilState(layoutState);

  const { loadNodes } = useNodeList();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [blockchainList, setBlockchainList] = useState([]);

  const [hostList, setHostList] = useState([]);

  const loadLookups = async () => {
    setIsLoading(true);

    const hosts: any = await apiClient.getHosts();
    const mappedHosts = hosts.map((host: any) => ({
      value: host.id.value,
      label: host.name,
    }));
    setHostList(mappedHosts);

    const blockchains: any = await apiClient.getBlockchains();
    const mappedBlockchains = blockchains.map((b: any) => ({
      value: b.id.value,
      label: b.name,
      supportedNodeTypes: b.supportedNodesTypesList,
    }));

    setBlockchainList(mappedBlockchains);

    setIsLoading(false);
  };

  const createNode = async (params: CreateNodeParams) => {
    setIsLoading(true);

    const hostId = new Uuid();
    hostId.setValue(params.host);

    const node = new Node();
    node.setType(+params.nodeType);
    node.setHostId(hostId);

    await apiClient.createNode(node);

    toast.success('Node Created');
    setIsLoading(false);
    setLayout(undefined);
    loadNodes();
  };

  return {
    loadLookups,
    createNode,
    isLoading,
    blockchainList,
    hostList,
  };
};
