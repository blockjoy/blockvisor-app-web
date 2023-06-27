interface ICustomerHook {
  customer: Customer;
  customerLoadingState: LoadingState;
  getCustomer: (customerId: string) => void;
  createCustomer: (params?: _customer.create_params) => void;
  assignPaymentRole: (params: _customer.assign_payment_role_params) => void;
  provideCustomer: () => Promise<Customer | null>;
}
