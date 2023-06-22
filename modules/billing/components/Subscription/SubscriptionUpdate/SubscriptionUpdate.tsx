import { useSubscription } from '@modules/billing/hooks/useSubscription';
import { billingAtoms } from '@modules/billing/store/billingAtoms';
import { billingSelectors } from '@modules/billing/store/billingSelectors';
import { Button, ButtonGroup } from '@shared/components';
import { _subscription } from 'chargebee-typescript';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PlanParams } from '../PlanSelect/PlanParams/PlanParams';
import { styles } from './SubscriptionUpdate.styles';

type SubscriptionUpdateProps = {
  handleBack: VoidFunction;
};

export const SubscriptionUpdate = ({ handleBack }: SubscriptionUpdateProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const [autoRenew, setAutoRenew] = useState<boolean>(
    subscription?.auto_collection === 'on',
  );

  const { updateSubscription } = useSubscription();

  const handleUpdate = () => {
    const autoRenewValue: string = autoRenew ? 'on' : 'off';

    const params: _subscription.update_for_items_params = {
      auto_collection: autoRenewValue,
    };
    updateSubscription(params);
    handleBack();
  };

  const handleAutoRenew = () => setAutoRenew(!autoRenew);

  return (
    <div css={styles.wrapper}>
      <PlanParams
        autoRenew={autoRenew}
        handleAutoRenew={handleAutoRenew}
        periodUnit={subscription?.billing_period_unit}
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
