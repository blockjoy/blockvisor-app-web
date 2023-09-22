import { css } from '@emotion/react';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { formatters } from '@shared/index';
import { Badge, Switch } from '@shared/components';
import {
  getSubscriptionStatusColor,
  getSubscriptionStatusText,
  BillingPeriodSelect,
  BILLING_PERIOD,
} from '@modules/billing';

const styles = {
  noBottomMargin: css`
    margin-bottom: 0;
  `,
};

export const mapSubscriptionToDetails = (
  subscription: Subscription,
  props: UpdateSubscriptionProperties,
  onlyPreview: boolean = false,
) => {
  const { value: autoRenew, handleUpdate: handleAutoRenew } = props.renew;
  const { value: periodUnit, handleUpdate: handlePeriodUnit } = props.period;

  const billingPeriodYearly = BILLING_PERIOD.find(
    (billingPeriod: BillingPeriod) => billingPeriod.id === 'year',
  );
  const isYearlySubscription =
    subscription.billing_period_unit === billingPeriodYearly?.id;

  return [
    {
      label: 'Activated at',
      data: formatters.formatTimestamp(subscription.activated_at!),
    },
    {
      label: 'Billing period',
      data: (
        <>
          {isYearlySubscription ? (
            billingPeriodYearly?.title
          ) : (
            <BillingPeriodSelect
              value={periodUnit}
              onChange={handlePeriodUnit}
              disabled={onlyPreview}
            />
          )}
        </>
      ),
    },
    {
      label: 'Status',
      data: (
        <Badge
          color={getSubscriptionStatusColor(subscription.status)}
          style="outline"
        >
          {getSubscriptionStatusText(subscription.status)}
        </Badge>
      ),
    },
    {
      label: 'Auto renew',
      data: (
        <Switch
          name="autoRenew"
          additionalStyles={styles.noBottomMargin}
          disabled={subscription?.status !== 'active' || onlyPreview}
          tooltip="Insufficient permissions to update subscription."
          checked={autoRenew}
          onPropertyChanged={handleAutoRenew}
        />
      ),
    },
  ];
};
