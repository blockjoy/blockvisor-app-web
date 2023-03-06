import { PLAN_DATA } from '@modules/billing/mocks/plan';
import { Button, DetailsTable } from '@shared/index';
import { styles } from './PlanPreview.styles';

export const PlanPreview = () => {
  return (
    <div css={styles.wrapper}>
      <DetailsTable bodyElements={PLAN_DATA} />
      <Button style="outline" customCss={[styles.button]}>
        Cancel Plan
      </Button>
    </div>
  );
};
