import { ApplicationError } from '@modules/auth/utils/Errors';
import { useState } from 'react';
import {
  SubmitHandler,
  useController,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { toast } from 'react-toastify';

export const useBillingContactsForm = (
  billingContact: BillingContactForm,
): IBillingContactsHook => {
  const [loading, setLoading] = useState(false);

  const form: UseFormReturn<BillingContactForm> = useForm<BillingContactForm>({
    defaultValues: {
      name: billingContact.name ?? '',
      email: billingContact.email ?? '',
    },
  });

  const nameController = useController({
    name: 'name',
    control: form.control,
    defaultValue: '',
  });

  const emailController = useController({
    name: 'email',
    control: form.control,
    defaultValue: '',
  });

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

  return {
    loading,
    form,

    onSubmit,

    nameController,
    emailController,
  };
};
