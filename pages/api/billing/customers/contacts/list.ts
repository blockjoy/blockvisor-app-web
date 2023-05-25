import { NextApiRequest, NextApiResponse } from 'next';
import { _contact } from 'chargebee-typescript';
import { Customer, Contact } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const listContacts = async (customerData: Customer): Promise<Contact[]> => {
  return new Promise((resolve, reject) => {
    chargebee.customer
      .contacts_for_customer(customerData.id)
      .request(function (error: any, result: { list: Contact[] }) {
        if (error) {
          reject(error);
        } else {
          const contacts = result.list.map(
            (listItem: any) => listItem.contact as Contact,
          );

          resolve(contacts);
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
      const customerData = req.body as any;
      const response = await listContacts(customerData);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
