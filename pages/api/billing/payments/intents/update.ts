import { NextApiRequest, NextApiResponse } from 'next';
import { PaymentIntent } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { _payment_intent } from 'chargebee-typescript';

const updatePaymentIntent = async (
  id: string,
  params: _payment_intent.update_params,
): Promise<PaymentIntent> => {
  return new Promise((resolve, reject) => {
    chargebee.payment_intent
      .update(id, params)
      .request(function (
        error: any,
        result: { payment_intent: PaymentIntent },
      ) {
        if (error) {
          reject(error);
        } else {
          resolve(result.payment_intent);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaymentIntent | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const { id, params } = req.body as {
        id: string;
        params: _payment_intent.update_params;
      };
      const response = await updatePaymentIntent(id, params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
