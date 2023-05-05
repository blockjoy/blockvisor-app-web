interface IBillingContact {
  id: string;
  name: string;
  email: string;
}

interface IBillingContactsFormHook {
  loading?: boolean;
  form?: UseFormReturn<BillingContactForm>;
  onSubmit?: SubmitHandler<BillingContactForm>;
  nameController?: any;
  emailController?: any;
}

interface IBillingContactsHook {
  billingContacts: IBillingContact[];
  billingContactsLoadingState: LoadingState;
  getBillingContacts: VoidFunction;
  addBillingContact: (billingContact: BillingContactsParams) => void;
  removeBillingContact: (id: string) => void;
}

type BillingContactForm = {
  id: string;
  name: string;
  email: string;
};

type BillingContactsActions = {
  add: (billingContact: BillingContactsParams) => void;
  cancel: VoidFunction;
};
