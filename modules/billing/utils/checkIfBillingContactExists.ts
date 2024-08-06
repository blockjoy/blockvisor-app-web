export const checkIfBillingContactExists = (
  billingContacts: any[],
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
