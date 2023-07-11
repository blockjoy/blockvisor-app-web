enum ErrorCodes {
  PAYMENT_ERROR_DURING_UPDATE = 'payment_error_during_update',
}

enum PaymentErrorCodes {
  'PAYMENT_ATTEMPT_REFUSED' = 'PAYMENT_ATTEMPT_REFUSED',
}

export const generateError = (error?: BillingError): string => {
  switch (error?.error_code) {
    case ErrorCodes.PAYMENT_ERROR_DURING_UPDATE:
      return 'Unable to process payment. Please update you credit card details and try again.';
    default:
      return 'Something went wrong. Please try again later.';
  }
};

export const generatePaymentError = (error?: PaymentError): string => {
  switch (error?.name) {
    case PaymentErrorCodes.PAYMENT_ATTEMPT_REFUSED:
      return 'Payment declined due to risk concerns. Please verify your details or try a different method.';
    default:
      return 'Something went wrong. Please try again later.';
  }
};
