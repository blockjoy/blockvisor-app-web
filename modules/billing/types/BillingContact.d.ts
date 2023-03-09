interface IBillingContactsHook {
  loading?: boolean;
  form?: UseFormReturn<BillingContactForm>;
  onSubmit?: SubmitHandler<BillingContactForm>;
  name?: string;
  handleNameChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  email?: string;
  handleEmailChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type BillingContactForm = {
  id: string;
  name: string;
  email: string;
};
