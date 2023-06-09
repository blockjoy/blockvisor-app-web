import { useIdentityRepository } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import {
  Customer,
  CustomerBillingAddress,
} from 'chargebee-typescript/lib/resources';
import { useState } from 'react';
import {
  SubmitHandler,
  useController,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCustomer } from './useCustomer';

export const useBillingAddressForm = (
  actions: BillingAddressActions,
  billingAddress?: CustomerBillingAddress | null,
): IBillingAddressFormHook => {
  const { customer, createCustomer } = useCustomer();

  const identity = useIdentityRepository();
  const user = identity?.getIdentity();

  const [loading, setLoading] = useState(false);

  const form: UseFormReturn<BillingAddressParams> =
    useForm<BillingAddressParams>({
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

  const handleCustomerCheck = async () => {
    if (!customer) {
      try {
        const newCustomer = await createCustomer({
          id: user?.id,
          first_name: user?.firstName,
          last_name: user?.lastName,
          email: user?.email,
        });
        return newCustomer;
      } catch (error) {
        console.log(
          'Error while creating a customer in handlePaymentCreation',
          error,
        );
        return;
      }
    }

    return customer;
  };

  const onSubmit: SubmitHandler<BillingAddressParams> = async ({
    firstName,
    lastName,
    company,
    address,
    city,
    country,
    region,
    postal,
  }: BillingAddressParams) => {
    setLoading(true);

    const customerData: Customer = await handleCustomerCheck();

    try {
      await actions.add(customerData.id, {
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
