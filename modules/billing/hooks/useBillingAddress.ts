import { ApplicationError } from '@modules/auth/utils/Errors';
import { useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useBillingAddress = (billingAddress: BillingAddressForm) => {
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

  const [name, setName] = useState(billingAddress.name ?? '');
  const [company, setCompany] = useState(billingAddress.company ?? '');
  const [address, setAddress] = useState(billingAddress.address ?? '');
  const [city, setCity] = useState(billingAddress.city ?? '');
  const [country, setCountry] = useState(billingAddress.country ?? '');
  const [region, setRegion] = useState(billingAddress.region ?? '');
  const [postal, setPostal] = useState(billingAddress.postal ?? '');
  const [vat, setVat] = useState(billingAddress.vat ?? '');

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCompany(value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAddress(value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCity(value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCountry(value);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRegion(value);
  };

  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPostal(value);
  };

  const handleVatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVat(value);
  };

  return {
    loading,
    form,

    onSubmit,

    name,
    handleNameChange,

    company,
    handleCompanyChange,

    address,
    handleAddressChange,

    city,
    handleCityChange,

    country,
    handleCountryChange,

    region,
    handleRegionChange,

    postal,
    handlePostalChange,

    vat,
    handleVatChange,
  };
};
