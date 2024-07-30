import { useRecoilValue } from 'recoil';
import { billingAtoms, SubscriptionViewTabs, Plan } from '@modules/billing';
import { TableSkeleton, Unauthorized } from '@shared/components';
import { authSelectors } from '@modules/auth';
import { styles } from './SubscriptionView.styles';

export const SubscriptionView = () => {
  const subscription = useRecoilValue(billingAtoms.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const canGetBillingDetails = useRecoilValue(
    authSelectors.hasPermission('org-billing-get-billing-details'),
  );

  if (subscriptionLoadingState === 'initializing') return <TableSkeleton />;

  if (!canGetBillingDetails)
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
