import { Subscription } from 'chargebee-typescript/lib/resources';
import { Badge, formatters } from '@shared/index';
import { SubscriptionStatus } from '@modules/billing';

export const getSubscriptionStatusColor = (status: string) => {
  switch (status) {
    case SubscriptionStatus['active']:
      return 'primary';
    case SubscriptionStatus['cancelled']:
      return 'secondary';
    case SubscriptionStatus['non_renewing']:
      return 'note';
    default:
      return 'default';
  }
};

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
          {SubscriptionStatus[subscription.status]}
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
