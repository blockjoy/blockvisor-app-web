import { formatCurrency, formatDate } from '@shared/index';
import { useRecoilValue } from 'recoil';
import { billingSelectors } from '../store/billingSelectors';
import { Subscription } from 'chargebee-typescript/lib/resources';

export const mapSubscriptionToDetails = (subscription: Subscription) => {
  return [
    {
      label: 'Active Plan',
      data: 'Single Node',
    },
    {
      label: 'Activated at',
      data: formatDate(subscription.activated_at!),
    },
    {
      label: 'Billing period',
      data: subscription.billing_period_unit === 'year' ? 'Yearly' : 'Monthly',
    },
    {
      label: 'Status',
      data: subscription.status,
    },
  ];
};
