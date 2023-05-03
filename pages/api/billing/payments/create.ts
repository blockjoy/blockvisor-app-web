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
          customer_id: 'Azz5cITcL8g3NasS',
          // payment_intent: {
          //   id: 'gw_AzZiy6TcWKGpzJHc',
          // },
          payment_intent: {
            gateway_account_id: 'gw_AzZiy6TcWrETcfCo',
            gw_token:
              '01013C8667F12882CC62104BC349BF9F7439A9FDD56A87420E9860577C1BD27DB88A2B6992C8751BEC6E1F124221DD6E5A7E52175BD209E70804357DFECA9710C15D5B0DBEE47CDCB5588C48224C6007',
          },
        })
        // .create_using_temp_token({
        //   customer_id: 'Azz5cITcL8g3NasS',
        //   type: 'card',
        //   gateway_account_id: 'gw_AzZn81TZOcQ9ZYev',
        //   tmp_token: 'pi_1IVbmIJv9j0DyntJo1AUvK4o',
        // })
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
