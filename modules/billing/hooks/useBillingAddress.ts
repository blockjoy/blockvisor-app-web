import { useRecoilState, useRecoilValue } from 'recoil';
import { billingAtoms, billingSelectors } from '@modules/billing';

interface IBillingAddressHook {
  billingAddress: any;
  billingAddressLoadingState: LoadingState;
  addBillingAddress: (billingAddress: BillingAddressForm) => Promise<void>;
}

export const useBillingAddress = (): IBillingAddressHook => {
  const billingAddress = useRecoilValue(billingSelectors.billingAddress);

  const [customer, setCustomer] = useRecoilState(billingSelectors.customer);
  const [customerLoadingState, setCustomerLoadingState] = useRecoilState(
    billingAtoms.customerLoadingState,
  );

  const addBillingAddress = async (billingAddress: BillingAddressForm) => {
    setCustomerLoadingState('loading');
    try {
      const {
        firstName,
        lastName,
        company,
        address,
        city,
        country,
        region,
        postal,
      } = billingAddress;

      const data: any = null;

      setCustomer(data);
      console.log('%cAddBillingAddress', 'color: #bff589', {
        billingAddress,
        data,
      });
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
