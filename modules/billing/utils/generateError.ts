enum ErrorCodes {
  PAYMENT_ERROR_DURING_UPDATE = 'payment_error_during_update',
}

export const generateError = (errorCode: BillingError): string => {
  switch (errorCode.error_code) {
    case ErrorCodes.PAYMENT_ERROR_DURING_UPDATE:
      return 'Unable to process payment. Please update you credit card details and try again.';
    default:
      return 'Something went wrong. Please try again later.';
  }
};
