import { BILLING_PLANS } from '@modules/billing/mocks/plan';
import { SinglePlan } from '../SinglePlan/SinglePlan';
import { styles } from './PlansList.styles';

export const PlansList = () => {
  return (
    <div css={styles.wrapper}>
      {BILLING_PLANS.map((plan) => (
        <SinglePlan key={plan.id} plan={plan} />
      ))}
    </div>
  );
};
