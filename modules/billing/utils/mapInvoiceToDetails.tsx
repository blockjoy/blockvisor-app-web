import { Invoice } from 'chargebee-typescript/lib/resources';
import { Badge, formatters } from '@shared/index';
import { BillingAddressPreview, InvoiceStatus } from '@modules/billing';

export const getInvoiceStatusColor = (status: string) => {
  switch (status) {
    case InvoiceStatus['paid']:
      return 'primary';
    case InvoiceStatus['payment_due']:
      return 'secondary';
    case InvoiceStatus['not_paid']:
      return 'note';
    default:
      return 'default';
  }
};

export const mapInvoiceToDetails = (invoice: Invoice) => {
  const billingAddress = invoice.billing_address;

  return [
    {
      label: 'Status',
      data: (
        <Badge color={getInvoiceStatusColor(invoice.status)} style="outline">
          {InvoiceStatus[invoice.status]}
        </Badge>
      ),
    },
    {
      label: 'Due date',
      data: formatters.formatDate(invoice.due_date!),
    },
    {
      label: 'Billing info',
      data: (
        <>
          {billingAddress && (
            <BillingAddressPreview
              type="simple"
              billingAddress={billingAddress}
            />
          )}
        </>
      ),
    },
  ];
};
