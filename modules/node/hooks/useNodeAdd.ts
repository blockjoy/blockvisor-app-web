import { useRecoilValue } from 'recoil';
import {
  NodeServiceCreateRequest,
  Node,
} from '@modules/grpc/library/blockjoy/v1/node';
import { nodeClient } from '@modules/grpc';
import { useNodeList } from '@modules/node';
import { useGetOrganizations } from '@modules/organization';
import { useHostList } from '@modules/host';
import {
  UpdateSubscriptionAction,
  generateError,
  useUpdateSubscriptionItems,
  usePaymentAuthorization,
  billingSelectors,
} from '@modules/billing';
import { authSelectors } from '@modules/auth';

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { getOrganizations } = useGetOrganizations();
  const { loadHosts } = useHostList();

  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const isEnabledBillingPreview = useRecoilValue(
    billingSelectors.isEnabledBillingPreview,
  );
  const bypassBillingForSuperUser = useRecoilValue(
    billingSelectors.bypassBillingForSuperUser,
  );
  const { authorizePayment } = usePaymentAuthorization();

  const createNode = async (
    node: NodeServiceCreateRequest,
    onSuccess: (nodeId: string) => void,
    onError: (errorMessage: string) => void,
  ) => {
    const properties = node?.properties?.map((property) => ({
      ...property,
      value: property?.value?.toString() || 'null',
    }));

    const nodeRequest = {
      ...node,
      properties,
    };

    try {
      const createNodeCallback = async () => {
        const response: Node = await nodeClient.createNode(nodeRequest);

        if (isEnabledBillingPreview && !bypassBillingForSuperUser)
          try {
            await updateSubscriptionItems({
              type: UpdateSubscriptionAction.ADD_NODE,
              payload: { node: response },
            });
          } catch (error: any) {
            const errorMessage = generateError(error);
            onError(errorMessage);
            return;
          }

        loadNodes();
        loadHosts();
        getOrganizations();
        onSuccess(response.id);
      };

      isEnabledBillingPreview
        ? await authorizePayment(createNodeCallback)
        : createNodeCallback();
    } catch (err: any) {
      console.log('Error Launching Node', err);
      onError('Error launching node, an unknown error occurred.');
    }
  };

  return {
    createNode,
  };
};
