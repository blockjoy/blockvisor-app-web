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
import { usePermissions } from '@modules/auth';

type SubscriptionPreviewProps = {
  onViewChange: SetterOrUpdater<ActiveView>;
};

export const SubscriptionPreview = ({
  onViewChange,
}: SubscriptionPreviewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const { hasPermission } = usePermissions();
  const canUpdateSubscription = hasPermission('subscription-update');
  const canDeleteSubscription = hasPermission('subscription-delete');

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
