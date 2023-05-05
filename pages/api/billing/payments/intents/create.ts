import { NextApiRequest, NextApiResponse } from 'next';
import { PaymentIntent } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { _payment_intent } from 'chargebee-typescript';

const createPaymentIntent = async (
  params: _payment_intent.create_params,
): Promise<PaymentIntent> => {
  return new Promise((resolve, reject) => {
    chargebee.payment_intent
      .create(params)
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
      const params = req.body as _payment_intent.create_params;
      const response = await createPaymentIntent(params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
