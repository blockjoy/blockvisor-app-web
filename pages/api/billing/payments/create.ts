import { NextApiRequest, NextApiResponse } from 'next';

import { _payment_intent } from 'chargebee-typescript';
import { chargebee } from 'utils/billing/chargebeeInstance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const response = chargebee.payment_source
        .create_using_payment_intent({
          customer_id: 'dragan_test',
          payment_intent: {
            gateway_account_id: 'gw___test__5SK2lMpwSRp4Mx02v',
            gw_token: 'pi_1IVbmIJv9j0DyntJo1AUvK4o',
          },
        })
        .request(function (error: any, result: any) {
          if (error) {
            //handle error
            console.log(error);
          } else {
            console.log(`${result}`);
            var customer: typeof chargebee.customer = result.customer;
            var payment_source: typeof chargebee.payment_source =
              result.payment_source;
          }
        });
      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
