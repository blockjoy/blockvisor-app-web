import { NextApiRequest, NextApiResponse } from 'next';
import { _customer } from 'chargebee-typescript';
import { Customer } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const getCustomer = async (customerId: string): Promise<Customer | null> => {
  return new Promise((resolve, reject) => {
    chargebee.customer
      .retrieve(customerId)
      .request(function (error: any, result: { customer: Customer }) {
        if (error) {
          if (error.error_code === 'resource_not_found') resolve(null);
          else reject(error);
        } else {
          resolve(result.customer);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer | null | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const customerId = req.body as string;
      const response = await getCustomer(customerId);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
