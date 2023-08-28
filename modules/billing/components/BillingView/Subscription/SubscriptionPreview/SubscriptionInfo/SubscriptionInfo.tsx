import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import {
  SubscriptionStatus,
  billingSelectors,
  mapSubscriptionToDetails,
  useSubscriptionLifecycle,
} from '@modules/billing';
import { ButtonGroup, Button, DetailsTable } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { organizationSelectors } from '@modules/organization';
import { useHasPermissions, Permissions, authSelectors } from '@modules/auth';
import { containers } from 'styles/containers.styles';

type SubscriptionInfoProps = {
  handleUpdate: VoidFunction;
  handleCancellation: VoidFunction;
};

export const SubscriptionInfo = ({
  handleUpdate,
  handleCancellation,
}: SubscriptionInfoProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const { restoreSubscription, reactivateSubscription } =
    useSubscriptionLifecycle();
  const subscriptionData = mapSubscriptionToDetails(subscription!);

  const handleRestoreSubscription = useCallback(() => {
    restoreSubscription(subscription?.id!);
  }, [restoreSubscription, subscription]);

  const handleReactivateSubscription = useCallback(() => {
    reactivateSubscription(subscription?.id!);
  }, [reactivateSubscription, subscription]);

  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canUpdateBilling: boolean = useHasPermissions(
    userRole,
    userRoleInOrganization,
    Permissions.UPDATE_BILLING,
  );

  return (
    <div css={containers.mediumSmall}>
      <DetailsTable bodyElements={subscriptionData} />

      {canUpdateBilling && (
        <ButtonGroup type="flex" additionalStyles={[spacing.top.large]}>
          {subscription?.status === SubscriptionStatus.active && (
            <>
              <Button style="secondary" size="small" onClick={handleUpdate}>
                Update subscription
              </Button>
              <Button style="outline" size="small" onClick={handleCancellation}>
                Cancel subscription
              </Button>
            </>
          )}

          {subscription?.status === SubscriptionStatus.non_renewing && (
            <Button
              style="outline"
              size="small"
              onClick={handleRestoreSubscription}
            >
              Restore subscription
            </Button>
          )}

          {subscription?.status === SubscriptionStatus.cancelled && (
            <Button
              style="outline"
              size="small"
              onClick={handleReactivateSubscription}
            >
              Reactivate subscription
            </Button>
          )}
        </ButtonGroup>
      )}
    </div>
  );
};
