interface IPaymentMethodsHook {
  paymentMethod: any;
  paymentMethods: any;
  paymentMethodsLoadingState: LoadingState;
  paymentMethodLoadingState: LoadingState;
  getPaymentMethod: (params: any) => void;
  getPaymentMethods: (params: any) => void;
  createPaymentMethod: (
    paymentIntentId: string,
    onSuccess: VoidFunction,
  ) => void;
  deletePaymentMethod: (id: string) => void;
}
