interface IInvoiceHook {
  invoice: any | null;
  invoices: any[];
  invoiceLoadingState: LoadingState;
  invoicesLoadingState: LoadingState;
  getInvoice: (invoiceId: RouterId) => void;
  getInvoices: VoidFunction;
  unloadInvoice: VoidFunction;
}
