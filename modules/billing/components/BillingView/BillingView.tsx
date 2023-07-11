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
import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationSelectors } from '@modules/organization/store/organizationSelectors';
import { useHasPermissions, Permissions } from '@modules/auth';

type BillingViewProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const BillingView = ({ item, itemPrices }: BillingViewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const userRoleInOrganization: OrgRole = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canReadBilling: boolean = useHasPermissions(
    userRoleInOrganization,
    Permissions.READ_BILLING,
  );

  if (subscriptionLoadingState !== 'finished') return <TableSkeleton />;

  if (!canReadBilling)
    return (
      <Alert>
        You don't have access to read the current organization billing plan! Try
        switching the organization.
      </Alert>
    );

  return (
    <div css={styles.wrapper}>
      {subscription ? (
        <Subscription itemPrices={itemPrices} />
      ) : (
        <Plan item={item} itemPrices={itemPrices} />
      )}
    </div>
  );
};
