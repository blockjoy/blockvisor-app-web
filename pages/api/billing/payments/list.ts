import { NextApiRequest, NextApiResponse } from 'next';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { _payment_intent } from 'chargebee-typescript';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const {
      query: { customerId },
    } = req;

    console.log('customerID', customerId);
    try {
      chargebee.payment_source
        .list({ customer_id: customerId as any })
        .request(function (error: any, result: any) {
          if (error) {
            //handle error
            console.log(error);
            res.status(error.http_status_code || 500).json(error);
          } else {
            console.log('result', result);
            const paymentSources = result.list.map(
              (item: any) => item.payment_source,
            );
            res.status(200).json(paymentSources);
          }
        });
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
