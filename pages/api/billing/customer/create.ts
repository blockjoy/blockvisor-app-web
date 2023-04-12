import type { NextApiRequest, NextApiResponse } from 'next';

const CHARGEBEE_API_KEY = 'your_chargebee_api_key';
const CHARGEBEE_SITE = 'your_chargebee_site';
const CHARGEBEE_API_BASE_URL = `https://${CHARGEBEE_SITE}.chargebee.com/api/v2`;

interface CustomerData {
  email: string;
  first_name: string;
  last_name: string;
}

interface ChargebeeCustomer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

async function createChargebeeCustomer(
  customerData: CustomerData,
): Promise<ChargebeeCustomer> {
  const authString = Buffer.from(`${CHARGEBEE_API_KEY}:`).toString('base64');

  try {
    const response = await fetch(`${CHARGEBEE_API_BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error('Error creating Chargebee customer');
    }

    const data = await response.json();
    return data.customer;
  } catch (error) {
    console.error('Error creating Chargebee customer:', error);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChargebeeCustomer | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const customerData = req.body as CustomerData;
      const chargebeeCustomer = await createChargebeeCustomer(customerData);

      res.status(200).json(chargebeeCustomer);
    } catch (error) {
      res.status(500).json({ message: 'Error creating Chargebee customer' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
