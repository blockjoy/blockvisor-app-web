import { NextApiRequest, NextApiResponse } from 'next';

import { _payment_intent } from 'chargebee-typescript';
import { chargebee } from 'utils/billing/chargebeeInstance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      // Set up Adyen
      const configuration = {
        environment: 'TEST', // or 'LIVE' for live environment
        clientKey: 'your_adyen_client_key',
      };
      const checkout = new AdyenCheckout(configuration);

      // Create a payment intent
      checkout
        .createPaymentIntent({
          amount: { value: 1099, currency: 'USD' },
          reference: 'your_payment_reference',
          returnUrl: 'https://yourwebsite.com/return-url',
        })
        .then(function (result) {
          if (result.error) {
            console.log('Error creating payment intent:', result.error.message);
          } else {
            // Get the actual payment intent ID
            const paymentIntentId = result.paymentIntent.id;
            console.log('Payment Intent ID:', paymentIntentId);

            // Use the payment intent ID to create the Chargebee payment source
            // ...
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
