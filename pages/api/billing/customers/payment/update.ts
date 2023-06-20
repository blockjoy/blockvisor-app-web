import { NextApiRequest, NextApiResponse } from 'next';
import { _customer } from 'chargebee-typescript';
import { Card, Customer } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const updateBillingInfo = async (
  customerId: string,
  params: _customer.assign_payment_role_params,
): Promise<Customer> => {
  return new Promise((resolve, reject) => {
    chargebee.customer
      .assign_payment_role(customerId, params)
      .request(function (
        error: any,
        result: { customer: Customer; card: Card },
      ) {
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
      const { customerId, params } = req.body as {
        customerId: string;
        params: _customer.assign_payment_role_params;
      };

      const response = await updateBillingInfo(customerId, params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
