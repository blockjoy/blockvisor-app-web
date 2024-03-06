import { SetterOrUpdater, useRecoilValue } from 'recoil';
import { Button } from '@shared/components';
import {
  ActiveView,
  SubscriptionStatus,
  billingSelectors,
} from '@modules/billing';
import { containers } from 'styles/containers.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './SubscriptionActions.styles';

type SubscriptionActionsProps = {
  onViewChange: SetterOrUpdater<ActiveView>;
};

export const SubscriptionActions = ({
  onViewChange,
}: SubscriptionActionsProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const handleCancellation = () => onViewChange('cancel-subscription');
  const handleRestoration = () => onViewChange('restore-subscription');
  const handleReactivation = () => onViewChange('reactivate-subscription');

  const SUBSCRIPTION_CONFIG = {
    [SubscriptionStatus.active]: {
      label: 'Cancel subscription',
      action: handleCancellation,
      message: 'Not satisfied? You can cancel your subscription at any time.',
    },
    [SubscriptionStatus.non_renewing]: {
      label: 'Restore subscription',
      action: handleRestoration,
      message:
        'Changed your mind? You can easily restore your subscription here.',
    },
    [SubscriptionStatus.cancelled]: {
      label: 'Reactivate subscription',
      action: handleReactivation,
      message:
        'Miss our services? Reactivate your subscription with a single click!',
    },
  };

  const subscriptionConfig = SUBSCRIPTION_CONFIG[subscription?.status!];

  return (
    <div css={containers.mediumSmall}>
      <p css={spacing.bottom.medium}>{subscriptionConfig.message}</p>
      {subscription?.status === 'active' ? (
        <a onClick={subscriptionConfig.action} css={styles.link}>
          {subscriptionConfig.label}
        </a>
      ) : (
        <Button
          style="outline"
          size="small"
          onClick={subscriptionConfig.action}
        >
          {subscriptionConfig.label}
        </Button>
      )}
    </div>
  );
};
