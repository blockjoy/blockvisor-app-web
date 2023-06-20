import { NextApiRequest, NextApiResponse } from 'next';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Subscription, Card } from 'chargebee-typescript/lib/resources';
import { _subscription } from 'chargebee-typescript';

const listSubscriptions = async (
  params: _subscription.subscription_list_params,
  filterParams: { cf_organization_id: string },
): Promise<Subscription[]> => {
  return new Promise((resolve, reject) => {
    chargebee.subscription.list(params).request(function (
      error: any,
      result: {
        list: {
          subscription: Subscription;
          card: Card;
        }[];
      },
    ) {
      if (error) {
        reject(error);
      } else {
        const items = result.list.map(
          (listItem: any) => listItem.subscription as Subscription,
        );

        const { cf_organization_id } = filterParams;

        const filteredItems =
          items.filter(
            (item: Subscription) =>
              item.cf_organization_id === cf_organization_id,
          ) ?? [];

        resolve(filteredItems);
      }
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Subscription[] | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const { params, filterParams } = req.body as {
        params: _subscription.subscription_list_params;
        filterParams: { cf_organization_id: string };
      };

      const response = await listSubscriptions(params, filterParams);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
