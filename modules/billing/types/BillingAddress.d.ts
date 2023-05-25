interface IBillingAddressHook {
  billingAddress: CustomerBillingAddress | null;
  billingAddressLoadingState: LoadingState;
  addBillingAddress: (card: BillingAddressParams) => void;
  updateBillingAddress: VoidFunction;
}

interface IBillingAddressFormHook {
  loading?: boolean;
  form?: UseFormReturn<BillingAddressForm>;
  onSubmit?: SubmitHandler<BillingAddressForm>;
  firstNameController: any;
  lastNameController: any;
  companyController: any;
  addressController: any;
  cityController: any;
  countryController: any;
  postalController: any;
}

type BillingAddressForm = {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  city: string;
  country: string;
  region: string;
  postal: string;
};

type BillingAddressParams = {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  city: string;
  country: string;
  region: string;
  postal: string;
};

type BillingAddressActions = {
  add: (card: BillingAddressParams) => void;
  cancel: VoidFunction;
};
