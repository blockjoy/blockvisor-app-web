import { mapInvoiceToDetails } from '@modules/billing';
import { DetailsTable } from '@shared/components';
import { Invoice } from 'chargebee-typescript/lib/resources';
import { containers } from 'styles/containers.styles';

type InvoiceInfoProps = {
  invoice: Invoice;
};

export const InvoiceInfo = ({ invoice }: InvoiceInfoProps) => {
  const invoiceData = mapInvoiceToDetails(invoice!);

  return (
    <div css={containers.mediumSmall}>
      <DetailsTable bodyElements={invoiceData} />
    </div>
  );
};
