import { Contact } from 'chargebee-typescript/lib/resources/customer';

export const checkIfBillingContactExists = (
  billingContacts: Contact[],
  email: string,
) => {
  if (
    billingContacts?.some(
      (billingContact) =>
        billingContact?.email?.toLowerCase() === email.toLowerCase(),
    )
  )
    return true;

  return false;
};
