import { useState } from 'react';
import {
  SubmitHandler,
  useController,
  UseControllerReturn,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { Customer } from 'chargebee-typescript/lib/resources';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { useBillingAddress, useCustomer } from '@modules/billing';

interface IBillingAddressFormHook {
  loading: boolean;
  form: UseFormReturn<BillingAddressForm>;
  onSubmit: SubmitHandler<BillingAddressForm>;
  firstNameController: UseControllerReturn<BillingAddressForm, 'firstName'>;
  lastNameController: UseControllerReturn<BillingAddressForm, 'lastName'>;
  companyController: UseControllerReturn<BillingAddressForm, 'company'>;
  addressController: UseControllerReturn<BillingAddressForm, 'address'>;
  cityController: UseControllerReturn<BillingAddressForm, 'city'>;
  countryController: UseControllerReturn<BillingAddressForm, 'country'>;
  postalController: UseControllerReturn<BillingAddressForm, 'postal'>;
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

    const customerData: Customer | null = await provideCustomer();

    try {
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

  const firstNameController = useController<BillingAddressForm, 'firstName'>({
    name: 'firstName',
    control: form.control,
    defaultValue: '',
  });

  const lastNameController = useController<BillingAddressForm, 'lastName'>({
    name: 'lastName',
    control: form.control,
    defaultValue: '',
  });

  const companyController = useController<BillingAddressForm, 'company'>({
    name: 'company',
    control: form.control,
    defaultValue: '',
  });

  const addressController = useController<BillingAddressForm, 'address'>({
    name: 'address',
    control: form.control,
    defaultValue: '',
  });

  const cityController = useController<BillingAddressForm, 'city'>({
    name: 'city',
    control: form.control,
    defaultValue: '',
  });

  const countryController = useController<BillingAddressForm, 'country'>({
    name: 'country',
    control: form.control,
    defaultValue: '',
  });

  const postalController = useController<BillingAddressForm, 'postal'>({
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
