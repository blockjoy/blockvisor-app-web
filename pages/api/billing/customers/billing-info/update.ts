import { NextApiRequest, NextApiResponse } from 'next';
import { _customer } from 'chargebee-typescript';
import {
  Card,
  Customer,
  CustomerBillingAddress,
} from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const updateBillingInfo = async (
  customerId: string,
  billingInfo: CustomerBillingAddress,
): Promise<Customer> => {
  return new Promise((resolve, reject) => {
    chargebee.customer
      .update_billing_info(customerId, { billing_address: billingInfo })
      .request(function (
        error: any,
        result: { customer: Customer; card: Card },
      ) {
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
      const { customerId, billingInfo } = req.body as any;

      const response = await updateBillingInfo(customerId, billingInfo);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
