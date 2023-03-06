import { InvoiceView } from '@modules/billing';
import { AppLayout } from '@modules/layout';

const Invoice = () => <InvoiceView />;

Invoice.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Invoice">{page}</AppLayout>;
};

export default Invoice;
