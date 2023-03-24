import { useRecoilState } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { BILLING_CONTACTS } from '../mocks/billingContact';
import { v4 as uuidv4 } from 'uuid';

export const useBillingContacts = (): IBillingContactsHook => {
  const [billingContacts, setBillingContacts] = useRecoilState(
    billingAtoms.billingContacts,
  );
  const [billingContactsLoadingState, setBillingContactsLoadingState] =
    useRecoilState(billingAtoms.billingContactsLoadingState);

  const getBillingContacts = async () => {
    setBillingContactsLoadingState('initializing');
    await new Promise((r) => setTimeout(r, 300));

    const billingContacts: IBillingContact[] = BILLING_CONTACTS;

    setBillingContacts(billingContacts);

    setBillingContactsLoadingState('finished');
  };

  const addBillingContact = async ({ name, email }: BillingContactForm) => {
    await new Promise((r) => setTimeout(r, 300));

    const newBillingContact = {
      id: uuidv4(),
      name,
      email,
    };
    const newBillingContacts = [...billingContacts, newBillingContact];

    setBillingContacts(newBillingContacts);
  };

  const removeBillingContact = async (id: string) => {
    await new Promise((r) => setTimeout(r, 300));

    const newBillingContacts = [...billingContacts].filter(
      (billingContact) => billingContact.id !== id,
    );

    setBillingContacts(newBillingContacts);
  };

  return {
    billingContacts,
    billingContactsLoadingState,

    getBillingContacts,
    addBillingContact,
    removeBillingContact,
  };
};
