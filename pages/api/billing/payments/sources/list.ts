import { NextApiRequest, NextApiResponse } from 'next';
import { _customer } from 'chargebee-typescript';
import { Customer, PaymentSource } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const listPayments = async (
  customerData: Customer,
): Promise<PaymentSource[]> => {
  return new Promise((resolve, reject) => {
    chargebee.payment_source
      .list({
        customer_id: { is: customerData.id },
        type: { is: 'card' },
      })
      .request(function (error: any, result: { list: PaymentSource[] }) {
        if (error) {
          reject(error);
        } else {
          const paymentSources = result.list.map(
            (listItem: any) => listItem.payment_source as PaymentSource,
          );

          resolve(paymentSources);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaymentSource[] | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const params = req.body as any;
      const response = await listPayments(params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
