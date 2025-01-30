import { useRecoilValue } from 'recoil';
import { authAtoms, authSelectors } from '@modules/auth';
import { billingAtoms, InvoicesList, Plan } from '@modules/billing';
import { TableSkeleton, Unauthorized } from '@shared/components';
import { styles } from './Invoices.styles';

export const Invoices = () => {
  const subscription = useRecoilValue(billingAtoms.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const permissionsLoadingState = useRecoilValue(
    authAtoms.permissionsLoadingState,
  );
  const canGetBillingDetails = useRecoilValue(
    authSelectors.hasPermission('org-billing-get-billing-details'),
  );
  const invoicesLoadingState = useRecoilValue(
    billingAtoms.invoicesLoadingState,
  );

  if (
    subscriptionLoadingState === 'initializing' ||
    invoicesLoadingState === 'initializing' ||
    permissionsLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  if (!canGetBillingDetails)
    return (
      <Unauthorized>
        You don't have access to read the current organization billing plan! Try
        switching the organization.
      </Unauthorized>
    );

  return (
    <div css={styles.wrapper}>{subscription ? <InvoicesList /> : <Plan />}</div>
  );
};
