import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Item } from 'chargebee-typescript/lib/resources';
import {
  SubscriptionPreview,
  PlanSelect,
  SinglePlan,
  billingAtoms,
  useItems,
} from '@modules/billing';
import { EmptyColumn, TableSkeleton } from '@shared/components';
import { styles } from './Subscription.styles';

export const Subscription = () => {
  const subscription = useRecoilValue(billingAtoms.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const [activeView, setActiveView] = useState<'list' | 'action'>('list');
  const [activePlan, setActivePlan] = useState<Item | null>(null);

  const { items, getItems } = useItems();

  useEffect(() => {
    getItems();
  }, []);

  const handleSelect = (plan: any) => {
    setActiveView('action');
    setActivePlan(plan);
  };

  const handleCancel = () => setActiveView('list');

  return (
    <div css={styles.wrapper}>
      {subscriptionLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : subscription ? (
        <SubscriptionPreview />
      ) : activeView === 'list' ? (
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
            <SinglePlan plan={items[0]} handleSelect={handleSelect} />
          )}
        </>
      ) : (
        <PlanSelect plan={activePlan} handleCancel={handleCancel} />
      )}
    </div>
  );
};
