import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
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
    const orgId = repository?.getIdentity()?.defaultOrganization?.id ?? '';

    const nodeProperties: any = params.nodeTypeProperties.map((property) => {
      const { ui_type, ...rest } = property;
      return {
        ...rest,
        default: property.default === null ? 'null' : property.default,
        value: property?.value?.toString() || 'null',
        description: '',
        label: '',
        uiType: ui_type,
      };
    });

    const response: any = await apiClient.createNode(
      {
        org_id: orgId,
        blockchain_id: params.blockchain,
        version: params.version ?? '',
        type: params.nodeType,
        properties: nodeProperties,
        network: params.network,
      },
      params.key_files,
    );

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
