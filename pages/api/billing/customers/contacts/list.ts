import { NextApiRequest, NextApiResponse } from 'next';
import { _contact } from 'chargebee-typescript';
import { Contact } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const listContacts = async (params: {
  customerId: string;
  subscriptionId: string;
}): Promise<Contact[]> => {
  return new Promise((resolve, reject) => {
    chargebee.customer
      .contacts_for_customer(params.customerId)
      .request(function (error: any, result: { list: Contact[] }) {
        if (error) {
          reject(error);
        } else {
          const contacts = result.list.map(
            (listItem: any) => listItem.contact as Contact,
          );

          const filteredContacts = contacts.filter((contact: Contact) =>
            contact.label?.split('|').includes(params.subscriptionId),
          );

          resolve(filteredContacts);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const params = req.body as { customerId: string; subscriptionId: string };
      const response = await listContacts(params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
