import { NextApiRequest, NextApiResponse } from 'next';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { _subscription } from 'chargebee-typescript';

const updateSubscription = async (
  id: string,
  params: _subscription.update_for_items_params,
): Promise<Subscription> => {
  return new Promise((resolve, reject) => {
    chargebee.subscription.update_for_items(id, params).request(function (
      error: any,
      result: {
        subscription: Subscription;
      },
    ) {
      if (error) {
        console.log('err123', error);
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
      const { id, params } = req.body as any;

      console.log('123ID', id);
      console.log('123PARAMS', params);

      const response = await updateSubscription(id, params);

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
