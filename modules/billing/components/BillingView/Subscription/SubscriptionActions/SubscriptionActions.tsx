import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { Button } from '@shared/components';
import {
  SubscriptionStatus,
  billingSelectors,
  useSubscriptionLifecycle,
} from '@modules/billing';
import { containers } from 'styles/containers.styles';
import { spacing } from 'styles/utils.spacing.styles';

type SubscriptionActionsProps = {
  handleCancellation: VoidFunction;
};

export const SubscriptionActions = ({
  handleCancellation,
}: SubscriptionActionsProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const { restoreSubscription, reactivateSubscription } =
    useSubscriptionLifecycle();

  const handleRestoreSubscription = useCallback(() => {
    restoreSubscription(subscription?.id!);
  }, [restoreSubscription, subscription]);

  const handleReactivateSubscription = useCallback(() => {
    reactivateSubscription(subscription?.id!);
  }, [reactivateSubscription, subscription]);

  const SUBSCRIPTION_CONFIG = {
    [SubscriptionStatus.active]: {
      label: 'Cancel subscription',
      action: handleCancellation,
      message:
        'Not satisfied? Remember, you can cancel your subscription at any time.',
    },
    [SubscriptionStatus.non_renewing]: {
      label: 'Restore subscription',
      action: handleRestoreSubscription,
      message:
        'Changed your mind? You can easily restore your subscription here.',
    },
    [SubscriptionStatus.cancelled]: {
      label: 'Reactivate subscription',
      action: handleReactivateSubscription,
      message:
        'Missed our services? Reactivate your subscription with a single click!',
    },
  };

  const subscriptionConfig = SUBSCRIPTION_CONFIG[subscription?.status!];

  return (
    <div css={containers.mediumSmall}>
      <p css={spacing.bottom.medium}>{subscriptionConfig.message}</p>
      <Button style="outline" size="small" onClick={subscriptionConfig.action}>
        {subscriptionConfig.label}
      </Button>
    </div>
  );
};
