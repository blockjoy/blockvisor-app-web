import { useRecoilState } from 'recoil';
import { blockchainClient } from '@modules/grpc';
import { BlockchainServicePricingRequest } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Amount } from '@modules/grpc/library/blockjoy/common/v1/currency';
import { billingAtoms } from '@modules/billing';

type UsePricingHook = {
  price: Amount | null;
  priceLoadingState: LoadingState;
  getPrice: ({
    blockchainId,
    network,
    nodeType,
    region,
    version,
  }: BlockchainServicePricingRequest) => void;
};

export const usePricing = (): UsePricingHook => {
  const [price, setPrice] = useRecoilState(billingAtoms.price);
  const [priceLoadingState, setPriceLoadingState] = useRecoilState(
    billingAtoms.priceLoadingState,
  );

  const getPrice = async (params: BlockchainServicePricingRequest) => {
    try {
      setPriceLoadingState('loading');

      const isValidParams = Object.values(params).every((val) => !!val);

      if (!isValidParams) {
        setPrice(null);
        return;
      }

      const response = await blockchainClient.getPricing(params);

      setPrice(response);
    } catch (error) {
      console.error('Failed to fetch Price', error);
      setPrice(null);
    } finally {
      console.log('completed after return;');
      setPriceLoadingState('finished');
    }
  };

  return {
    price,
    priceLoadingState,

    getPrice,
  };
};
