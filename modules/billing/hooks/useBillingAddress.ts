import { useRecoilState, useRecoilValue } from 'recoil';
import { billingAtoms, billingSelectors } from '@modules/billing';

export const useBillingAddress = (): IBillingAddressHook => {
  const billingAddress = useRecoilValue(billingSelectors.billingAddress);
  const [customer, setCustomer] = useRecoilState(billingAtoms.customer);
  const [customerLoadingState, setCustomerLoadingState] = useRecoilState(
    billingAtoms.customerLoadingState,
  );

  const addBillingAddress = async ({
    name,
    company,
    address,
    city,
    country,
    region,
    postal,
  }: BillingAddressForm) => {
    setCustomerLoadingState('loading');

    const updatedBillingInfo = {
      first_name: name,
      line1: address,
      city,
      state: region,
      zip: postal,
      country,
      company,
    };

    const response = await fetch('/api/billing/customers/billing-info/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: customer?.id,
        billingInfo: updatedBillingInfo,
      }),
    });

    const data = await response.json();

    setCustomer(data);

    setCustomerLoadingState('finished');
  };
  const updateBillingAddress = () => {};

  return {
    billingAddress,
    billingAddressLoadingState: customerLoadingState,
    addBillingAddress,
    updateBillingAddress,
  };
};
