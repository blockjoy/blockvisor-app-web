import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { EmptyColumn } from '@shared/components';
import { styles } from './Plan.styles';
import { useHasPermissions } from '@modules/auth/hooks/useHasPermissions';
import { PlanConfiguration, PlanList } from '@modules/billing';
import { organizationSelectors } from '@modules/organization';
import { Permissions } from '@modules/auth';

type PlanProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const Plan = ({ item, itemPrices }: PlanProps) => {
  const router = useRouter();

  const [activeView, setActiveView] =
    useState<'default' | 'preview'>('default');
  const [activePlan, setActivePlan] = useState<Item | null>(item);

  const handleSelect = (plan: Item) => {
    setActiveView('preview');
    setActivePlan(plan);
  };

  const handleCancel = () => setActiveView('default');

  const userRoleInOrganization: OrgRole = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canCreateSubscription: boolean = useHasPermissions(
    userRoleInOrganization,
    Permissions.CREATE_SUBSCRIPTION,
  );

  useEffect(() => {
    if (router.isReady && router.query.added) setActiveView('preview');
  }, [router.isReady, router.query.added]);

  return (
    <>
      {activeView === 'default' && (
        <EmptyColumn
          title="You Have No Active Plans."
          description={
            <div>
              <p style={{ marginBottom: '10px' }}>
                {canCreateSubscription
                  ? 'You are currently on a free plan. To access BlockVisor features add a paid plan.'
                  : 'There are no plans available for your organization.'}
              </p>
            </div>
          }
          align="left"
          additionalStyles={styles.emptyColumn}
        />
      )}
      {item &&
        canCreateSubscription &&
        (activeView === 'default' ? (
          <PlanList item={item} handleSelect={handleSelect} />
        ) : (
          <PlanConfiguration
            plan={activePlan}
            handleCancel={handleCancel}
            itemPrices={itemPrices}
          />
        ))}
    </>
  );
};
