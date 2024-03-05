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
  billingAtoms,
  generateError,
  useUpdateSubscriptionItems,
  usePaymentAuthorization,
} from '@modules/billing';
import { authAtoms } from '@modules/auth';

export const useNodeAdd = () => {
  const { loadNodes } = useNodeList();
  const { getOrganizations } = useGetOrganizations();
  const { loadHosts } = useHostList();

  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const isSuperUser = useRecoilValue(authAtoms.isSuperUser);
  const isEnabledBillingPreview = useRecoilValue(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
  );
  const bypassBillingForSuperUser = useRecoilValue(
    billingAtoms.bypassBillingForSuperUser(isSuperUser),
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
