import { apiClient } from '@modules/client';
import { Node } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useIdentityRepository } from '@modules/auth/hooks/useIdentityRepository';

export const useNodeAdd = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const repository = useIdentityRepository();

  const createNode = async (
    params: CreateNodeParams,
    onSuccess: (nodeId: string) => void,
    onError: (errorMessage: string) => void,
  ) => {
    setIsLoading(true);
    const node = new Node();

    const orgId = repository?.getIdentity()?.defaultOrganization?.id ?? '';
    let blockchain_id = params.blockchain;

    node.setBlockchainId(blockchain_id);
    node.setOrgId(orgId);
    node.setNetwork(params.network);
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

    const response: any = await apiClient.createNode(node, params.key_files);
    console.log('createNode', response);

    try {
      const nodeId = response.messagesList[0];
      toast.success('Node Created');
      onSuccess(nodeId);
    } catch (err) {
      let errorMessage =
        'Error launching node, please contact our support team.';
      if (response?.message?.includes('No free IP available')) {
        errorMessage = 'Error launching node, no free IP address available.';
      } else if (response?.message?.includes('User node quota exceeded')) {
        errorMessage = 'Unable to launch, node quota exceeded.';
      }
      onError(errorMessage);
    }

    setIsLoading(false);
  };

  return {
    createNode,
    isLoading,
  };
};
