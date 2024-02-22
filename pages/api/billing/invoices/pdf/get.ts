import { _contact } from 'chargebee-typescript';
import { Download } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) => chargebee.invoice.pdf(id);

const mappingCallback = (result: { download: Download }): Download | null => {
  const download = result.download as Download;

  return download;
};

const handler = createHandler<
  { id: string },
  { download: Download },
  Download | null
>(requestCallback, mappingCallback);

export default handler;
