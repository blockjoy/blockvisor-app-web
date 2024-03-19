import { SetterOrUpdater, useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { DetailsView } from '@shared/components';
import {
  billingSelectors,
  SubscriptionInfo,
  PaymentPreview,
  SubscriptionActions,
  ActiveView,
} from '@modules/billing';
import { authSelectors } from '@modules/auth';

type SubscriptionPreviewProps = {
  onViewChange: SetterOrUpdater<ActiveView>;
};

export const SubscriptionPreview = ({
  onViewChange,
}: SubscriptionPreviewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const canUpdateSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-update'),
  );
  const canDeleteSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-delete'),
  );

  return (
    <>
      {canUpdateSubscription ? (
        <DetailsView headline="Info">
          <SubscriptionInfo onlyPreview={!canUpdateSubscription} />
        </DetailsView>
      ) : (
        <SubscriptionInfo onlyPreview={!canUpdateSubscription} />
      )}
      {subscription?.status !== 'cancelled' && canUpdateSubscription && (
        <DetailsView headline="Payment information">
          <PaymentPreview />
        </DetailsView>
      )}
      {canUpdateSubscription && canDeleteSubscription && (
        <DetailsView headline="Subscription status">
          <SubscriptionActions onViewChange={onViewChange} />
        </DetailsView>
      )}
    </>
  );
};
