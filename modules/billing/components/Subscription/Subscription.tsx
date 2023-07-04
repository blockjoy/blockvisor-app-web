import { useEffect, useState } from 'react';
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
import { useHasPermissions, Permissions } from '@modules/auth';
import { useRouter } from 'next/router';

type SubscriptionProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const Subscription = ({ item, itemPrices }: SubscriptionProps) => {
  const router = useRouter();
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const [activeView, setActiveView] =
    useState<'default' | 'preview'>('default');
  const [activePlan, setActivePlan] = useState<Item | null>(item);

  const handleSelect = (plan: any) => {
    setActiveView('preview');
    setActivePlan(plan);
  };

  const handleCancel = () => setActiveView('default');

  const userRoleInOrganization: OrgRole = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canReadBilling: boolean = useHasPermissions(
    userRoleInOrganization,
    Permissions.READ_BILLING,
  );

  useEffect(() => {
    if (router.isReady && router.query.added) setActiveView('preview');
  }, [router.isReady, router.query.added]);

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
        <SubscriptionPreview itemPrices={itemPrices} />
      ) : activeView === 'default' ? (
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
          {item && <SinglePlan item={item} handleSelect={handleSelect} />}
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
