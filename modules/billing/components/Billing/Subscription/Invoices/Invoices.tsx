import { useRecoilValue } from 'recoil';
import { authAtoms } from '@modules/auth';
import { billingAtoms, InvoicesList } from '@modules/billing';
import { TableSkeleton } from '@shared/components';
import { styles } from './Invoices.styles';

export const Invoices = () => {
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const permissionsLoadingState = useRecoilValue(
    authAtoms.permissionsLoadingState,
  );

  if (
    subscriptionLoadingState === 'initializing' ||
    permissionsLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  return (
    <div css={styles.wrapper}>
      <InvoicesList />
    </div>
  );
};
