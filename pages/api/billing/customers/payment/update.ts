import { _customer } from 'chargebee-typescript';
import { Card, Customer } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({
  customerId,
  params,
}: {
  customerId: string;
  params: _customer.assign_payment_role_params;
}) => chargebee.customer.assign_payment_role(customerId, params);

const mappingCallback = (result: {
  customer: Customer;
  card: Card;
}): Customer => {
  const customer = result.customer as Customer;

  return customer;
};

const handler = createHandler<
  { customerId: string; params: _customer.assign_payment_role_params },
  { customer: Customer; card: Card },
  Customer
>(requestCallback, mappingCallback);

export default handler;
