import { NextApiRequest, NextApiResponse } from 'next';
import { _payment_source } from 'chargebee-typescript';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const listPaymentSources = async (
  params: _payment_source.payment_source_list_params,
): Promise<PaymentSource[]> => {
  return new Promise((resolve, reject) => {
    chargebee.payment_source
      .list(params)
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
  res: NextApiResponse<PaymentSource[] | [] | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const params = req.body as _payment_source.payment_source_list_params;
      if (!params.customer_id || Object.keys(params.customer_id).length === 0)
        throw new Error('No Customer ID provided');

      const response = await listPaymentSources(params);

      res.status(200).json(response);
    } catch (error: any) {
      if (error.message === 'No Customer ID provided') {
        // Handling the 'No Customer ID provided' error specifically
        res.status(200).json([]);
      } else {
        // Handling any other errors
        res
          .status(error.http_status_code || 500)
          .json({ message: error.message });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
