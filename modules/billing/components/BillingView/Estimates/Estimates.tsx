import {
  useEstimates,
  mapEstimatesToRows,
  billingSelectors,
} from '@modules/billing';
import { Table } from '@shared/index';
import { useRecoilValue } from 'recoil';

export const Estimates = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const { estimate } = useEstimates(subscription?.id! as string);

  const { headers, rows } = mapEstimatesToRows(
    estimate?.invoice_estimate?.line_items,
    estimate?.invoice_estimate?.total,
  );

  return <Table isLoading={'finished'} headers={headers} rows={rows} />;
};
