interface ICustomerHook {
  customer: Customer;
  customerLoadingState: LoadingState;
  getCustomer: (customerId: string) => void;
  createCustomer: (params?: _customer.create_params) => void;
}

interface ICustomer {
  id: string;
  object: string;
  address: IBillingAddress;
  balance: any;
  created: any;
  currency: string;
  default_source: any;
  delinquent: boolean;
  description: string;
  discount: any;
  email: any;
  invoice_prefix: string;
  invoice_settings: any;
  livemode: boolean;
  metadata: any;
  name: any;
  next_invoice_sequence: any;
  phone: any;
  preferred_locales: any;
  shipping: any;
  tax_exempt: any;
  test_clock: any;
}
