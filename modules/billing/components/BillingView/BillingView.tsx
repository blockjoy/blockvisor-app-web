import { useRecoilValue } from 'recoil';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import {
  billingAtoms,
  billingSelectors,
  Subscription,
  Plan,
} from '@modules/billing';
import { Alert, TableSkeleton } from '@shared/components';
import { styles } from './BillingView.styles';
import { usePermissions } from '@modules/auth';

type BillingViewProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const BillingView = ({ item, itemPrices }: BillingViewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const { hasPermission } = usePermissions();
  const canReadSubscription = hasPermission('subscription-get');

  if (subscriptionLoadingState === 'initializing') return <TableSkeleton />;

  if (!canReadSubscription)
    return (
      <Alert>
        You don't have access to read the current organization billing plan! Try
        switching the organization.
      </Alert>
    );

  return (
    <div css={styles.wrapper}>
      {subscription ? (
        <Subscription />
      ) : (
        <Plan item={item} itemPrices={itemPrices} />
      )}
    </div>
  );
};
