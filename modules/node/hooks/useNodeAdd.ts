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
    onError: () => void,
  ) => void;
  isLoading: boolean;
  blockchainList: any[];
};

export const useNodeAdd = (): Hook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blockchainList, setBlockchainList] = useState([]);
  const repository = useIdentityRepository();

  const loadLookups = async () => {
    setIsLoading(true);

    const blockchains: any = await apiClient.getBlockchains();

    console.log('loadLookups', !blockchains?.length);

    // if (!blockchains?.length) {
    //   setBlockchainList([]);
    //   setIsLoading(false);
    //   return;
    // }

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
    onError: () => void,
  ) => {
    setIsLoading(true);
    const node = new Node();

    const orgId = repository?.getIdentity()?.defaultOrganization?.id ?? '';
    let blockchain_id = params.blockchain;

    node.setBlockchainId(blockchain_id);
    node.setOrgId(orgId);
    // TODO: Create type data based on the type definitions in
    // https://github.com/blockjoy/blockvisor-api/blob/24c83705064a2331f5f2c4643f34553cbffedea3/conf/node_types.schema.ts#L98

    // TODO: @joe/@dragan: JSON format has changed, plz use the following:
    /**
     * pub struct NodePropertyValue {
     *     name: String,
     *     label: String,
     *     description: String,
     *     ui_type: String,
     *     disabled: bool,
     *     required: bool,
     *     value: Option<String>,
     * }
     */
    const nodeTypeString = JSON.stringify({
      id: params.nodeType,
      properties: params.nodeTypeProperties.map((property) => ({
        ...property,
        default: property.default === null ? 'null' : property.default,
        value: property?.value?.toString() || 'null',
        description: '',
        label: '',
      })),
    });

    console.log({
      id: params.nodeType,
      properties: params.nodeTypeProperties.map((property) => ({
        ...property,
        default: property.default === null ? 'null' : property.default,
        value: property.value === null ? 'null' : property.value,
        description: '',
        label: '',
      })),
    });

    node.setType(nodeTypeString);
    node.setVersion(params.version);

    try {
      const createdNode: any = await apiClient.createNode(
        node,
        params.key_files,
      );
      console.log('createNode', createdNode);
      const nodeId = createdNode.messagesList[0];

      toast.success('Node Created');
      setIsLoading(false);
      onSuccess(nodeId);
    } catch (err) {
      onError();
    }
  };

  return {
    loadLookups,
    createNode,
    isLoading,
    blockchainList,
  };
};
