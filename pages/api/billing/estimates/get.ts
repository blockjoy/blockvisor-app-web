import { NextApiRequest, NextApiResponse } from 'next';
import { Estimate } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const getEstimate = async (subscriptionId: string): Promise<Estimate> => {
  return new Promise((resolve, reject) => {
    chargebee.estimate
      .advance_invoice_estimate(subscriptionId)
      .request(function (error: any, result: { estimate: Estimate }) {
        if (error) {
          reject(error);
        } else {
          resolve(result.estimate);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const { subscriptionId } = req.body as { subscriptionId: string };
      const response = await getEstimate(subscriptionId);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
