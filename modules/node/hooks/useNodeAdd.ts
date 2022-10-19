import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { apiClient } from '@modules/client';
import { Node } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { authAtoms } from '@modules/auth';

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

  const user = useRecoilValue(authAtoms.user);

  const loadLookups = async () => {
    setIsLoading(true);

    const hosts: any = await apiClient.getHosts(
      undefined,
      user?.defaultOrganization?.id || '',
      undefined,
    );

    let mappedHosts = [];

    if (hosts?.code !== 6) {
      mappedHosts = hosts?.map((host: any) => ({
        value: host.id,
        label: host.name,
      }));
      setHostList(mappedHosts);
    }

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

    let org_id = user?.defaultOrganization?.id || '';
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
