import { useEstimates, mapEstimateItemsToRows } from '@modules/billing';
import { Table } from '@shared/index';

export const SubscriptionItems = () => {
  const { estimate } = useEstimates();

  const { headers, rows } = mapEstimateItemsToRows(
    estimate?.invoice_estimate?.line_items,
    estimate?.invoice_estimate?.total,
  );

  return <Table isLoading={'finished'} headers={headers} rows={rows} />;
};
