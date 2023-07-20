type BillingAddressForm = {
  firstName?: string;
  lastName?: string;
  company?: string;
  address?: string;
  city?: string;
  country?: string;
  region?: string;
  postal?: string;
};

type BillingAddressAdditionalData = {
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: '';
  city?: string;
  zip?: string;
  countryCode?: string;
  state?: '';
  stateCode?: '';
};
