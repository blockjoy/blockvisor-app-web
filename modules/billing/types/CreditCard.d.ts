interface ICreditCardHook {
  loading?: boolean;
  form?: UseFormReturn<CreditCardForm>;
  onSubmit?: SubmitHandler<CreditCardForm>;
  cardNumber?: string;
  cardNumberController?: any;
  handleCardNumberChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cardHolder?: string;
  cardHolderController?: any;
  handleCardHolderChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  expDate?: string;
  expDateController?: any;
  handleExpDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cvc?: string;
  cvcController?: any;
  handleCvcChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type CreditCardForm = {
  cardnumber: string;
  cardholder: string;
  expdate: string;
  cvc: string;
};
