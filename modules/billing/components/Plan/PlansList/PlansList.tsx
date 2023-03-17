import { SinglePlan } from '../SinglePlan/SinglePlan';
import { styles } from './PlansList.styles';

export type PlansListProps = {
  plans: IPlan[] | null;
};

export const PlansList = ({ plans }: PlansListProps) => {
  return (
    <div css={styles.wrapper}>
      {plans && plans.map((plan) => <SinglePlan key={plan.id} plan={plan} />)}
    </div>
  );
};
