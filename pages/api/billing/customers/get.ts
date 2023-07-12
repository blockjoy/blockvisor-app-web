import { _customer } from 'chargebee-typescript';
import { Customer } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ id }: { id: string }) =>
  chargebee.customer.retrieve(id);

const mappingCallback = (result: { customer: Customer }): Customer | null => {
  const customer = result.customer as Customer;

  return customer;
};

const handler = createHandler<
  { id: string },
  { customer: Customer },
  Customer | null
>(requestCallback, mappingCallback);

export default handler;
