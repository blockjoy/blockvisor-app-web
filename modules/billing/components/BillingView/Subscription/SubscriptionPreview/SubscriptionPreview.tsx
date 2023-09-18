import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { DetailsView } from '@shared/components';
import {
  billingSelectors,
  SubscriptionInfo,
  PaymentPreview,
  SubscriptionActions,
} from '@modules/billing';
import { usePermissions } from '@modules/auth';

type SubscriptionPreviewProps = {
  handleCancellation: VoidFunction;
};

export const SubscriptionPreview = ({
  handleCancellation,
}: SubscriptionPreviewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const { hasPermission } = usePermissions();
  const canUpdateSubscription = hasPermission('subscription-update');

  return (
    <>
      <DetailsView headline="Info">
        <SubscriptionInfo onlyPreview={!canUpdateSubscription} />
      </DetailsView>
      {subscription?.status === 'active' && canUpdateSubscription && (
        <DetailsView headline="Payment information">
          <PaymentPreview />
        </DetailsView>
      )}
      {canUpdateSubscription && (
        <DetailsView headline="Subscription status">
          <SubscriptionActions handleCancellation={handleCancellation} />
        </DetailsView>
      )}
    </>
  );
};
