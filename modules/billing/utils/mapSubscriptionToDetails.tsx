import { OrgServiceBillingDetailsResponse } from '@modules/grpc/library/blockjoy/v1/org';
import { formatters } from '@shared/index';
import { Badge } from '@shared/components';
import {
  getSubscriptionStatusColor,
  getSubscriptionStatusText,
} from '@modules/billing';

export const mapSubscriptionToDetails = (
  subscription: OrgServiceBillingDetailsResponse,
) => {
  return [
    {
      label: 'Created',
      data: formatters.formatDate(subscription.createdAt!),
    },
    {
      label: 'Billing period',
      data: 'Monthly',
    },
    {
      label: 'Status',
      data: (
        <Badge
          color={getSubscriptionStatusColor(
            subscription?.status as SubscriptionStatus,
          )}
          style="outline"
        >
          {getSubscriptionStatusText(
            subscription?.status as SubscriptionStatus,
          )}
        </Badge>
      ),
    },
    {
      label: 'Current period',
      data: (
        <p>
          {formatters.formatDate(subscription.currentPeriodStart!)} -{` `}
          {formatters.formatDate(subscription.currentPeriodEnd!)}
        </p>
      ),
    },
  ];
};
