import { apiClient } from '@modules/client';
import { Node } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useIdentityRepository } from '@modules/auth/hooks/useIdentityRepository';
import { useNodeList } from './useNodeList';

export const useNodeAdd = () => {
  const repository = useIdentityRepository();

  const { loadNodes } = useNodeList();

  const createNode = async (
    params: CreateNodeParams,
    onSuccess: (nodeId: string) => void,
    onError: (errorMessage: string) => void,
  ) => {
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

    node.setType(nodeTypeString);
    node.setVersion(params.version);

    const response: any = await apiClient.createNode(node, params.key_files);

    try {
      const nodeId = response.messagesList[0];
      toast.success('Node Created');
      loadNodes();
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
  };

  return {
    createNode,
  };
};
