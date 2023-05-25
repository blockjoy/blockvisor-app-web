import {
  SubscriptionPreview,
  PlanSelect,
  useSubscription,
  SinglePlan,
} from '@modules/billing';
import { EmptyColumn } from '@shared/index';
import { useEffect, useState } from 'react';
import { styles } from './Subscription.styles';
import { BILLING_PLAN } from '@modules/billing/mocks/plan';
import { useItems } from '@modules/billing/hooks/useItems';

export const Subscription = () => {
  const { subscription } = useSubscription();
  const [activeView, setActiveView] = useState<'list' | 'action'>('list');
  const [activePlan, setActivePlan] = useState<any | null>(null);

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
      {subscription ? (
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
