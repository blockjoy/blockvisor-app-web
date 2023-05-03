import { useRecoilState } from 'recoil';
import { billingAtoms } from '@modules/billing';

export const useBillingContacts = (): IBillingContactsHook => {
  const [billingContacts, setBillingContacts] = useRecoilState(
    billingAtoms.billingContacts,
  );
  const [billingContactsLoadingState, setBillingContactsLoadingState] =
    useRecoilState(billingAtoms.billingContactsLoadingState);

  const [customer] = useRecoilState(billingAtoms.customer);

  const getBillingContacts = async () => {
    setBillingContactsLoadingState('initializing');

    try {
      const response = await fetch('/api/billing/customers/contacts/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: customer?.id }),
      });

      const data = await response.json();

      setBillingContacts(data);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setBillingContactsLoadingState('finished');
    }
  };

  const addBillingContact = async ({ name, email }: BillingContactForm) => {
    setBillingContactsLoadingState('initializing');

    try {
      const newBillingContact = {
        first_name: name,
        email,
      };

      const response = await fetch('/api/billing/customers/contacts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customer?.id,
          contact: newBillingContact,
        }),
      });

      const data = await response.json();

      const newBillingContacts = [...billingContacts, data];

      setBillingContacts(newBillingContacts);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setBillingContactsLoadingState('finished');
    }
  };

  const removeBillingContact = async (id: string) => {
    setBillingContactsLoadingState('initializing');

    try {
      const response = await fetch('/api/billing/customers/contacts/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customer?.id,
          contact: { id },
        }),
      });

      const data = await response.json();

      const newBillingContacts = [...billingContacts].filter(
        (billingContact) => billingContact.id !== id,
      );

      setBillingContacts(newBillingContacts);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setBillingContactsLoadingState('finished');
    }
  };

  return {
    billingContacts,
    billingContactsLoadingState,

    getBillingContacts,
    addBillingContact,
    removeBillingContact,
  };
};
