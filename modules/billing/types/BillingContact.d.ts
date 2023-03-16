interface IBillingContactsHook {
  loading?: boolean;
  form?: UseFormReturn<BillingContactForm>;
  onSubmit?: SubmitHandler<BillingContactForm>;
  nameController?: any;
  emailController?: any;
}

type BillingContactForm = {
  id: string;
  name: string;
  email: string;
};
