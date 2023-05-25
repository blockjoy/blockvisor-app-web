import { NextApiRequest, NextApiResponse } from 'next';

import { _payment_intent, _payment_source } from 'chargebee-typescript';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { PaymentSource } from 'chargebee-typescript/lib/resources';

const updatePaymentSource = async (
  id: string,
  params: _payment_source.update_card_params,
): Promise<PaymentSource> => {
  return new Promise((resolve, reject) => {
    chargebee.payment_source
      .update_card(id, params)
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
      const { id, params } = req.body as {
        id: string;
        params: _payment_source.update_card_params;
      };
      const response = await updatePaymentSource(id, params);

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
