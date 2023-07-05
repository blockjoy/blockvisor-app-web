import { NextApiRequest, NextApiResponse } from 'next';
import { _contact, _invoice } from 'chargebee-typescript';
import { Invoice } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const listInvoices = async (
  params: _invoice.invoice_list_params,
): Promise<{ invoices: Invoice[]; nextOffset: string | undefined }> => {
  return new Promise((resolve, reject) => {
    chargebee.invoice
      .list(params)
      .request(function (
        error: any,
        result: { list: Invoice[]; next_offset: string },
      ) {
        if (error) {
          reject(error);
        } else {
          const invoices = result.list.map(
            (listItem: any) => listItem.invoice as Invoice,
          );

          resolve({
            invoices,
            nextOffset: result.next_offset,
          });
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | { invoices: Invoice[]; nextOffset: string | undefined }
    | { message: string }
  >,
) {
  if (req.method === 'POST') {
    try {
      const params = req.body as _invoice.invoice_list_params;
      const response = await listInvoices(params);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
