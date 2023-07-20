import { Invoice } from 'chargebee-typescript/lib/resources';
import { Badge } from '@shared/components';
import { formatters } from '@shared/index';
import {
  BillingAddressPreview,
  getInvoiceStatusColor,
  getInvoiceStatusText,
} from '@modules/billing';

export const mapInvoiceToDetails = (invoice: Invoice) => {
  const billingAddress = invoice.billing_address;

  return [
    {
      label: 'Status',
      data: (
        <Badge color={getInvoiceStatusColor(invoice.status)} style="outline">
          {getInvoiceStatusText(invoice.status)}
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
