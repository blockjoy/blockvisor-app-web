import { useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Customer } from 'chargebee-typescript/lib/resources';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { useBillingAddress, useCustomer } from '@modules/billing';

interface IBillingAddressFormHook {
  loading: boolean;
  form: UseFormReturn<BillingAddressForm>;
  onSubmit: SubmitHandler<BillingAddressForm>;
}

export const useBillingAddressForm = (): IBillingAddressFormHook => {
  const { provideCustomer } = useCustomer();
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
      const customerData: Customer | null = await provideCustomer();

      await addBillingAddress(customerData?.id!, {
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
        `Billing address ${
          !!billingAddress ? 'updated' : 'created'
        } successfully`,
      );
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
  };
};
