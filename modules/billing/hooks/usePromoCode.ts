import { useRecoilState, useRecoilValue } from 'recoil';
import { _customer } from 'chargebee-typescript';
import { Coupon, CouponCode } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  PROMO_CODE_ERROR_MESSAGES,
  PromoCode,
  billingAtoms,
  billingSelectors,
  fetchBilling,
  isAppliedPromoCode,
} from '@modules/billing';

interface IPromoCodeHook {
  promoCode: PromoCode | null;
  promoCodeError: string | null;
  promoCodeLoadingState: LoadingState;
  getPromoCode: (id: string) => Promise<PromoCode | null>;
  resetPromoCode: VoidFunction;
  resetPromoCodeError: VoidFunction;
}

export const usePromoCode = (): IPromoCodeHook => {
  const subscription = useRecoilValue(billingSelectors.subscription);
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
      const isRedeemed = isAppliedPromoCode(subscription, id);
      if (isRedeemed) {
        setPromoCodeError(PROMO_CODE_ERROR_MESSAGES.INVALID);
        return null;
      }

      const couponCode: CouponCode | null = await fetchBilling(
        BILLING_API_ROUTES.coupons.code.get,
        { id },
      );

      const coupon: Coupon | null = await fetchBilling(
        BILLING_API_ROUTES.coupons.get,
        {
          id: couponCode ? couponCode.coupon_id : id,
        },
      );

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

      const promoCodeData: PromoCode | null = coupon
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
