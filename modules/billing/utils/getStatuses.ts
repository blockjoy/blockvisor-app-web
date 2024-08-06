import { InvoiceStatus } from '@modules/grpc/library/blockjoy/v1/org';

export const getInvoiceStatusColor = (status?: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.INVOICE_STATUS_PAID:
      return 'primary';
    case InvoiceStatus.INVOICE_STATUS_OPEN:
      return 'note';
    default:
      return 'default';
  }
};

export const getInvoiceStatusText = (status?: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.INVOICE_STATUS_PAID:
      return 'Paid';
    case InvoiceStatus.INVOICE_STATUS_OPEN:
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
