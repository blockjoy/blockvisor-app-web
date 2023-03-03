import { styles } from './Plan.styles';
import { PlanPreview } from './PlanPreview/PlanPreview';
import { SinglePlan } from './SinglePlan/SinglePlan';

export const Plan = () => {
  return (
    <div css={styles.wrapper}>
      <PlanPreview />
      <SinglePlan />
    </div>
  );
};
