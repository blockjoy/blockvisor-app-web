interface IBillingContact {
  id: string;
  name: string;
  email: string;
}

type BillingContactParams = {
  name: string;
  email: string;
};

type BillingContactForm = {
  name: string;
  email: string;
};

type BillingContactsActions = {
  add: (billingContact: BillingContactsParams) => void;
  cancel: VoidFunction;
};
