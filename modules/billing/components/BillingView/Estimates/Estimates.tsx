import { useRecoilValue } from 'recoil';
import {
  useEstimates,
  mapEstimatesToRows,
  billingSelectors,
} from '@modules/billing';
import { Alert, Table } from '@shared/components';
import { containers } from 'styles/containers.styles';

export const Estimates = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const { estimate } = useEstimates(subscription?.id! as string);

  const { headers, rows } = mapEstimatesToRows(
    estimate?.invoice_estimate?.line_items,
    estimate?.invoice_estimate?.total,
  );

  return (
    <>
      {subscription?.status === 'active' ? (
        <Table isLoading={'finished'} headers={headers} rows={rows} />
      ) : (
        <div css={containers.medium}>
          <Alert>
            Unlock the full potential of our platform by ensuring your
            subscription is active. Only then can you view our comprehensive
            estimates.
          </Alert>
        </div>
      )}
    </>
  );
};
