import { NextApiRequest, NextApiResponse } from 'next';
import { ChargeBee, _item } from 'chargebee-typescript';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Item } from 'chargebee-typescript/lib/resources';

const fetchChargebeePlans = async (): Promise<Array<Item>> => {
    return new Promise((resolve, reject) => {
        chargebee
            .item
            .list()
            .request(function (
                error: any,
                result: { plans: [Item]; },
            ) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.plans);
                }
            });
    });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Array<Item> | { message: string }>,
) {
    if (req.method === 'POST') {
        try {
            const response = await fetchChargebeePlans();

            res.status(200).json(response);
        } catch (error: any) {
            res.status(error.http_status_code || 500).json(error);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
