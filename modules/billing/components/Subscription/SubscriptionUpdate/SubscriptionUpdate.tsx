import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import { PlanParams, useUpdateSubscription } from '@modules/billing';
import { useSubscription } from '@modules/billing/hooks/useSubscription';
import { billingAtoms } from '@modules/billing/store/billingAtoms';
import { billingSelectors } from '@modules/billing/store/billingSelectors';
import { Button, ButtonGroup } from '@shared/components';
import { styles } from './SubscriptionUpdate.styles';

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
  const { generateUpdateSubscriptionParams } = useUpdateSubscription();

  const handleUpdate = async () => {
    const params = await generateUpdateSubscriptionParams(
      autoRenew,
      periodUnit,
      itemPrices,
    );

    updateSubscription(params);
    handleBack();
  };

  const handleAutoRenew = () => setAutoRenew(!autoRenew);
  const handlePeriodUnit = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPeriodUnit(value);
  };

  return (
    <div css={styles.wrapper}>
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
          display="inline"
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
