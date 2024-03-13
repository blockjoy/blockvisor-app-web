import { _customer } from 'chargebee-typescript';
import { Card, Customer } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  customerId,
  params,
}: {
  customerId: string;
  params: _customer.update_billing_info_params;
}) => chargebee.customer.update_billing_info(customerId, params);

const mappingCallback = (result: {
  customer: Customer;
  card: Card;
}): Customer => {
  return result.customer;
};

const handler = createHandler<
  { customerId: string; params: _customer.update_billing_info_params },
  { customer: Customer; card: Card },
  Customer
>(requestCallback, mappingCallback);

export default handler;
