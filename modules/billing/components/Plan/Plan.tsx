import { PLANS } from '@modules/billing/mocks/plan';
import { styles } from './Plan.styles';
import { PlanPreview } from './PlanPreview/PlanPreview';
import { SinglePlan } from './SinglePlan/SinglePlan';

export const Plan = () => {
  const proPlan = PLANS.find((plan) => plan.id === 'pro');

  return (
    <div css={styles.wrapper}>
      <PlanPreview />
      <SinglePlan plan={proPlan} />
    </div>
  );
};
