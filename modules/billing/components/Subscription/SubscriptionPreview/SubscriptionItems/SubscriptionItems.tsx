import {
  useEstimates,
  mapEstimateItemsToRows,
  billingSelectors,
} from '@modules/billing';
import { Table } from '@shared/index';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

export const SubscriptionItems = () => {
  const router = useRouter();
  const { id } = router.query;
  const subscription = useRecoilValue(
    billingSelectors.subscriptions[id as string],
  );

  const { estimate } = useEstimates(subscription?.id! as string);

  const { headers, rows } = mapEstimateItemsToRows(
    estimate?.invoice_estimate?.line_items,
    estimate?.invoice_estimate?.total,
  );

  return <Table isLoading={'finished'} headers={headers} rows={rows} />;
};
