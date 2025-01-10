import { useRecoilState } from 'recoil';
import { protocolClient } from '@modules/grpc';
import { ProtocolServiceGetPricingRequest } from '@modules/grpc/library/blockjoy/v1/protocol';
import { Amount } from '@modules/grpc/library/blockjoy/common/v1/currency';
import { billingAtoms } from '@modules/billing';

type UsePricingHook = {
  price: Amount | null;
  priceLoadingState: LoadingState;
  getPrice: (params: ProtocolServiceGetPricingRequest) => void;
};

export const usePricing = (): UsePricingHook => {
  const [price, setPrice] = useRecoilState(billingAtoms.price);
  const [priceLoadingState, setPriceLoadingState] = useRecoilState(
    billingAtoms.priceLoadingState,
  );

  const getPrice = async (params: ProtocolServiceGetPricingRequest) => {
    try {
      setPriceLoadingState('loading');

      const { regionId, versionKey } = params;
      const isValidVersion =
        versionKey && Object.values(versionKey).every((val) => !!val);

      if (!regionId || !isValidVersion) {
        setPrice(null);
        return;
      }

      const response = await protocolClient.getPricing(params);

      setPrice(response);
    } catch (error) {
      console.log('Failed to fetch Price', error);
      setPrice(null);
    } finally {
      setPriceLoadingState('finished');
    }
  };

  return {
    price,
    priceLoadingState,

    getPrice,
  };
};
