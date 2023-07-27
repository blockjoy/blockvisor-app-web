import { InvoicesList, InvoicesUIProvider } from '@modules/billing';

export const Invoices = () => (
  <InvoicesUIProvider>
    <InvoicesList />
  </InvoicesUIProvider>
);
