import { NextApiRequest, NextApiResponse } from 'next';
import { _payment_source } from 'chargebee-typescript';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const getPaymentSource = async (id: string): Promise<PaymentSource> => {
  return new Promise((resolve, reject) => {
    chargebee.payment_source
      .retrieve(id)
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
  res: NextApiResponse<PaymentSource | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.body as { id: string };
      const response = await getPaymentSource(id);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
