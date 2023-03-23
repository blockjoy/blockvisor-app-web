import {
  calcNextAutoRenew,
  calcPlanPrice,
  getPlanFeatures,
  useSubscription,
} from '@modules/billing';
import { Button, PillPicker, Switch } from '@shared/components';
import { formatCurrency, formatDate } from '@shared/index';
import { useState } from 'react';
import { flex } from 'styles/utils.flex.styles';
import { spacing, divider } from 'styles/utils.spacing.styles';
import { styles } from './PlanSelect.styles';
import IconCheck from '@public/assets/icons/check-16.svg';
import { SUBSCRIPTION } from '@modules/billing/mocks/subscription';

export type PlanSelectProps = {
  plan: IPlan | null;
  handleCancel: VoidFunction;
};

const BILLING_PERIOD: string[] = ['Monthly', 'Annual'];

export const PlanSelect = ({ plan, handleCancel }: PlanSelectProps) => {
  const { createSubscription, subscriptionLoadingState } = useSubscription();

  const [billingPeriod, setBillingPeriod] = useState<string>('Annual');
  const [autoRenew, setAutoRenew] = useState<boolean>(true);

  const planFeatures = getPlanFeatures(plan?.metadata.features);

  const handleActiveBillingPeriod = (billingPeriod: string) => {
    setBillingPeriod(billingPeriod);
  };

  const handleAutoRenew = () => setAutoRenew(!autoRenew);

  const handleSubscription = () => {
    createSubscription(SUBSCRIPTION);
  };

  return (
    <div css={styles.wrapper}>
      <div
        css={[
          spacing.bottom.medium,
          flex.display.flex,
          flex.justify.between,
          flex.align.center,
        ]}
      >
        <p css={styles.planTitle}>{plan?.nickname}</p>
        <Button style="outline" size="medium" onClick={handleCancel}>
          Change Plan
        </Button>
      </div>
      <div css={[divider, spacing.bottom.medium]}></div>
      <div css={spacing.bottom.large}>
        <h3 css={styles.headline}>Billing period</h3>
        <PillPicker
          items={BILLING_PERIOD}
          selectedItem={billingPeriod}
          onChange={handleActiveBillingPeriod}
        />
      </div>
      <div css={spacing.bottom.large}>
        <h3 css={styles.headline}>Auto renew</h3>
        <div css={[flex.display.flex, flex.justify.between]}>
          <p css={styles.renewText}>
            Your subscription will automatically renew on{' '}
            {formatDate(calcNextAutoRenew(billingPeriod))}
          </p>
          <Switch
            additionalStyles={styles.renewSwitch}
            disabled={false}
            tooltip="Subscription's auto renewal"
            name="auto-renew"
            checked={autoRenew}
            onPropertyChanged={handleAutoRenew}
          />
        </div>
      </div>
      <div css={spacing.bottom.medium}>
        <h3 css={styles.headline}>What you get</h3>
        <ul css={styles.features}>
          {planFeatures.map((feature: string, featureIndex: number) => (
            <li key={featureIndex}>
              <span css={styles.summaryIcon}>
                <IconCheck />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div css={[divider, spacing.bottom.medium]}></div>
      <div css={[flex.display.flex, flex.justify.between]}>
        <p css={styles.headline}>Total</p>
        <p css={styles.totalPrice}>
          {formatCurrency(calcPlanPrice(plan?.amount!, billingPeriod))}
        </p>
      </div>
      <div css={styles.buttons}>
        <Button
          style="secondary"
          size="medium"
          customCss={[styles.button]}
          loading={subscriptionLoadingState !== 'finished'}
          onClick={handleSubscription}
        >
          Update Plan
        </Button>
        <Button style="outline" size="medium" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
