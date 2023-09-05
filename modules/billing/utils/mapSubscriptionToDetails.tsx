import { css } from '@emotion/react';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { formatters } from '@shared/index';
import { Badge, Switch } from '@shared/components';
import {
  getSubscriptionStatusColor,
  getSubscriptionStatusText,
  BillingPeriodSelect,
} from '@modules/billing';

const styles = {
  noBottomMargin: css`
    margin-bottom: 0;
  `,
};

export const mapSubscriptionToDetails = (
  subscription: Subscription,
  props: UpdateSubscriptionProperties,
) => {
  const { value: autoRenew, handleUpdate: handleAutoRenew } = props.renew;
  const { value: periodUnit, handleUpdate: handlePeriodUnit } = props.period;

  return [
    {
      label: 'Activated at',
      data: formatters.formatTimestamp(subscription.activated_at!),
    },
    {
      label: 'Billing period',
      data: (
        <BillingPeriodSelect value={periodUnit} onChange={handlePeriodUnit} />
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
          disabled={false}
          tooltip="Subscription's auto renewal"
          checked={autoRenew}
          onPropertyChanged={handleAutoRenew}
        />
      ),
    },
  ];
};
