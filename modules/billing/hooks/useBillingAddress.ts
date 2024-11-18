import { useRecoilState, useRecoilValue } from 'recoil';
import { Address } from '@modules/grpc/library/blockjoy/common/v1/address';
import { billingAtoms } from '@modules/billing';
import { organizationClient } from '@modules/grpc';
import { organizationSelectors } from '@modules/organization';

export const useBillingAddress = () => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const [billingAddress, setBillingAddress] = useRecoilState(
    billingAtoms.billingAddress,
  );
  const [billingAddressLoadingState, setBillingAddressLoadingState] =
    useRecoilState(billingAtoms.billingAddressLoadingState);

  const getBillingAddress = async () => {
    setBillingAddressLoadingState('initializing');

    try {
      const data = await organizationClient.getBillingAddress(
        defaultOrganization?.orgId!,
      );

      setBillingAddress(data);

      console.log('%cGetBillingAddress', 'color: #bff589', data);
    } catch (error) {
      setBillingAddress(null);
      console.log('Failed to get billing address', error);
    } finally {
      setBillingAddressLoadingState('finished');
    }
  };

  const createBillingAddress = async (
    address: Address,
    onSuccess?: VoidFunction,
    onError?: (errorMessage: string) => void,
  ) => {
    setBillingAddressLoadingState('loading');
    try {
      await organizationClient.createBillingAddress(
        defaultOrganization?.orgId!,
        address,
      );

      setBillingAddress(address);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create billing address', error);
      onError?.(
        `Error ${
          billingAddress ? 'updating' : 'creating'
        } an address, an unknown error occurred`,
      );
    } finally {
      setBillingAddressLoadingState('finished');
    }
  };

  return {
    billingAddress,
    billingAddressLoadingState,

    getBillingAddress,
    createBillingAddress,
  };
};
