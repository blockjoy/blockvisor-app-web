import { PLANS } from '@modules/billing/mocks/plan';
import { EmptyColumn } from '@shared/index';
import { styles } from './Plan.styles';
import { PlanPreview } from './PlanPreview/PlanPreview';
import { SinglePlan } from './SinglePlan/SinglePlan';

export const Plan = () => {
  const proPlan = PLANS.find((plan) => plan.id === 'pro');

  return (
    <div css={styles.wrapper}>
      {proPlan?.active ? (
        <PlanPreview />
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
          <SinglePlan plan={proPlan} />
        </>
      )}
    </div>
  );
};
