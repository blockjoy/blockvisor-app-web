import { useRecoilState, useRecoilValue } from 'recoil';
import { _customer } from 'chargebee-typescript';
import { Customer } from 'chargebee-typescript/lib/resources';
import { BillingAddress } from 'chargebee-typescript/lib/resources/customer';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  fetchBilling,
} from '@modules/billing';

interface IBillingAddressHook {
  billingAddress: BillingAddress | null;
  billingAddressLoadingState: LoadingState;
  addBillingAddress: (customerId: string, card: BillingAddressForm) => void;
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

      const data = await fetchBilling(
        BILLING_API_ROUTES.customer.billingInfo.update,
        {
          customerId: customer?.id ? customer.id : customerId,
          params,
        },
      );

      setCustomer(data);
    } catch (error) {
      console.error('Failed to create billing address', error);
    } finally {
      setCustomerLoadingState('finished');
    }
  };

  return {
    billingAddress,
    billingAddressLoadingState: customerLoadingState,
    addBillingAddress,
  };
};
