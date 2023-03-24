import { useSubscription, mapSubscriptionToDetails } from '@modules/billing';
import { Button, DetailsTable } from '@shared/index';
import { styles } from './SubscriptionPreview.styles';

export type SubscriptionPreviewProps = {
  subscription: ISubscription;
};

export const SubscriptionPreview = ({
  subscription,
}: SubscriptionPreviewProps) => {
  const { cancelSubscription } = useSubscription();
  const subscriptionData = mapSubscriptionToDetails(subscription);

  const handleSubscriptionCancellation = () => cancelSubscription();

  return (
    <div css={styles.wrapper}>
      <h2 css={styles.headline}>Active subscription</h2>
      <DetailsTable bodyElements={subscriptionData} />
      <div css={styles.buttons}>
        <Button style="secondary" onClick={handleSubscriptionCancellation}>
          Update
        </Button>
        <Button style="outline" onClick={cancelSubscription}>
          Cancel Subscription
        </Button>
      </div>
    </div>
  );
};
