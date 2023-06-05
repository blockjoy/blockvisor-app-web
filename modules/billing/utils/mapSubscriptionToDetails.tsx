import { Subscription } from 'chargebee-typescript/lib/resources';
import { formatters } from '@shared/index';
import { SubscriptionStatus } from '@modules/billing';

export const mapSubscriptionToDetails = (subscription: Subscription) => {
  return [
    {
      label: 'Active Plan',
      data: 'Single Node',
    },
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
      data: <p>{SubscriptionStatus[subscription.status]}</p>,
    },
  ];
};
