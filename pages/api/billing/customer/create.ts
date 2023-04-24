import { NextApiRequest, NextApiResponse } from 'next';
import { ChargeBee, _customer, } from 'chargebee-typescript';
import { Customer, Card } from 'chargebee-typescript/lib/resources';
import { CustomerData } from '../types';

let chargebee = new ChargeBee();

chargebee.configure({
  site: process.env.CHARGEBEE_SITE,
  api_key: process.env.CHARGEBEE_API_KEY,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    customerData: CustomerData,
) {
  if (req.method === 'POST') {
    try {
      const response = await chargebee.customer.create(customerData)
          .request(
              function(error: any, result: { customer: Customer; card: Card; }) {
              if(error){
                //handle error
                console.log(error);
              } else{
                console.log(`${result}`);
              }
            });

            console.log("chargebee response: ", response);
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
