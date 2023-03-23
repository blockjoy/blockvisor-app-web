import { PlanPreview, PlanSelect, PlansList, usePlans } from '@modules/billing';
import { BILLING_PLANS } from '@modules/billing/mocks/plan';
import { EmptyColumn } from '@shared/index';
import { useEffect, useState } from 'react';
import { styles } from './Plan.styles';

const selectedPlan = !BILLING_PLANS[0];

export const Plan = () => {
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

  return (
    <div css={styles.wrapper}>
      {selectedPlan ? (
        <PlanPreview plan={selectedPlan} />
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
