import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SubmitHandler,
  useController,
  UseControllerReturn,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { ApplicationError } from '@modules/auth/utils/Errors';

interface IBillingContactsFormHook {
  loading?: boolean;
  form: UseFormReturn<BillingContactForm>;
  onSubmit: SubmitHandler<BillingContactForm>;
  nameController: UseControllerReturn<BillingContactForm, 'name'>;
  emailController: UseControllerReturn<BillingContactForm, 'email'>;
}

export const useBillingContactsForm = (
  actions: BillingContactsActions,
): IBillingContactsFormHook => {
  const [loading, setLoading] = useState(false);

  const form: UseFormReturn<BillingContactForm> = useForm<BillingContactForm>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<BillingContactForm> = async ({
    name,
    email,
  }: BillingContactForm) => {
    setLoading(true);
    try {
      await actions.add({ name, email });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof ApplicationError) toast.error(error.message);
    }
  };

  const nameController = useController<BillingContactForm, 'name'>({
    name: 'name',
    control: form.control,
    defaultValue: '',
  });

  const emailController = useController<BillingContactForm, 'email'>({
    name: 'email',
    control: form.control,
    defaultValue: '',
  });

  return {
    loading,
    form,

    onSubmit,

    nameController,
    emailController,
  };
};
