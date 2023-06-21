interface IInvoiceHook {
  invoice: Invoice;
  invoiceLoadingState: LoadingState;
  getInvoice: (id: RouterId) => void;
  getInvoicePDF: (id: RouterId) => void;
  unloadInvoice: VoidFunction;
}

interface IInvoicesHook {
  invoices: Invoice[];
  invoicesLoadingState: LoadingState;
  getInvoices: VoidFunction;
}
