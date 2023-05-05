import { useState } from 'react';
import {
  SubmitHandler,
  useController,
  useForm,
  UseFormReturn,
} from 'react-hook-form';

export const useCreditCardForm = (
  actions: CreditCardActions,
): ICreditCardFormHook => {
  const [loading, setLoading] = useState<any>(false);

  const form: UseFormReturn<CreditCardForm> = useForm<CreditCardForm>({
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expDate: '',
      cvc: '',
    },
  });

  const onSubmit: SubmitHandler<CreditCardForm> = async ({
    cardNumber,
    cardHolder,
    expDate,
    cvc,
  }: CreditCardForm) => {
    setLoading(true);

    const expMonth = expDate.split('/')[0];
    const expYear = expDate.split('/')[1];

    const card = {
      cardHolder,
      cardNumber,
      expMonth: parseInt(expMonth),
      expYear: parseInt(expYear),
      cvc,
    };

    try {
      await actions.add(card);
      actions.cancel();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const cardNumberController = useController({
    name: 'cardNumber',
    control: form.control,
    defaultValue: '',
  });

  const cardHolderController = useController({
    name: 'cardHolder',
    control: form.control,
    defaultValue: '',
  });

  const expDateController = useController({
    name: 'expDate',
    control: form.control,
    defaultValue: '',
  });

  const cvcController = useController({
    name: 'cvc',
    control: form.control,
    defaultValue: '',
  });

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const formattedValue = value
      .replaceAll(' ', '')
      .replace(/(\d{4})(?=\d)/g, '$1 ');

    form.setValue('cardNumber', formattedValue ?? '');
    cardNumberController.field.onChange(event);
  };

  // TODO: improve function
  const handleExpDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
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

    form.setValue('expDate', formattedValue ?? '');
    expDateController.field.onChange(event);
  };

  const handleCardHolderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    form.setValue('cardHolder', value ?? '');
    cardHolderController.field.onChange(event);
  };

  const handleCvcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let formattedValue = value.replace(/\D/g, '').slice(0, 4);
    form.setValue('cvc', formattedValue ?? '');
    cvcController.field.onChange(event);
  };

  return {
    loading,
    form,

    onSubmit,

    cardNumberController,
    handleCardNumberChange,

    cardHolderController,
    handleCardHolderChange,

    expDateController,
    handleExpDateChange,

    cvcController,
    handleCvcChange,
  };
};
