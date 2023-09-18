import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import { DetailsView } from '@shared/components';
import {
  billingSelectors,
  SubscriptionInfo,
  PaymentPreview,
  SubscriptionActions,
} from '@modules/billing';
import { useHasPermissions } from '@modules/auth';

type SubscriptionPreviewProps = {
  itemPrices: ItemPrice[];
  handleCancellation: VoidFunction;
};

export const SubscriptionPreview = ({
  itemPrices,
  handleCancellation,
}: SubscriptionPreviewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const canUpdateSubscription = useHasPermissions('subscription-update');

  return (
    <>
      <DetailsView headline="Info">
        <SubscriptionInfo
          itemPrices={itemPrices}
          onlyPreview={!canUpdateSubscription}
        />
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
