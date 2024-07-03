import { InvoiceStatus } from '@modules/billing';

export const getInvoiceStatusColor = (status: string) => {
  switch (status) {
    case InvoiceStatus.paid:
      return 'primary';
    case InvoiceStatus.open:
      return 'note';
    default:
      return 'default';
  }
};

export const getInvoiceStatusText = (status: string) => {
  switch (status) {
    case InvoiceStatus.paid:
      return 'Paid';
    case InvoiceStatus.open:
      return 'Payment due';
    default:
      return 'Unknown';
  }
};

export const getSubscriptionStatusColor = (status: SubscriptionStatus) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'primary';
    case 'canceled':
      return 'secondary';
    case 'paused':
      return 'note';
    default:
      return 'default';
  }
};

export const getSubscriptionStatusText = (status: SubscriptionStatus) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'Active';
    case 'canceled':
      return 'Cancelled';
    case 'paused':
      return 'Paused';
    default:
      return 'Unknown';
  }
};
