import { ApplicationError } from '@modules/auth/utils/Errors';
import { useState } from 'react';
import {
  SubmitHandler,
  useController,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { toast } from 'react-toastify';

export const useCreditCard = (card: CreditCardForm): ICreditCardHook => {
  const [loading, setLoading] = useState(false);

  const form: UseFormReturn<CreditCardForm> = useForm<CreditCardForm>({
    defaultValues: {
      cardnumber: card.cardnumber ?? '',
      cardholder: card.cardholder ?? '',
      expdate: card.expdate ?? '',
      cvc: card.cvc ?? '',
    },
  });

  const [cardNumber, setCardNumber] = useState(card.cardnumber ?? '');
  const [cardHolder, setCardHolder] = useState(card.cardholder ?? '');
  const [expDate, setExpDate] = useState(card.expdate ?? '');
  const [cvc, setCvc] = useState(card.cvc ?? '');

  const onSubmit: SubmitHandler<CreditCardForm> = async ({
    cardnumber,
    cardholder,
    expdate,
    cvc,
  }: CreditCardForm) => {
    console.log('FORM SUBMIT', cardnumber, cardholder, expdate, cvc);
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof ApplicationError) toast.error(error.message);
    }
  };

  const cardNumberController = useController({
    name: 'cardnumber',
    control: form.control,
    defaultValue: card.cardnumber ?? '',
  });

  const cardHolderController = useController({
    name: 'cardholder',
    control: form.control,
    defaultValue: card.cardholder ?? '',
  });

  const expDateController = useController({
    name: 'expdate',
    control: form.control,
    defaultValue: card.expdate ?? '',
  });

  const cvcController = useController({
    name: 'cvc',
    control: form.control,
    defaultValue: card.cvc ?? '',
  });

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const formattedValue = value
      .replaceAll(' ', '')
      .replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
    cardNumberController.field.onChange(event);
  };

  // TODO: improve function
  const handleExpDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log('VALUE', value);
    let formattedValue = value
      .replace(/\D/g, '')
      .replace(/^(1[\/]?)/, '1')
      .replace(/^([2-9])/, '$1 / ')
      .replace(/^(\d{2})(\d{1,2})?/, (match, p1, p2) => {
        if (!p2) {
          return `${p1} / `;
        } else {
          return `${p1} / ${p2}`;
        }
      })
      .slice(0, 7);

    console.log('formattedValue', formattedValue);
    setExpDate(formattedValue);
    expDateController.field.onChange(event);
  };

  const handleCardHolderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setCardHolder(value);
    cardHolderController.field.onChange(event);
  };

  const handleCvcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let formattedValue = value.replace(/\D/g, '').slice(0, 4);
    setCvc(formattedValue);
    cvcController.field.onChange(event);
  };

  return {
    loading,
    form,

    onSubmit,

    cardNumber,
    cardNumberController,
    handleCardNumberChange,

    cardHolder,
    cardHolderController,
    handleCardHolderChange,

    expDate,
    expDateController,
    handleExpDateChange,

    cvc,
    cvcController,
    handleCvcChange,
  };
};
