import { ApplicationError } from '@modules/auth/utils/Errors';
import { CustomerBillingAddress } from 'chargebee-typescript/lib/resources';
import { useState } from 'react';
import {
  SubmitHandler,
  useController,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { toast } from 'react-toastify';

export const useBillingAddressForm = (
  billingAddress: CustomerBillingAddress | null,
  actions: BillingAddressActions,
): IBillingAddressFormHook => {
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
      await actions.add({
        firstName,
        lastName,
        company,
        address,
        city,
        country,
        region,
        postal,
      });
      actions.cancel();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof ApplicationError) toast.error(error.message);
    }
  };

  const firstNameController = useController({
    name: 'firstName',
    control: form.control,
    defaultValue: '',
  });
  const lastNameController = useController({
    name: 'lastName',
    control: form.control,
    defaultValue: '',
  });

  const companyController = useController({
    name: 'company',
    control: form.control,
    defaultValue: '',
  });

  const addressController = useController({
    name: 'address',
    control: form.control,
    defaultValue: '',
  });

  const cityController = useController({
    name: 'city',
    control: form.control,
    defaultValue: '',
  });

  const countryController = useController({
    name: 'country',
    control: form.control,
    defaultValue: '',
  });

  const postalController = useController({
    name: 'postal',
    control: form.control,
    defaultValue: '',
  });

  return {
    loading,
    form,

    onSubmit,

    firstNameController,
    lastNameController,
    companyController,
    addressController,
    cityController,
    countryController,
    postalController,
  };
};
