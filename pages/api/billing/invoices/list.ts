import { NextApiRequest, NextApiResponse } from 'next';
import { _contact } from 'chargebee-typescript';
import { Customer, Contact, Invoice } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const listInvoices = async (customerData: Customer): Promise<Invoice[]> => {
  return new Promise((resolve, reject) => {
    chargebee.invoice
      .list({
        customer_id: { is: customerData.id },
        limit: 10,
        status: { in: ['paid', 'payment_due'] },
        'sort_by[asc]': 'date',
      })
      .request(function (error: any, result: { list: Invoice[] }) {
        if (error) {
          reject(error);
        } else {
          const invoices = result.list.map(
            (listItem: any) => listItem.invoice as Invoice,
          );

          resolve(invoices);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const customerData = req.body as any;
      const response = await listInvoices(customerData);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
