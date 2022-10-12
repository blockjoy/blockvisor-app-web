import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { apiClient } from '@modules/client';
import { Node } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { toast } from 'react-toastify';
import { useState } from 'react';

type Hook = {
  loadLookups: VoidFunction;
  createNode: (
    args: CreateNodeParams,
    onSuccess: (args0?: any) => void,
  ) => void;
  isLoading: boolean;
  blockchainList: any[];
  hostList: any[];
};

export const useNodeAdd = (): Hook => {
  const [layout, setLayout] = useRecoilState(layoutState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [blockchainList, setBlockchainList] = useState([]);

  const [hostList, setHostList] = useState([]);

  const loadLookups = async () => {
    setIsLoading(true);

    const hosts: any = await apiClient.getHosts();
    const mappedHosts = hosts?.map((host: any) => ({
      value: host.id,
      label: host.name,
    }));
    setHostList(mappedHosts);

    const blockchains: any = await apiClient.getBlockchains();

    const mappedBlockchains = blockchains.map((b: any) => ({
      value: b.id,
      label: b.name,
      supportedNodeTypes: b.supported_node_types,
    }));

    setBlockchainList(mappedBlockchains);

    setIsLoading(false);
  };

  const createNode = async (
    params: CreateNodeParams,
    onSuccess: (args0?: string) => void,
  ) => {
    setIsLoading(true);

    const hostId = params.host;

    const node = new Node();

    // TODO: Org ID needs be set here
    let org_id = process.env.NEXT_PUBLIC_ORG_ID || '';
    let blockchain_id = params.blockchain;

    node.setBlockchainId(blockchain_id);
    node.setOrgId(org_id);
    node.setType(`{ "id": ${params.nodeType.toString()}, "properties": [] }`);
    node.setHostId(hostId);

    const createdNode: any = await apiClient.createNode(node);

    const nodeId = createdNode.messagesList[0];

    toast.success('Node Created');
    setIsLoading(false);
    setLayout(undefined);
    onSuccess(nodeId);
  };

  return {
    loadLookups,
    createNode,
    isLoading,
    blockchainList,
    hostList,
  };
};
