import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { billingSelectors, mapSubscriptionToDetails } from '@modules/billing';
import { DetailsTable } from '@shared/components';
import { containers } from 'styles/containers.styles';

type SubscriptionInfoProps = {
  onlyPreview: boolean;
};

export const SubscriptionInfo = ({
  onlyPreview = false,
}: SubscriptionInfoProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const [periodUnit, setPeriodUnit] = useState<string>(
    subscription?.billing_period_unit ?? '',
  );

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

  return (
    <div css={containers.mediumSmall}>
      <DetailsTable bodyElements={subscriptionData} />
    </div>
  );
};
