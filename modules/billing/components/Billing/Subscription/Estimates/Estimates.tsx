import { useRecoilValue } from 'recoil';
import {
  billingAtoms,
  InvoiceTotal,
  mapInvoiceLineItemsToRows,
} from '@modules/billing';
import { Table, TableSkeleton } from '@shared/components';
import { styles } from './Estimates.styles';

export const Estimates = () => {
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const estimates = useRecoilValue(billingAtoms.estimates);
  const estimatesLoadingState = useRecoilValue(
    billingAtoms.estimatesLoadingState,
  );

  const { headers, rows } = mapInvoiceLineItemsToRows(estimates?.lineItems);

  if (
    estimatesLoadingState !== 'finished' ||
    subscriptionLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  return (
    <div css={styles.sectionWrapper}>
      <Table headers={headers} rows={rows} />
      <div css={styles.total}>
        <InvoiceTotal
          total={estimates?.total}
          subtotal={estimates?.subtotal}
          discounts={estimates?.discounts}
        />
      </div>
    </div>
  );
};
