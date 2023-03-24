interface IBillingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  company: string;
  vat: string;
}

interface IBillingAddressHook {
  billingAddress: IBillingAddress | null;
  billingAddressLoadingState: LoadingState;
  getBillingAddress: VoidFunction;
  addBillingAddress: (card: BillingAddressParams) => void;
  updateBillingAddress: VoidFunction;
}

interface IBillingAddressFormHook {
  loading?: boolean;
  form?: UseFormReturn<BillingAddressForm>;
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

type BillingAddressParams = {
  name: string;
  company: string;
  address: string;
  city: string;
  country: string;
  region: string;
  postal: string;
  vat: string;
};

type BillingAddressActions = {
  add: (card: BillingAddressParams) => void;
  cancel: VoidFunction;
};
