import { useSubscription } from '@modules/billing/hooks/useSubscription';
import { billingSelectors, mapSubscriptionToDetails } from '@modules/billing';
import { ButtonGroup, Button, DetailsTable } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { useRecoilValue } from 'recoil';
import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationSelectors } from '@modules/organization';
import { useHasPermissions, Permissions } from '@modules/auth';

type SubscriptionInfoProps = {
  handleUpdate: VoidFunction;
  handleCancellation: VoidFunction;
};

export const SubscriptionInfo = ({
  handleUpdate,
  handleCancellation,
}: SubscriptionInfoProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const { restoreSubscription, reactivateSubscription } = useSubscription();
  const subscriptionData = mapSubscriptionToDetails(subscription!);

  const handleRestoreSubscription = () =>
    restoreSubscription(subscription?.id!);
  const handleReactivateSubscription = () =>
    reactivateSubscription(subscription?.id!);

  const userRoleInOrganization: OrgRole = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canUpdateBilling: boolean = useHasPermissions(
    userRoleInOrganization,
    Permissions.UPDATE_BILLING,
  );

  return (
    <>
      <DetailsTable bodyElements={subscriptionData} />
      {canUpdateBilling && (
        <ButtonGroup type="flex" additionalStyles={[spacing.top.large]}>
          {subscription?.status === 'active' && (
            <ButtonGroup type="flex">
              <Button style="secondary" size="small" onClick={handleUpdate}>
                Update subscription
              </Button>
              <Button style="outline" size="small" onClick={handleCancellation}>
                Cancel subscription
              </Button>
            </ButtonGroup>
          )}
          {subscription?.status === 'non_renewing' && (
            <Button
              style="outline"
              size="small"
              onClick={handleRestoreSubscription}
            >
              Restore subscription
            </Button>
          )}
          {subscription?.status === 'cancelled' && (
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
    </>
  );
};
