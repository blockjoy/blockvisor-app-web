interface ICreditCardHook {
  creditCard: any;
  creditCardLoadingState: LoadingState;
  getCard: (id: string) => void;
  addCard: (card: CreditCardParams) => void;
  updateCard: VoidFunction;
}

interface ICreditCardFormHook {
  loading?: boolean;
  form?: UseFormReturn<CreditCardForm>;
  onSubmit?: SubmitHandler<CreditCardForm>;
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

type CreditCardActions = {
  add: (card: CreditCardParams) => void;
  cancel: VoidFunction;
};
