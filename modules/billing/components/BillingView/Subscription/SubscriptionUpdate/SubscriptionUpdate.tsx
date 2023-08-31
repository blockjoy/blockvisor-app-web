import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import {
  PlanParams,
  generateUpdateSubscriptionParams,
  useSubscription,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { Button, ButtonGroup } from '@shared/components';
import { containers } from 'styles/containers.styles';

type SubscriptionUpdateProps = {
  handleBack: VoidFunction;
  itemPrices: ItemPrice[];
};

export const SubscriptionUpdate = ({
  handleBack,
  itemPrices,
}: SubscriptionUpdateProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const [periodUnit, setPeriodUnit] = useState<string>(
    subscription?.billing_period_unit!,
  );
  const [autoRenew, setAutoRenew] = useState<boolean>(
    subscription?.auto_collection === 'on',
  );

  const { updateSubscription } = useSubscription();

  const handleUpdate = async () => {
    const params = await generateUpdateSubscriptionParams(subscription!, {
      autoRenew,
      periodUnit,
      itemPrices,
    });

    updateSubscription(params);
    handleBack();
  };

  const handleAutoRenew = () => setAutoRenew(!autoRenew);
  const handlePeriodUnit = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPeriodUnit(value);
  };

  return (
    <div css={containers.mediumSmall}>
      <PlanParams
        autoRenew={autoRenew}
        handleAutoRenew={handleAutoRenew}
        periodUnit={periodUnit}
        handlePeriodUnit={handlePeriodUnit}
      />
      <ButtonGroup type="flex">
        <Button
          loading={subscriptionLoadingState !== 'finished'}
          size="small"
          style="secondary"
          type="submit"
          onClick={handleUpdate}
        >
          Update subscription
        </Button>
        <Button style="outline" size="small" onClick={handleBack}>
          Back
        </Button>
      </ButtonGroup>
    </div>
  );
};
