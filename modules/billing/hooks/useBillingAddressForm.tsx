import { useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ApplicationError } from '@modules/auth/utils/Errors';
import { useBillingAddress } from './useBillingAddress';

interface IBillingAddressFormHook {
  loading: boolean;
  form: UseFormReturn<BillingAddressForm>;
  onSubmit: SubmitHandler<BillingAddressForm>;
}

export const useBillingAddressForm = (): IBillingAddressFormHook => {
  const { billingAddress, addBillingAddress } = useBillingAddress();

  const [loading, setLoading] = useState(false);

  const form: UseFormReturn<BillingAddressForm> = useForm<BillingAddressForm>({
    defaultValues: {
      firstName: billingAddress?.first_name ?? '',
      lastName: billingAddress?.last_name ?? '',
      company: billingAddress?.company ?? '',
      address: billingAddress?.line1 ?? '',
      city: billingAddress?.city ?? '',
      country: billingAddress?.country ?? '',
      postal: billingAddress?.zip ?? '',
    },
  });

  const { reset } = form;

  const onSubmit: SubmitHandler<BillingAddressForm> = async ({
    firstName,
    lastName,
    company,
    address,
    city,
    country,
    region,
    postal,
  }: BillingAddressForm) => {
    setLoading(true);

    try {
      await addBillingAddress({
        firstName,
        lastName,
        company,
        address,
        city,
        country,
        region,
        postal,
      });

      toast.success(
        `Account Profile ${
          !!billingAddress ? 'updated' : 'created'
        } successfully`,
      );
    } catch (error) {
      if (error instanceof ApplicationError) toast.error(error.message);
    } finally {
      setLoading(false);

      reset({}, { keepValues: true });
    }
  };

  return {
    loading,
    form,

    onSubmit,
  };
};
