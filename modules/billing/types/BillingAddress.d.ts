interface IBillingAddressHook {
  loading?: boolean;
  form?: UseFormReturn<CreditCardForm>;
  onSubmit?: SubmitHandler<BillingAddressForm>;
  nameController: any;
  companyController: any;
  addressController: any;
  cityController: any;
  countryController: any;
  regionController: any;
  postalController: any;
  vatController: any;
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
