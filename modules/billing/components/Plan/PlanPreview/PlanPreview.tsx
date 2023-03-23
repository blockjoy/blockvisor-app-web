import { useSubscription, mapPlanDataToDetails } from '@modules/billing';
import { Button, DetailsTable } from '@shared/index';
import { styles } from './PlanPreview.styles';

export type PlanPreviewProps = {
  plan: IPlan;
};

export const PlanPreview = ({ plan }: PlanPreviewProps) => {
  const { cancelSubscription } = useSubscription();
  const planData = mapPlanDataToDetails(plan);

  return (
    <div>
      <DetailsTable bodyElements={planData} />
      <Button
        style="outline"
        customCss={[styles.button]}
        onClick={cancelSubscription}
      >
        Cancel Subscription
      </Button>
    </div>
  );
};
