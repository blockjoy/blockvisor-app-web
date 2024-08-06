import { useRecoilValue } from 'recoil';
import { Button } from '@shared/components';
import { billingAtoms, SUBSCRIPTION_CONFIG } from '@modules/billing';
import { containers } from 'styles/containers.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './SubscriptionActions.styles';

type SubscriptionActionsProps = {
  handleActiveView: (view: SubscriptionView) => void;
};

export const SubscriptionActions = ({
  handleActiveView,
}: SubscriptionActionsProps) => {
  const subscription = useRecoilValue(billingAtoms.subscription);

  const handleCancellation = () => handleActiveView('cancel-subscription');
  const handleRestoration = () => handleActiveView('restore-subscription');
  const handleReactivation = () => handleActiveView('reactivate-subscription');

  const handleAction = () => {
    switch (subscription?.status?.toLowerCase() as SubscriptionStatus) {
      case 'active':
        handleCancellation();
        return;
      case 'paused':
        handleRestoration();
        return;
      case 'canceled':
        handleReactivation();
        return;
      default:
        return;
    }
  };

  const subscriptionConfig: SubscriptionActionConfig =
    SUBSCRIPTION_CONFIG[subscription?.status?.toLowerCase() ?? ''];

  return (
    <div css={containers.mediumSmall}>
      <p css={[styles.content, spacing.bottom.mediumSmall]}>
        {subscriptionConfig.content}
      </p>
      <Button
        style={
          subscription?.status?.toLowerCase() === 'active' ? 'ghost' : 'outline'
        }
        size="small"
        onClick={handleAction}
        {...(subscription?.status?.toLowerCase() === 'active' && {
          customCss: [styles.button],
        })}
      >
        {subscriptionConfig.heading}
      </Button>
    </div>
  );
};
