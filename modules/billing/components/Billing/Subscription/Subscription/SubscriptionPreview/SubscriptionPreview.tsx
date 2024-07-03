import { SetterOrUpdater } from 'recoil';
// import { DetailsView } from '@shared/components';
import {
  // billingSelectors,
  SubscriptionInfo,
  // PaymentPreview,
  // SubscriptionActions,
  ActiveView,
} from '@modules/billing';
// import { authSelectors } from '@modules/auth';

type SubscriptionPreviewProps = {
  onViewChange: SetterOrUpdater<ActiveView>;
};

export const SubscriptionPreview = ({
  onViewChange,
}: SubscriptionPreviewProps) => {
  // const canDeleteSubscription = useRecoilValue(
  //   authSelectors.hasPermission('subscription-delete'),
  // );

  return (
    <>
      <SubscriptionInfo />
      {/* {subscription?.status !== 'cancelled' && canUpdateSubscription && (
        <DetailsView headline="Payment information">
          <PaymentPreview />
        </DetailsView>
      )} */}
      {/* {canUpdateSubscription && canDeleteSubscription && (
        <DetailsView headline="Subscription status">
          <SubscriptionActions onViewChange={onViewChange} />
        </DetailsView>
      )} */}
    </>
  );
};
