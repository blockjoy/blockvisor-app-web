import { useSubscription, mapSubscriptionToDetails } from '@modules/billing';
import { Button, DetailsTable } from '@shared/index';
import { styles } from './SubscriptionPreview.styles';
import { Subscription } from 'chargebee-typescript/lib/resources';

export type SubscriptionPreviewProps = {
  subscription: Subscription;
};

// TODO: add dialog when cancelling
// TODO: general logic improvements
export const SubscriptionPreview = ({
  subscription,
}: SubscriptionPreviewProps) => {
  const { cancelSubscription, restoreSubscription, reactivateSubscription } =
    useSubscription();
  const subscriptionData = mapSubscriptionToDetails(subscription);

  const handleCancelSubscription = () => cancelSubscription(subscription.id);

  const handleRestoreSubscription = () => restoreSubscription(subscription.id);
  const handleReactivateSubscription = () =>
    reactivateSubscription(subscription.id);

  return (
    <div css={styles.wrapper}>
      <h2 css={styles.headline}>Active subscription</h2>
      <DetailsTable bodyElements={subscriptionData} />
      <div css={styles.buttons}>
        {subscription?.status === 'active' && (
          <Button style="secondary" onClick={handleCancelSubscription}>
            Update
          </Button>
        )}
        {subscription?.status === 'active' && (
          <Button style="outline" onClick={handleCancelSubscription}>
            Cancel
          </Button>
        )}
        {subscription?.status === 'non_renewing' && (
          <Button style="outline" onClick={handleRestoreSubscription}>
            Restore
          </Button>
        )}
        {subscription?.status === 'cancelled' && (
          <Button style="outline" onClick={handleReactivateSubscription}>
            Reactivate
          </Button>
        )}
      </div>
    </div>
  );
};
