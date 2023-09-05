import { useRecoilValue } from 'recoil';
import {
  useEstimates,
  mapEstimatesToRows,
  billingSelectors,
} from '@modules/billing';
import { Alert, Table, TableSkeleton } from '@shared/components';
import { containers } from 'styles/containers.styles';

export const Estimates = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const { estimate, estimateLoadingState } = useEstimates();

  const { headers, rows } = mapEstimatesToRows(
    estimate?.invoice_estimate?.line_items,
    estimate?.invoice_estimate?.total,
  );

  if (estimateLoadingState !== 'finished') return <TableSkeleton />;

  return (
    <>
      {subscription?.status === 'active' ? (
        <Table isLoading={'finished'} headers={headers} rows={rows} />
      ) : (
        <div css={containers.medium}>
          <Alert>
            Unlock the full potential of our platform by ensuring your
            subscription is active. Only then can you view subscription
            estimates.
          </Alert>
        </div>
      )}
    </>
  );
};
