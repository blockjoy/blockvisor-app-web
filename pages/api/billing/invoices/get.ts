import { _contact } from 'chargebee-typescript';
import { Invoice } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) =>
  chargebee.invoice.retrieve(id);

const mappingCallback = (result: { invoice: Invoice }): Invoice | null => {
  const invoice = result.invoice as Invoice;

  return invoice;
};

const handler = createHandler<
  { id: string },
  { invoice: Invoice },
  Invoice | null
>(requestCallback, mappingCallback);

export default handler;
