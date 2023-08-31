import { Invoice } from 'chargebee-typescript/lib/resources';
import { Badge } from '@shared/components';
import { formatters } from '@shared/index';
import { getInvoiceStatusColor, getInvoiceStatusText } from '@modules/billing';

export const mapInvoiceToDetails = (invoice: Invoice) => {
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
      data: formatters.formatTimestamp(invoice.due_date!),
    },
  ];
};
