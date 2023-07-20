import { Invoice } from 'chargebee-typescript/lib/resources';
import { Badge } from '@shared/components';
import { getName } from 'country-list';
import { formatters } from '@shared/index';
import { getInvoiceStatusColor, getInvoiceStatusText } from '@modules/billing';

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
          {billingAddress && billingAddress.line1 && (
            <>
              {billingAddress.company && <p>{billingAddress.company}</p>}
              <p>{billingAddress.line1}</p>
              <p>
                {billingAddress.city}, {billingAddress.zip}
              </p>
              {billingAddress.country && (
                <p>{getName(billingAddress.country)}</p>
              )}
            </>
          )}
        </>
      ),
    },
  ];
};
