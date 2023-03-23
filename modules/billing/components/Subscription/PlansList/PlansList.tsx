import { SinglePlan } from '@modules/billing';
import { styles } from './PlansList.styles';

export type PlansListProps = {
  plans: IPlan[] | null;
  handleSelect: (plan: IPlan) => void;
};

export const PlansList = ({ plans, handleSelect }: PlansListProps) => {
  return (
    <div css={styles.wrapper}>
      {plans &&
        plans.map((plan) => (
          <SinglePlan key={plan.id} plan={plan} handleSelect={handleSelect} />
        ))}
    </div>
  );
};
