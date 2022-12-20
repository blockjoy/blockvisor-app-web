import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { apiClient } from '@modules/client';
import { Node } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useIdentityRepository } from '@modules/auth/hooks/useIdentityRepository';

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

  const repository = useIdentityRepository();

  const loadLookups = async () => {
    setIsLoading(true);
    const orgId = repository?.getIdentity()?.defaultOrganization?.id;
    const hosts: any = await apiClient.getHosts(
      undefined,
      orgId || '',
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

    console.log('blockchains', blockchains);

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

    console.log('params', params);

    const hostId = params.host;

    const node = new Node();

    const orgId = repository?.getIdentity()?.defaultOrganization?.id ?? '';
    let blockchain_id = params.blockchain;

    node.setBlockchainId(blockchain_id);
    node.setOrgId(orgId);
    // TODO: Create type data based on the type definitions in
    // https://github.com/blockjoy/blockvisor-api/blob/24c83705064a2331f5f2c4643f34553cbffedea3/conf/node_types.schema.ts#L98

    const nodeTypeString = JSON.stringify({
      id: params.nodeType,
      properties: params.nodeTypeProperties.map((property) => ({
        ...property,
        default: property.default === null ? 'null' : property.default,
        value: property.value === null ? 'null' : property.value,
      })),
    });

    node.setType(nodeTypeString);

    console.log('nodeTypeString', nodeTypeString);

    node.setHostId(hostId);

    // TODO: MOVE THIS TO UPDATE NODE
    // const dT = new DataTransfer();

    // dT.items.add(params.key_files, '.svg');

    // params.key_files?.forEach(async (key) => {
    //   const data = await key.text();
    //   dT.items.add(data, key.type);
    // });

    const createdNode: any = await apiClient.createNode(node, params.key_files);

    console.log('createNode', createdNode);

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
