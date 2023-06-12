import { NextApiRequest, NextApiResponse } from 'next';
import { _customer } from 'chargebee-typescript';
import { Contact, Customer } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const deleteContact = async (
  customerId: string,
  subscriptionId: string,
  contact: _customer.contact_delete_contact_params,
): Promise<Contact[]> => {
  return new Promise((resolve, reject) => {
    chargebee.customer
      .delete_contact(customerId, { contact })
      .request(function (error: any, result: { customer: Customer }) {
        if (error) {
          reject(error);
        } else {
          const contacts = result.customer.contacts;

          const filteredContacts =
            contacts?.filter((contact: Contact) =>
              contact.label?.split('|').includes(subscriptionId),
            ) ?? [];
          resolve(filteredContacts);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact[] | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const { customerId, subscriptionId, contact } = req.body as {
        customerId: string;
        subscriptionId: string;
        contact: _customer.contact_delete_contact_params;
      };

      const response = await deleteContact(customerId, subscriptionId, contact);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
