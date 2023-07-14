import { _contact } from 'chargebee-typescript';
import { Contact } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

type ListContactsParams = {
  customerId: string;
  subscriptionId: string;
};

const requestCallback = ({ customerId }: ListContactsParams) =>
  chargebee.customer.contacts_for_customer(customerId);

const mappingCallback = (
  result: { list: Contact[] },
  params: ListContactsParams,
): Contact[] => {
  const { subscriptionId } = params;

  const contacts = result.list.map(
    (listItem: any) => listItem.contact as Contact,
  );

  const filteredContacts = contacts.filter((contact: Contact) =>
    contact.label?.split('|').includes(subscriptionId),
  );

  return filteredContacts;
};

const handler = createHandler<
  ListContactsParams,
  { list: Contact[] },
  Contact[]
>(requestCallback, mappingCallback);

export default handler;
