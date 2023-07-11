type BillingError = {
  api_error_code?: string;
  error_code?: string;
  error_msg?: string;
  http_status_code?: number;
  message?: string;
  type?: string;
};

type PaymentErrorData = {
  code?: string;
  name?: string;
  type?: string;
  message?: string;
};

type PaymentError = {
  code?: string;
  name?: string;
  type?: string;
  message?: string;
  data?: PaymentErrorData;
  displayMessage?: string;
};
