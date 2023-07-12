import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { _customer } from 'chargebee-typescript';
import { Contact } from 'chargebee-typescript/lib/resources';

interface IBillingContactsHook {
  billingContacts: Contact[];
  billingContactsLoadingState: LoadingState;
  getBillingContacts: VoidFunction;
  addBillingContact: (billingContact: BillingContactParams) => void;
  removeBillingContact: (id: string) => void;
}

export const useBillingContacts = (): IBillingContactsHook => {
  const [billingContacts, setBillingContacts] = useRecoilState(
    billingAtoms.billingContacts,
  );
  const [billingContactsLoadingState, setBillingContactsLoadingState] =
    useRecoilState(billingAtoms.billingContactsLoadingState);

  const customer = useRecoilValue(billingSelectors.customer);

  const subscription = useRecoilValue(billingSelectors.subscription);

  const getBillingContacts = async () => {
    setBillingContactsLoadingState('initializing');

    try {
      const response = await fetch(BILLING_API_ROUTES.customer.contacts.list, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customer?.id,
          subscriptionId: subscription?.id,
        }),
      });

      const data: Contact[] = await response.json();

      setBillingContacts(data);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setBillingContactsLoadingState('finished');
    }
  };

  const addBillingContact = async ({ name, email }: BillingContactParams) => {
    setBillingContactsLoadingState('initializing');

    try {
      const newBillingContact: _customer.contact_add_contact_params = {
        first_name: name,
        email,
        enabled: true,
        send_billing_email: true,
        label: subscription?.id,
      };

      const params: _customer.add_contact_params = {
        contact: newBillingContact,
      };

      const response = await fetch(
        BILLING_API_ROUTES.customer.contacts.create,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: customer?.id,
            subscriptionId: subscription?.id,
            params,
          }),
        },
      );

      const data: Contact[] | [] = await response.json();

      setBillingContacts(data);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setBillingContactsLoadingState('finished');
    }
  };

  const removeBillingContact = async (id: string) => {
    setBillingContactsLoadingState('initializing');

    try {
      const contactToDelete: _customer.contact_delete_contact_params = {
        id,
      };

      const params: _customer.delete_contact_params = {
        contact: contactToDelete,
      };

      const response = await fetch(
        BILLING_API_ROUTES.customer.contacts.delete,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: customer?.id,
            subscriptionId: subscription?.id,
            params,
          }),
        },
      );

      const data: Contact[] | [] = await response.json();

      setBillingContacts(data);
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
