import { mapInvoiceToDetails } from '@modules/billing';
import { DetailsTable } from '@shared/components';
import { Invoice } from 'chargebee-typescript/lib/resources';
import { styles } from './InvoiceInfo.styles';

type InvoiceInfoProps = {
  invoice: Invoice;
};

export const InvoiceInfo = ({ invoice }: InvoiceInfoProps) => {
  const invoiceData = mapInvoiceToDetails(invoice!);

  return (
    <div css={styles.wrapper}>
      <DetailsTable bodyElements={invoiceData} />
    </div>
  );
};
