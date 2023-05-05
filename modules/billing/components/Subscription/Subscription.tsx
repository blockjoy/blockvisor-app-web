import {
  SubscriptionPreview,
  PlanSelect,
  PlansList,
  usePlans,
  useSubscription,
} from '@modules/billing';
import { EmptyColumn } from '@shared/index';
import { useEffect, useState } from 'react';
import { styles } from './Subscription.styles';

export const Subscription = () => {
  const { subscription, getSubscription } = useSubscription();
  const [activeView, setActiveView] = useState<'list' | 'action'>('list');
  const [activePlan, setActivePlan] = useState<IPlan | null>(null);

  const { plans, getPlans } = usePlans();

  useEffect(() => {
    getPlans();
  }, []);

  const handleSelect = (plan: IPlan) => {
    setActiveView('action');
    setActivePlan(plan);
  };

  const handleCancel = () => setActiveView('list');

  console.log('subscription', subscription);

  return (
    <div css={styles.wrapper}>
      {subscription ? (
        <SubscriptionPreview subscription={subscription} />
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
          <PlansList plans={plans} handleSelect={handleSelect} />
        </>
      ) : (
        <PlanSelect plan={activePlan} handleCancel={handleCancel} />
      )}
    </div>
  );
};
