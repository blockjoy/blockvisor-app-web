type CustomerBillingAddress = {
  first_name: string;
  last_name: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type CustomerData = {
  first_name: string;
  last_name: string;
  email: string;
  locale: string;
  billing_address: CustomerBillingAddress;
};
