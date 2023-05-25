import { NextApiRequest, NextApiResponse } from 'next';
import { _customer } from 'chargebee-typescript';
import { Customer } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const createContact = async (
  customerId: string,
  contact: _customer.contact_add_contact_params,
): Promise<Customer> => {
  return new Promise((resolve, reject) => {
    chargebee.customer
      .add_contact(customerId, { contact })
      .request(function (error: any, result: { customer: Customer }) {
        if (error) {
          reject(error);
        } else {
          console.log(`${result}`);
          resolve(result.customer);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const { customerId, contact } = req.body as {
        customerId: string;
        contact: _customer.contact_add_contact_params;
      };

      const response = await createContact(customerId, contact);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
