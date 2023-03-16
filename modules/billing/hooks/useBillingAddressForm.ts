import { ApplicationError } from '@modules/auth/utils/Errors';
import { useState } from 'react';
import {
  SubmitHandler,
  useController,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { toast } from 'react-toastify';

export const useBillingAddressForm = (
  billingAddress: BillingAddressForm,
): IBillingAddressHook => {
  const [loading, setLoading] = useState(false);

  const form: UseFormReturn<BillingAddressForm> = useForm<BillingAddressForm>({
    defaultValues: {
      name: billingAddress.name ?? '',
      company: billingAddress.company ?? '',
      address: billingAddress.address ?? '',
      city: billingAddress.city ?? '',
      country: billingAddress.country ?? '',
      region: billingAddress.region ?? '',
      postal: billingAddress.postal ?? '',
      vat: billingAddress.vat ?? '',
    },
  });

  const nameController = useController({
    name: 'name',
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

  const regionController = useController({
    name: 'region',
    control: form.control,
    defaultValue: '',
  });

  const postalController = useController({
    name: 'postal',
    control: form.control,
    defaultValue: '',
  });

  const vatController = useController({
    name: 'vat',
    control: form.control,
    defaultValue: '',
  });

  const onSubmit: SubmitHandler<BillingAddressForm> = async ({
    name,
    company,
    address,
    city,
    country,
    region,
    postal,
    vat,
  }: BillingAddressForm) => {
    console.log(
      'FORM SUBMIT',
      name,
      company,
      address,
      city,
      country,
      region,
      postal,
      vat,
    );
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
    companyController,
    addressController,
    cityController,
    countryController,
    regionController,
    postalController,
    vatController,
  };
};
