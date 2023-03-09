import { ApplicationError } from '@modules/auth/utils/Errors';
import { useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useBillingContacts = (
  billingContact: BillingContactForm,
): IBillingContactsHook => {
  const [loading, setLoading] = useState(false);

  const form: UseFormReturn<BillingContactForm> = useForm<BillingContactForm>({
    defaultValues: {
      name: billingContact.name ?? '',
      email: billingContact.email ?? '',
    },
  });

  const [name, setName] = useState(billingContact.name ?? '');
  const [email, setEmail] = useState(billingContact.email ?? '');

  const onSubmit: SubmitHandler<BillingContactForm> = async ({
    name,
    email,
  }: BillingContactForm) => {
    console.log('FORM SUBMIT', name, email);
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof ApplicationError) toast.error(error.message);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  return {
    loading,
    form,

    onSubmit,

    name,
    handleNameChange,

    email,
    handleEmailChange,
  };
};
