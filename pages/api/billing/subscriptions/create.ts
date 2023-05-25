import { NextApiRequest, NextApiResponse } from 'next';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { _subscription } from 'chargebee-typescript';

const createSubscription = async (
  id: string,
  params: _subscription.create_with_items_params,
): Promise<Subscription> => {
  return new Promise((resolve, reject) => {
    chargebee.subscription.create_with_items(id, params).request(function (
      error: any,
      result: {
        subscription: Subscription;
      },
    ) {
      console.log('isAnythingHappening?123');
      if (error) {
        console.log('error123', error);
        reject(error);
      } else {
        console.log('result123', `${result}`);
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
      const { id, params } = req.body as {
        id: string;
        params: _subscription.create_with_items_params;
      };

      console.log('id123', id);

      const response = await createSubscription(id, params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
