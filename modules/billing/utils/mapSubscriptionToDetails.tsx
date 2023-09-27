import { Subscription } from 'chargebee-typescript/lib/resources';
import { formatters } from '@shared/index';
import { Badge } from '@shared/components';
import {
  getSubscriptionStatusColor,
  getSubscriptionStatusText,
  BillingPeriodSelect,
  BILLING_PERIOD,
  calcNextRenewDate,
} from '@modules/billing';

export const mapSubscriptionToDetails = (
  subscription: Subscription,
  props: UpdateSubscriptionProperties,
  onlyPreview: boolean = false,
) => {
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
          color={getSubscriptionStatusColor(subscription?.status)}
          style="outline"
        >
          {getSubscriptionStatusText(subscription?.status)}
        </Badge>
      ),
    },
    {
      label: 'Auto renew',
      data: (
        <p>
          {subscription.status === 'active'
            ? formatters.formatDate(calcNextRenewDate(periodUnit))
            : '-'}
        </p>
      ),
    },
  ];
};
