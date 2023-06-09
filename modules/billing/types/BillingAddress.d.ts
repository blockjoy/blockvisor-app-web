interface IBillingAddressHook {
  billingAddress: CustomerBillingAddress | null;
  billingAddressLoadingState: LoadingState;
  addBillingAddress: (customerId: string, card: BillingAddressParams) => void;
  updateBillingAddress: VoidFunction;
}

interface IBillingAddressFormHook {
  loading?: boolean;
  form?: UseFormReturn<BillingAddressParams>;
  onSubmit?: SubmitHandler<BillingAddressParams>;
  firstNameController: any;
  lastNameController: any;
  companyController: any;
  addressController: any;
  cityController: any;
  countryController: any;
  postalController: any;
}

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
  add: (customerId: string, card: BillingAddressParams) => void;
  cancel: VoidFunction;
};
