import { useRecoilState, useRecoilValue } from 'recoil';
import {
  PROMO_CODE_ERROR_MESSAGES,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { nodeAtoms } from '@modules/node';

interface IPromoCodeHook {
  promoCode: any | null;
  promoCodeError: string | null;
  promoCodeLoadingState: LoadingState;
  getPromoCode: (id: string) => Promise<any | null>;
  resetPromoCode: VoidFunction;
  resetPromoCodeError: VoidFunction;
}

export const usePromoCode = (): IPromoCodeHook => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const sku = useRecoilValue(nodeAtoms.selectedSKU);
  const [promoCode, setPromoCode] = useRecoilState(billingAtoms.promoCode);
  const [promoCodeError, setPromoCodeError] = useRecoilState(
    billingAtoms.promoCodeError,
  );
  const [promoCodeLoadingState, setPromoCodeLoadingState] = useRecoilState(
    billingAtoms.promoCodeLoadingState,
  );

  const getPromoCode = async (id: string) => {
    setPromoCodeLoadingState('initializing');
    setPromoCodeError(null);

    try {
      const isRedeemed = false;
      if (isRedeemed) {
        setPromoCodeError(PROMO_CODE_ERROR_MESSAGES.INVALID);
        return null;
      }

      const couponCode: any = null;

      const coupon: any = null;

      if (!coupon) {
        setPromoCodeError(PROMO_CODE_ERROR_MESSAGES.INVALID);
        return null;
      }

      if (coupon?.status !== 'active') {
        setPromoCodeError(PROMO_CODE_ERROR_MESSAGES.EXPIRED);
        return null;
      }

      if (couponCode?.status === 'redeemed') {
        setPromoCodeError(PROMO_CODE_ERROR_MESSAGES.INVALID);
        return null;
      }

      const isApplicable = false;
      if (!isApplicable) {
        setPromoCodeError(PROMO_CODE_ERROR_MESSAGES.INVALID);
        return null;
      }

      const promoCodeData: any = coupon
        ? {
            coupon,
            couponCode,
          }
        : null;

      setPromoCode(promoCodeData);

      return promoCodeData;
    } catch (error: any) {
      console.error('Error fetching promo code:', error);

      setPromoCodeError(PROMO_CODE_ERROR_MESSAGES.UNEXPECTED);
      setPromoCode(null);

      return null;
    } finally {
      setPromoCodeLoadingState('finished');
    }
  };

  const resetPromoCode = () => {
    setPromoCode(null);
    setPromoCodeError(null);
  };

  const resetPromoCodeError = () => setPromoCodeError(null);

  return {
    promoCode,
    promoCodeError,
    promoCodeLoadingState,

    getPromoCode,

    resetPromoCode,
    resetPromoCodeError,
  };
};
