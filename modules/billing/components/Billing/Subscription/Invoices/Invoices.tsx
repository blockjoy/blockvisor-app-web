import { useRecoilValue } from 'recoil';
import { authAtoms, authSelectors } from '@modules/auth';
import { billingAtoms, InvoicesList } from '@modules/billing';
import { TableSkeleton, Unauthorized } from '@shared/components';
import { styles } from './Invoices.styles';

export const Invoices = () => {
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
      <InvoicesList />
    </div>
  );
};
