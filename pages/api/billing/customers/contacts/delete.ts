import { NextApiRequest, NextApiResponse } from 'next';
import { _customer } from 'chargebee-typescript';
import {
  Card,
  Customer,
  CustomerBillingAddress,
} from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const deleteContact = async (
  customerId: string,
  contact: any,
): Promise<Customer> => {
  return new Promise((resolve, reject) => {
    chargebee.customer
      .delete_contact(customerId, { contact })
      .request(function (error: any, result: { customer: Customer }) {
        if (error) {
          reject(error);
        } else {
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
      const { customerId, contact } = req.body as any;

      const response = await deleteContact(customerId, contact);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
