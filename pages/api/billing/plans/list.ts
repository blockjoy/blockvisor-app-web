import { NextApiRequest, NextApiResponse } from 'next';
import { _item } from 'chargebee-typescript';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Item } from 'chargebee-typescript/lib/resources';

const listChargebeePlans = async (): Promise<Item[]> => {
  return new Promise((resolve, reject) => {
    chargebee.item
      .list({ item_family_id: { is: 'blockjoy-node-plans' } })
      .request(function (error: any, result: { list: Item[] }) {
        if (error) {
          reject(error);
        } else {
          const plans = result.list.map(
            (listItem: any) => listItem.item as Item,
          );
          resolve(plans);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[] | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const response = await listChargebeePlans();

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
