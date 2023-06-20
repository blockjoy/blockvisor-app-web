interface IInvoiceHook {
  invoice: Invoice;
  invoiceLoadingState: LoadingState;
  getInvoice: (invoiceId: RouterId) => void;
  unloadInvoice: VoidFunction;
}

interface IInvoicesHook {
  invoices: Invoice[];
  invoicesLoadingState: LoadingState;
  getInvoices: VoidFunction;
}
