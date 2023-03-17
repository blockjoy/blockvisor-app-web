import { usePlans } from '@modules/billing/hooks/usePlans';
import { BILLING_PLANS } from '@modules/billing/mocks/plan';
import { EmptyColumn } from '@shared/index';
import { useEffect } from 'react';
import { styles } from './Plan.styles';
import { PlanPreview } from './PlanPreview/PlanPreview';
import { PlansList } from './PlansList/PlansList';

const activePlan = !BILLING_PLANS[0];

export const Plan = () => {
  const { plans, getPlans } = usePlans();

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <div css={styles.wrapper}>
      {activePlan ? (
        <PlanPreview plan={activePlan} />
      ) : (
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
          <PlansList plans={plans} />
        </>
      )}
    </div>
  );
};
