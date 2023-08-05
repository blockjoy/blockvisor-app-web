import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { DetailsView } from '@shared/components';
import {
  billingSelectors,
  SubscriptionInfo,
  PaymentPreview,
} from '@modules/billing';

type SubscriptionPreviewProps = {
  handleCancellation: VoidFunction;
  handleUpdate: VoidFunction;
};

export const SubscriptionPreview = ({
  handleCancellation,
  handleUpdate,
}: SubscriptionPreviewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  return (
    <>
      <DetailsView headline="Info">
        <SubscriptionInfo
          handleCancellation={handleCancellation}
          handleUpdate={handleUpdate}
        />
      </DetailsView>
      {subscription?.status === 'active' && (
        <DetailsView headline="Payment information">
          <PaymentPreview />
        </DetailsView>
      )}
    </>
  );
};
