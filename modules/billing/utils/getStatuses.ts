import { InvoiceStatus, SubscriptionStatus } from '@modules/billing';

export const getInvoiceStatusColor = (status: string) => {
  switch (status) {
    case InvoiceStatus.paid:
      return 'primary';
    case InvoiceStatus.payment_due:
      return 'note';
    case InvoiceStatus.not_paid:
      return 'note';
    default:
      return 'default';
  }
};

export const getInvoiceStatusText = (status: string) => {
  switch (status) {
    case InvoiceStatus.paid:
      return 'Paid';
    case InvoiceStatus.payment_due:
      return 'Payment due';
    case InvoiceStatus.not_paid:
      return 'Not paid';
    default:
      return 'Unknown';
  }
};

export const getSubscriptionStatusColor = (status: string) => {
  switch (status) {
    case SubscriptionStatus.active:
      return 'primary';
    case SubscriptionStatus.cancelled:
      return 'secondary';
    case SubscriptionStatus.non_renewing:
      return 'note';
    default:
      return 'default';
  }
};

export const getSubscriptionStatusText = (status: string) => {
  switch (status) {
    case SubscriptionStatus.active:
      return 'Active';
    case SubscriptionStatus.cancelled:
      return 'Cancelled';
    case SubscriptionStatus.non_renewing:
      return 'Non-renewing';
    default:
      return 'Unknown';
  }
};
