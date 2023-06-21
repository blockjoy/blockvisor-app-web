import { NextApiRequest, NextApiResponse } from 'next';
import { _contact } from 'chargebee-typescript';
import { Download } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';

const getInvoice = async (id: string): Promise<Download> => {
  return new Promise((resolve, reject) => {
    chargebee.invoice
      .pdf(id)
      .request(function (error: any, result: { download: Download }) {
        if (error) {
          reject(error);
        } else {
          resolve(result.download);
        }
      });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Download | { message: string }>,
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.body as { id: string };
      const response = await getInvoice(id);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.http_status_code || 500).json(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
