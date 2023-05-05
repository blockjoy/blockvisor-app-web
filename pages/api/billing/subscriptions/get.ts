import { NextApiRequest, NextApiResponse } from 'next';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Subscription } from 'chargebee-typescript/lib/resources';

const getSubscription = async (
  subscriptionId: string,
): Promise<Subscription> => {
  return new Promise((resolve, reject) => {
    chargebee.subscription.retrieve(subscriptionId).request(function (
      error: any,
      result: {
        subscription: Subscription;
      },
    ) {
      // TODO resource_not_found throws an error
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
      const { subscriptionId } = req.body as any;

      const response = await getSubscription(subscriptionId);

      console.log('response', response);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
