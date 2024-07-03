import { useRecoilValue } from 'recoil';
import {
  billingAtoms,
  billingSelectors,
  SubscriptionViewTabs,
  Plan,
} from '@modules/billing';
import { TableSkeleton, Unauthorized } from '@shared/components';
import { authAtoms, authSelectors } from '@modules/auth';
import { styles } from './SubscriptionView.styles';

export const SubscriptionView = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const canReadSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-get'),
  );
  const permissionsLoadingState = useRecoilValue(
    authAtoms.permissionsLoadingState,
  );

  if (
    subscriptionLoadingState === 'initializing' ||
    permissionsLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  if (!canReadSubscription)
    return (
      <Unauthorized>
        You don't have access to read the current organization billing plan! Try
        switching the organization.
      </Unauthorized>
    );

  return (
    <div css={styles.wrapper}>
      {subscription ? <SubscriptionViewTabs /> : <Plan />}
    </div>
  );
};
