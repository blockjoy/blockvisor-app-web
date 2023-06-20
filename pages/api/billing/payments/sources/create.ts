import { NextApiRequest, NextApiResponse } from 'next';

import { _payment_intent, _payment_source } from 'chargebee-typescript';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { PaymentSource } from 'chargebee-typescript/lib/resources';

const createPaymentSource = async (
  params: _payment_source.create_using_payment_intent_params,
): Promise<PaymentSource> => {
  return new Promise((resolve, reject) => {
    chargebee.payment_source
      .create_using_payment_intent(params)
      .request(function (
        error: any,
        result: { payment_source: PaymentSource },
      ) {
        if (error) {
          reject(error);
        } else {
          resolve(result.payment_source);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const params =
        req.body as _payment_source.create_using_payment_intent_params;
      const response = await createPaymentSource(params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
