import { useRecoilState, useRecoilValue } from 'recoil';
import { Customer } from 'chargebee-typescript/lib/resources';
import { BillingAddress } from 'chargebee-typescript/lib/resources/customer';
import { _customer } from 'chargebee-typescript';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';

interface IBillingAddressHook {
  billingAddress: BillingAddress | null;
  billingAddressLoadingState: LoadingState;
  addBillingAddress: (customerId: string, card: BillingAddressForm) => void;
  updateBillingAddress: VoidFunction;
}

export const useBillingAddress = (): IBillingAddressHook => {
  const billingAddress = useRecoilValue(billingSelectors.billingAddress);
  const [customer, setCustomer] = useRecoilState(billingSelectors.customer);
  const [customerLoadingState, setCustomerLoadingState] = useRecoilState(
    billingAtoms.customerLoadingState,
  );

  const addBillingAddress = async (
    customerId: string,
    {
      firstName,
      lastName,
      company,
      address,
      city,
      country,
      region,
      postal,
    }: BillingAddressForm,
  ) => {
    setCustomerLoadingState('loading');

    try {
      const updatedBillingInfo: _customer.billing_address_update_billing_info_params =
        {
          first_name: firstName,
          last_name: lastName,
          line1: address,
          city,
          state: region,
          zip: postal,
          country,
          company,
        };

      const params: _customer.update_billing_info_params = {
        billing_address: updatedBillingInfo,
      };

      const response = await fetch(
        BILLING_API_ROUTES.customer.billingInfo.update,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: customer?.id ? customer.id : customerId,
            params,
          }),
        },
      );

      const data: Customer = await response.json();

      setCustomer(data);
    } catch (error) {
      console.error('Failed to create billing address', error);
    } finally {
      setCustomerLoadingState('finished');
    }
  };
  const updateBillingAddress = () => {};

  return {
    billingAddress,
    billingAddressLoadingState: customerLoadingState,
    addBillingAddress,
    updateBillingAddress,
  };
};
