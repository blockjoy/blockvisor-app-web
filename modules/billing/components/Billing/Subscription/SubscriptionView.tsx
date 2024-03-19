import { useRecoilValue } from 'recoil';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import {
  billingAtoms,
  billingSelectors,
  Subscription,
  Plan,
} from '@modules/billing';
import { Alert, TableSkeleton } from '@shared/components';
import { styles } from './SubscriptionView.styles';
import { authAtoms, authSelectors } from '@modules/auth';
import { containers } from 'styles/containers.styles';

type SubscriptionViewProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const SubscriptionView = ({
  item,
  itemPrices,
}: SubscriptionViewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const canReadSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-get'),
  );
  const permissionsLoadingState = useRecoilValue(
    authAtoms.permissionsLoadingState,
  );

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
