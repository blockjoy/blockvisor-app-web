interface ICreditCard {
  id: string;
  object: string;
  address_city?: string | null;
  address_country?: string | null;
  address_line1?: string | null;
  address_line1_check?: string | null;
  address_line2?: string | null;
  address_state?: string | null;
  address_zip?: string | null;
  address_zip_check?: string | null;
  brand: string;
  country: string;
  customer: string;
  cvc_check: string;
  dynamic_last4: any;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  last4: string;
  metadata?: any;
  name?: any;
  tokenization_method?: any;
}

interface ICreditCardHook {
  creditCard: ICreditCard | null;
  creditCardLoadingState: LoadingState;
  getCard: (id: string) => void;
  addCard: (card: CreditCardParams) => void;
  updateCard: VoidFunction;
}

interface ICreditCardFormHook {
  form?: UseFormReturn<CreditCardForm>;
  cardNumberController?: any;
  handleCardNumberChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cardHolderController?: any;
  handleCardHolderChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  expDateController?: any;
  handleExpDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cvcController?: any;
  handleCvcChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type CreditCardParams = {
  cardHolder: string;
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
};

type CreditCardForm = {
  cardHolder: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
};
