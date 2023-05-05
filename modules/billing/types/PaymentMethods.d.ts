interface IPaymentMethodsHook {
  paymentMethods: any;
  paymentMethodsLoadingState: LoadingState;
  getPaymentMethods: (customerId: string) => void;
  createCard: (paymentIntentId: string) => void;
}
