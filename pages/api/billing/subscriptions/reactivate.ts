import { NextApiRequest, NextApiResponse } from 'next';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Subscription } from 'chargebee-typescript/lib/resources';

const reactivateSubscription = async (
  subscriptionId: string,
): Promise<Subscription> => {
  return new Promise((resolve, reject) => {
    chargebee.subscription
      .reactivate(subscriptionId, { invoice_immediately: true })
      .request(function (error: any, result: { subscription: Subscription }) {
        if (error) {
          reject(error);
        } else {
          resolve(result.subscription);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Subscription | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      type ReqBody = {
        subscriptionId: string;
      };

      const { subscriptionId } = req.body as ReqBody;
      const response = await reactivateSubscription(subscriptionId);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
