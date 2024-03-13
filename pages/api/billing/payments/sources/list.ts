import { _payment_source } from 'chargebee-typescript';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  params,
}: {
  params: _payment_source.payment_source_list_params;
}) => {
  const { customer_id } = params;

  if (!customer_id || Object.keys(customer_id).length === 0) {
    throw new Error('No Customer ID provided');
  }

  return chargebee.payment_source.list(params);
};

const mappingCallback = (result: {
  list: PaymentSource[];
}): PaymentSource[] => {
  const paymentSources = result.list.map(
    (listItem: any) => listItem.payment_source as PaymentSource,
  );

  return paymentSources;
};

const errorCallback = (error: any): [] | null => {
  if (error.message === 'No Customer ID provided') {
    return [];
  }

  return null;
};

const handler = createHandler<
  { params: _payment_source.payment_source_list_params },
  { list: PaymentSource[] },
  PaymentSource[]
>(requestCallback, mappingCallback, errorCallback);

export default handler;
