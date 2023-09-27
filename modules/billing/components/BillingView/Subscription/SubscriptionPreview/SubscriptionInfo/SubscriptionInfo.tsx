import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  billingAtoms,
  billingSelectors,
  generateUpdateSubscriptionParams,
  mapSubscriptionToDetails,
  useSubscription,
} from '@modules/billing';
import { Button, DetailsTable } from '@shared/components';
import { containers } from 'styles/containers.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './SubscriptionInfo.styles';

type SubscriptionInfoProps = {
  onlyPreview: boolean;
};

export const SubscriptionInfo = ({
  onlyPreview = false,
}: SubscriptionInfoProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const [periodUnit, setPeriodUnit] = useState<string>(
    subscription?.billing_period_unit ?? '',
  );

  const { updateSubscription } = useSubscription();

  const handlePeriodUnit = (billingPeriod: BillingPeriod) => {
    setPeriodUnit(billingPeriod?.id);
  };

  const subscriptionProperties: UpdateSubscriptionProperties = {
    period: {
      value: periodUnit,
      handleUpdate: handlePeriodUnit,
    },
  };

  const subscriptionData = mapSubscriptionToDetails(
    subscription!,
    subscriptionProperties,
    onlyPreview,
  );

  const isDirty = subscription?.billing_period_unit !== periodUnit;

  const handleUpdateSubscription = async () => {
    const params = await generateUpdateSubscriptionParams(subscription!, {
      periodUnit,
    });

    await updateSubscription(params);
  };

  return (
    <div css={containers.mediumSmall}>
      <DetailsTable bodyElements={subscriptionData} />
      {!onlyPreview && (
        <Button
          disabled={!isDirty || subscription?.status !== 'active'}
          style="secondary"
          size="small"
          onClick={handleUpdateSubscription}
          css={spacing.top.medium}
          loading={subscriptionLoadingState === 'loading'}
          customCss={[styles.button]}
        >
          Update subscription
        </Button>
      )}
    </div>
  );
};
