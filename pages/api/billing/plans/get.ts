import { NextApiRequest, NextApiResponse } from 'next';
import { _item } from 'chargebee-typescript';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Item } from 'chargebee-typescript/lib/resources';

const getPlan = async (planId: string): Promise<Item> => {
  return new Promise((resolve, reject) => {
    chargebee.item
      .retrieve(planId)
      .request(function (error: any, result: { item: Item }) {
        if (error) {
          reject(error);
        } else {
          resolve(result.item);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const planData = req.body as any;
      const response = await getPlan(planData.id);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
