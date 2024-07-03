import { useRecoilState } from 'recoil';
import { billingAtoms } from '@modules/billing';

interface IBillingContactsHook {
  billingContacts: any[];
  billingContactsLoadingState: LoadingState;
  getBillingContacts: VoidFunction;
  addBillingContact: (billingContact: BillingContactForm) => Promise<void>;
  removeBillingContact: (id: string) => Promise<void>;
}

export const useBillingContacts = (): IBillingContactsHook => {
  const [billingContacts, setBillingContacts] = useRecoilState(
    billingAtoms.billingContacts,
  );
  const [billingContactsLoadingState, setBillingContactsLoadingState] =
    useRecoilState(billingAtoms.billingContactsLoadingState);

  const getBillingContacts = () => {
    setBillingContactsLoadingState('initializing');

    try {
      const data: any = [];

      console.log('%cGetSubscription', 'color: #bff589', data);
      setBillingContacts(data);
    } catch (error) {
      console.error('Failed to fetch Subscription', error);
      setBillingContacts(null);
    } finally {
      setBillingContactsLoadingState('finished');
    }
  };

  const addBillingContact = async ({ name, email }: BillingContactForm) => {
    try {
    } catch (error) {
      console.error('Failed to create Billing contact', error);
    }
  };

  const removeBillingContact = async (id: string) => {
    try {
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
