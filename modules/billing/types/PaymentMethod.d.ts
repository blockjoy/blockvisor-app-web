type CreditCardForm = {
  cardHolder: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
};

type AvailablePaymentMethod = {
  id: string;
  name: string;
  title: string;
};

type PaymentMethodAction = 'update' | 'delete';
