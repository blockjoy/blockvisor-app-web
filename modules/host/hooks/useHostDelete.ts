import { useRecoilValue } from 'recoil';
import { hostClient } from '@modules/grpc';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import {
  UpdateSubscriptionAction,
  generateError,
  useUpdateSubscriptionItems,
  billingSelectors,
} from '@modules/billing';

export function useHostDelete() {
  const { updateSubscriptionItems } = useUpdateSubscriptionItems();
  const isEnabledBillingPreview = useRecoilValue(
    billingSelectors.isEnabledBillingPreview,
  );
  const bypassBillingForSuperUser = useRecoilValue(
    billingSelectors.bypassBillingForSuperUser,
  );

  const deleteHost = async (host: Host, onSuccess: VoidFunction) => {
    if (isEnabledBillingPreview && !bypassBillingForSuperUser)
      try {
        await updateSubscriptionItems({
          type: UpdateSubscriptionAction.REMOVE_HOST,
          payload: { host: host },
        });
      } catch (error: any) {
        const errorMessage = generateError(error);
        console.log('Error occured while deleting a host', errorMessage);
        return;
      }

    await hostClient.deleteHost(host?.id);

    onSuccess();
  };

  return {
    deleteHost,
  };
}
