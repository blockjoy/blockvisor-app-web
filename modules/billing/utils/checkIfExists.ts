export const checkIfExists = (
  billingContacts: IBillingContact[],
  email: string,
) => {
  if (
    billingContacts.some(
      (billingContact) =>
        billingContact.email?.toLowerCase() === email.toLowerCase(),
    )
  )
    return true;

  return false;
};
