import { NextApiRequest, NextApiResponse } from 'next';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Subscription, Card } from 'chargebee-typescript/lib/resources';

const getSubscription = async (id: string): Promise<Subscription | null> => {
  return new Promise((resolve, reject) => {
    chargebee.subscription.retrieve(id).request(function (
      error: any,
      result: {
        subscription: Subscription;
        card: Card;
      },
    ) {
      if (error) {
        if (error.error_code === 'resource_not_found') resolve(null);
        else reject(error);
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
  res: NextApiResponse<Subscription | null | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.body as { id: string };

      const response = await getSubscription(id);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
