import { Subscription } from 'chargebee-typescript/lib/resources';
import { Badge, formatters } from '@shared/index';
import {
  getSubscriptionStatusColor,
  getSubscriptionStatusText,
} from '@modules/billing';

export const mapSubscriptionToDetails = (subscription: Subscription) => {
  return [
    {
      label: 'Activated at',
      data: formatters.formatDate(subscription.activated_at!),
    },
    {
      label: 'Billing period',
      data: subscription.billing_period_unit === 'year' ? 'Yearly' : 'Monthly',
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
        <p>{subscription.auto_collection === 'on' ? 'Enabled' : 'Disabled'}</p>
      ),
    },
  ];
};
