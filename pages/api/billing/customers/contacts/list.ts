import { _contact } from 'chargebee-typescript';
import { Contact } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

type ListContactsParams = {
  customerId: string;
  filterParams: {
    subscriptionId: string;
  };
};

const requestCallback = ({ customerId }: ListContactsParams) => {
  if (!customerId || Object.keys(customerId).length === 0) {
    throw new Error('No Customer ID provided');
  }

  return chargebee.customer.contacts_for_customer(customerId);
};

const mappingCallback = (
  result: { list: Contact[] },
  params: ListContactsParams,
): Contact[] => {
  const {
    filterParams: { subscriptionId },
  } = params;

  const contacts = result.list.map(
    (listItem: any) => listItem.contact as Contact,
  );

  const filteredContacts = contacts.filter((contact: Contact) =>
    contact.label?.includes(subscriptionId),
  );

  return filteredContacts;
};

const errorCallback = (error: any): [] | null => {
  if (error.message === 'No Customer ID provided') {
    return [];
  }

  return null;
};

const handler = createHandler<
  ListContactsParams,
  { list: Contact[] },
  Contact[]
>(requestCallback, mappingCallback, errorCallback);

export default handler;
