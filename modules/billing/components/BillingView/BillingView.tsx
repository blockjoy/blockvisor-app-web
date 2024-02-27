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
import { containers } from 'styles/containers.styles';

type BillingViewProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const BillingView = ({ item, itemPrices }: BillingViewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const { hasPermission, permissionsLoadingState } = usePermissions();
  const canReadSubscription = hasPermission('subscription-get');

  if (
    subscriptionLoadingState === 'initializing' ||
    permissionsLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  if (!canReadSubscription)
    return (
      <div css={containers.medium}>
        <Alert>
          You don't have access to read the current organization billing plan!
          Try switching the organization.
        </Alert>
      </div>
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
