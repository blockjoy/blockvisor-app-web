import { useSubscription } from '@modules/billing/hooks/useSubscription';
import { mapSubscriptionToDetails } from '@modules/billing/utils/mapSubscriptionToDetails';
import { ButtonGroup } from '@shared/components/Buttons/ButtonGroup/ButtonGroup';
import { Button, DetailsTable } from '@shared/index';
import { styles } from './SubscriptionInfo.styles';

type SubscriptionInfoProps = {
  handleCancellation: VoidFunction;
};

export const SubscriptionInfo = ({
  handleCancellation,
}: SubscriptionInfoProps) => {
  const { subscription, restoreSubscription, reactivateSubscription } =
    useSubscription();
  const subscriptionData = mapSubscriptionToDetails(subscription);

  const handleRestoreSubscription = () => restoreSubscription();
  const handleReactivateSubscription = () => reactivateSubscription();

  return (
    <>
      <DetailsTable bodyElements={subscriptionData} />
      <ButtonGroup type="flex">
        {subscription?.status === 'active' && (
          <Button style="outline" size="small" onClick={handleCancellation}>
            Cancel subscription
          </Button>
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
    </>
  );
};
