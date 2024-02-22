import { Estimate } from 'chargebee-typescript/lib/resources';
import { chargebee } from 'utils/billing/chargebeeInstance';
import { createHandler } from 'utils/billing/createHandler';

const requestCallback = ({ subscriptionId }: { subscriptionId: string }) =>
  chargebee.estimate.advance_invoice_estimate(subscriptionId);

const mappingCallback = (result: { estimate: Estimate }): Estimate | null => {
  const estimate = result.estimate as Estimate;

  return estimate;
};

const handler = createHandler<
  { subscriptionId: string },
  { estimate: Estimate },
  Estimate | null
>(requestCallback, mappingCallback);

export default handler;
