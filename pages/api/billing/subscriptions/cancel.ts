import { NextApiRequest, NextApiResponse } from 'next';
import { _subscription } from 'chargebee-typescript';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { Customer, Subscription } from 'chargebee-typescript/lib/resources';

const cancelChargebeeSubscription = async (
    subscriptionId: string,
): Promise<Subscription> => {
    return new Promise((resolve, reject) => {
        chargebee.subscription
            .cancel_for_items(subscriptionId, { end_of_term: true })
            .request(function (
                error: any,
                result: { customer: Customer; subscription: Subscription },
            ) {
                if (error) {
                    reject(error);
                } else {
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
            const subscriptionId = req.body as string;
            const response = await cancelChargebeeSubscription(subscriptionId);

            res.status(200).json(response);
        } catch (error: any) {
            res.status(error.http_status_code || 500).json(error);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
