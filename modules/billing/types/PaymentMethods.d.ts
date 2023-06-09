interface IPaymentMethodsHook {
  paymentMethod: any;
  paymentMethods: any;
  paymentMethodsLoadingState: LoadingState;
  paymentMethodLoadingState: LoadingState;
  getPaymentMethod: (params: any) => void;
  getPaymentMethods: VoidFunction;
  createPaymentMethod: (
    customerId: string,
    paymentIntentId: string,
    onSuccess: VoidFunction,
  ) => void;
  deletePaymentMethod: (id: string) => void;
}
