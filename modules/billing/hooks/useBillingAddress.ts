import { useRecoilState } from 'recoil';
import { BILLING_ADDRESS } from '../mocks/billingAddress';
import { billingAtoms } from '@modules/billing';

export const useBillingAddress = (): IBillingAddressHook => {
  const [billingAddress, setBillingAddress] = useRecoilState(
    billingAtoms.billingAddress,
  );
  const [billingAddressLoadingState, setBillingAddressLoadingState] =
    useRecoilState(billingAtoms.billingAddressLoadingState);

  const getBillingAddress = (id: string) => {
    setBillingAddressLoadingState('initializing');

    const billingAddress: IBillingAddress = BILLING_ADDRESS;

    setBillingAddress(billingAddress);

    setBillingAddressLoadingState('finished');
  };

  const addBillingAddress = async ({
    name,
    company,
    address,
    city,
    country,
    region,
    postal,
    vat,
  }: BillingAddressForm) => {
    await new Promise((r) => setTimeout(r, 600));

    const newBillingAddress = {
      ...BILLING_ADDRESS,
      name,
      line1: address,
      city,
      state: region,
      postal_code: postal,
      country,
      company,
      vat,
    };

    console.log('BILLING ADDRESS [addBillingAddress]', newBillingAddress);
    setBillingAddress(newBillingAddress);
  };
  const updateBillingAddress = () => {};

  return {
    billingAddress,
    billingAddressLoadingState,

    getBillingAddress,
    addBillingAddress,
    updateBillingAddress,
  };
};
