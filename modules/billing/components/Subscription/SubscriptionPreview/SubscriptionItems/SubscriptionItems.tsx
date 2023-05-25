import { useEstimates } from '@modules/billing/hooks/useEstimates';
import { mapEstimateItemsToRows } from '@modules/billing/utils/mapEstimateToRows';
import { Table } from '@shared/index';

export const SubscriptionItems = () => {
  const { estimate } = useEstimates();

  const { headers, rows } = mapEstimateItemsToRows(
    estimate?.invoice_estimate?.line_items,
    estimate?.invoice_estimate?.total,
  );

  return <Table isLoading={'finished'} headers={headers} rows={rows} />;
};
