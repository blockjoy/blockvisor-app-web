import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import {
  SubscriptionPreview,
  PlanSelect,
  SinglePlan,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { Alert, EmptyColumn, TableSkeleton } from '@shared/components';
import { styles } from './Subscription.styles';
import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationSelectors } from '@modules/organization/store/organizationSelectors';
import {
  useHasPermissions,
  Permissions,
  useIdentityRepository,
} from '@modules/auth';

type SubscriptionProps = {
  items: Item[];
  itemPrices: ItemPrice[];
};

export const Subscription = ({ items, itemPrices }: SubscriptionProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const [activeView, setActiveView] = useState<'view' | 'cancel'>('view');
  const [activePlan, setActivePlan] = useState<Item | null>(null);

  const handleSelect = (plan: any) => {
    setActiveView('cancel');
    setActivePlan(plan);
  };

  const handleCancel = () => setActiveView('view');

  const repository = useIdentityRepository();
  const user = repository?.getIdentity();

  const userRoleInOrganization: OrgRole = useRecoilValue(
    organizationSelectors.userRoleInOrganization(user?.id),
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
        <SubscriptionPreview />
      ) : activeView === 'view' ? (
        <>
          <EmptyColumn
            title="You Have No Active Plans."
            description={
              <div>
                <p style={{ marginBottom: '10px' }}>
                  You are currently on a free plan. To access BlockVisor
                  features add a paid plan.
                </p>
              </div>
            }
            align="left"
            additionalStyles={styles.emptyColumn}
          />
          {items?.length && (
            <SinglePlan item={items[0]} handleSelect={handleSelect} />
          )}
        </>
      ) : (
        <PlanSelect
          plan={activePlan}
          handleCancel={handleCancel}
          itemPrices={itemPrices}
        />
      )}
    </div>
  );
};
