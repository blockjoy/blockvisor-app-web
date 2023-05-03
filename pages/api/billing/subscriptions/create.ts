import { NextApiRequest, NextApiResponse } from 'next';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Subscription } from 'chargebee-typescript/lib/resources';

const createSubscription = async (
  customerId: string,
  subscription: any,
): Promise<Subscription> => {
  return new Promise((resolve, reject) => {
    chargebee.subscription
      .create_with_items(customerId, subscription)
      .request(function (
        error: any,
        result: {
          subscription: Subscription;
        },
      ) {
        if (error) {
          reject(error);
        } else {
          console.log(`${result}`);
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
      const { customerId, subscription } = req.body as any;

      console.log('subscription123', subscription);

      const response = await createSubscription(customerId, subscription);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
