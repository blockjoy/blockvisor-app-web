import { NextApiRequest, NextApiResponse } from 'next';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const createPaymentSource = async (id: string): Promise<PaymentSource> => {
  return new Promise((resolve, reject) => {
    chargebee.payment_source
      .delete(id)
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
      const { id } = req.body as { id: string };
      const response = await createPaymentSource(id);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
