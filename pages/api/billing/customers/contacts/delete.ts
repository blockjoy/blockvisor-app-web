import { _customer } from 'chargebee-typescript';
import { Contact, Customer } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

type DeleteContactParams = {
  customerId: string;
  params: _customer.delete_contact_params;
  filterParams: {
    subscriptionId: string;
  };
};

const requestCallback = ({ customerId, params }: DeleteContactParams) =>
  chargebee.customer.delete_contact(customerId, params);

const mappingCallback = (
  result: { customer: Customer },
  params: DeleteContactParams,
): Contact[] => {
  const {
    filterParams: { subscriptionId },
  } = params;

  const contacts = result.customer.contacts;

  const filteredContacts =
    contacts?.filter((contact: Contact) =>
      contact.label?.includes(subscriptionId),
    ) ?? [];

  return filteredContacts;
};

const handler = createHandler<
  DeleteContactParams,
  { customer: Customer },
  Contact[]
>(requestCallback, mappingCallback);

export default handler;
