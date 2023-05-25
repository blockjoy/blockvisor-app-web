import { NextApiRequest, NextApiResponse } from 'next';
import { _item, _item_price } from 'chargebee-typescript';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { ItemPrice, Item } from 'chargebee-typescript/lib/resources';

const listPrices = async (
  params: _item_price.item_price_list_params,
): Promise<ItemPrice[]> => {
  return new Promise((resolve, reject) => {
    chargebee.item_price
      .list(params)
      .request(function (error: any, result: { list: ItemPrice[] }) {
        if (error) {
          reject(error);
        } else {
          const itemPrices = result.list.map(
            (listItem: any) => listItem.item_price as ItemPrice,
          );
          resolve(itemPrices);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemPrice[] | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const params = req.body as _item_price.item_price_list_params;

      const response = await listPrices(params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
