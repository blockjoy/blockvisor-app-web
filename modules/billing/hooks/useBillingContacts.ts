import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { _customer } from 'chargebee-typescript';
import { Contact } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
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
  const customer = useRecoilValue(billingSelectors.customer);
  const subscription = useRecoilValue(billingSelectors.subscription);

  const fetcher = () =>
    fetchBilling(BILLING_API_ROUTES.customer.contacts.list, {
      customerId: customer?.id,
      filterParams: {
        subscriptionId: subscription?.id,
      },
    });

  const {
    data: billingContacts,
    error,
    isLoading,
    mutate,
  } = useSWR(
    () =>
      subscription?.status === 'active'
        ? BILLING_API_ROUTES.customer.contacts.list
        : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  if (error) console.error('Failed to fetch Billing Contacts', error);

  const billingContactsLoadingState = isLoading ? 'initializing' : 'finished';

  const getBillingContacts = () => {
    mutate();
  };

  const addBillingContact = async ({ name, email }: BillingContactForm) => {
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

      mutate(data);
    } catch (error) {
      console.error('Failed to create Billing contact', error);
    }
  };

  const removeBillingContact = async (id: string) => {
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

      mutate(data);
    } catch (error) {
      console.error('Failed to remove Billing contact', error);
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
