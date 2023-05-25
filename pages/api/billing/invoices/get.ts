import { NextApiRequest, NextApiResponse } from 'next';
import { _contact } from 'chargebee-typescript';
import { Invoice } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const getInvoice = async (invoiceId: string): Promise<Invoice> => {
  return new Promise((resolve, reject) => {
    chargebee.invoice
      .retrieve(invoiceId)
      .request(function (error: any, result: { invoice: Invoice }) {
        if (error) {
          reject(error);
        } else {
          resolve(result.invoice);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Invoice | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const invoiceData = req.body as any;
      const response = await getInvoice(invoiceData.id);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
