import { NextApiRequest, NextApiResponse } from 'next';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Card, Subscription } from 'chargebee-typescript/lib/resources';
import { _subscription } from 'chargebee-typescript';

const updateSubscriptionItems = async (
  id: string,
  params: _subscription.update_for_items_params,
): Promise<Subscription> => {
  return new Promise((resolve, reject) => {
    chargebee.subscription.update_for_items(id, params).request(function (
      error: any,
      result: {
        subscription: Subscription;
        card: Card;
      },
    ) {
      if (error) {
        reject(error);
      } else {
        const subscription = result.subscription as Subscription;
        let resultSubscription = subscription;

        if (!subscription.payment_source_id) {
          const card = result.card as Card;

          resultSubscription = {
            ...subscription,
            payment_source_id: card.payment_source_id!,
          } as Subscription;
        }

        resolve(resultSubscription);
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
      const response = await updateSubscriptionItems(id, params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
