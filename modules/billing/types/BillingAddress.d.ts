interface IBillingAddressHook {
  loading?: boolean;
  form?: UseFormReturn<CreditCardForm>;
  onSubmit?: SubmitHandler<BillingAddressForm>;
  name?: string;
  handleNameChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  company?: string;
  handleCompanyChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  address?: string;
  handleAddressChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  city?: string;
  handleCityChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  country?: string;
  handleCountryChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  region?: string;
  handleRegionChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  postal?: string;
  handlePostalChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  vat?: string;
  handleVatChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type BillingAddressForm = {
  name: string;
  company: string;
  address: string;
  city: string;
  country: string;
  region: string;
  postal: string;
  vat: string;
};
