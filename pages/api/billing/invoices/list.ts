import { _contact, _invoice } from 'chargebee-typescript';
import { Invoice } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  params,
}: {
  params: _invoice.invoice_list_params;
}) => {
  const { subscription_id } = params;

  if (!subscription_id || Object.keys(subscription_id).length === 0) {
    throw new Error('No Subscription ID provided');
  }

  return chargebee.invoice.list(params);
};

const mappingCallback = (result: {
  list: Invoice[];
  next_offset: string;
}): { invoices: Invoice[]; nextOffset: string | undefined } => {
  const invoices = result.list.map(
    (listItem: any) => listItem.invoice as Invoice,
  );

  return {
    invoices,
    nextOffset: result.next_offset,
  };
};

const errorCallback = (
  error: any,
): { invoices: []; nextOffset: undefined } | null => {
  if (error.message === 'No Subscription ID provided') {
    return { invoices: [], nextOffset: undefined };
  }

  return null;
};

const handler = createHandler<
  { params: _invoice.invoice_list_params },
  { list: Invoice[]; next_offset: string },
  { invoices: Invoice[]; nextOffset: string | undefined }
>(requestCallback, mappingCallback, errorCallback);

export default handler;
