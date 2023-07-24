import { useRecoilState, useRecoilValue } from 'recoil';
import { _customer } from 'chargebee-typescript';
import { Contact } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';

interface IBillingContactsHook {
  billingContacts: Contact[];
  billingContactsLoadingState: LoadingState;
  getBillingContacts: VoidFunction;
  addBillingContact: (billingContact: BillingContactForm) => void;
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
      const data = await fetchBilling(
        BILLING_API_ROUTES.customer.contacts.list,
        {
          customerId: customer?.id,
          filterParams: {
            subscriptionId: subscription?.id,
          },
        },
      );

      setBillingContacts(data);
    } catch (error) {
      console.error('Failed to fetch Billing contacts', error);
    } finally {
      setBillingContactsLoadingState('finished');
    }
  };

  const addBillingContact = async ({ name, email }: BillingContactForm) => {
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

      const data = await fetchBilling(
        BILLING_API_ROUTES.customer.contacts.create,
        {
          customerId: customer?.id,
          params,
          filterParams: {
            subscriptionId: subscription?.id,
          },
        },
      );

      setBillingContacts(data);
    } catch (error) {
      console.error('Failed to create Billing contact', error);
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

      const data = await fetchBilling(
        BILLING_API_ROUTES.customer.contacts.delete,
        {
          customerId: customer?.id,
          params,
          filterParams: {
            subscriptionId: subscription?.id,
          },
        },
      );

      setBillingContacts(data);
    } catch (error) {
      console.error('Failed to remove Billing contact', error);
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
