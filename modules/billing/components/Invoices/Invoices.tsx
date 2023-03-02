import { InvoicesTable, InvoicesUIProvider } from '@modules/billing';

export const Invoices = () => (
  <InvoicesUIProvider>
    <InvoicesTable />
  </InvoicesUIProvider>
);
