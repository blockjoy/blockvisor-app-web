import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { SvgIcon } from '@shared/components';
import { styles } from './Promo.styles';
import IconDiscount from '@public/assets/icons/common/Discount.svg';
import { formatters } from '@shared/utils/formatters';
import { billingAtoms, billingSelectors } from '@modules/billing';
import { Skeleton } from '@shared/components';
import { blockchainAtoms, nodeAtoms } from '@modules/node';
import { PromoForm } from './PromoForm';

export const Promo = () => {
  const blockchainsLoadingState = useRecoilValue(
    blockchainAtoms.blockchainsLoadingState,
  );
  const allRegionsLoadingState = useRecoilValue(
    nodeAtoms.allRegionsLoadingState,
  );
  const [promoCode, setPromoCode] = useRecoilState(billingAtoms.promoCode);
  const setPromoCodeError = useSetRecoilState(billingAtoms.promoCodeError);

  const handleRemove = () => {
    setPromoCode(null);
    setPromoCodeError(null);
  };

  const pricing: any = { discount: 0, discountPercentage: 0 };

  const { discount, discountPercentage } = pricing;

  const isLoading =
    blockchainsLoadingState !== 'finished' ||
    allRegionsLoadingState !== 'finished';

  return (
    <>
      <div css={styles.wrapper}>
        {isLoading ? (
          <Skeleton width="100%" height="57px" />
        ) : promoCode ? (
          <div css={styles.promoWrapper}>
            <div>
              <SvgIcon size="24px" additionalStyles={[styles.icon]}>
                <IconDiscount />
              </SvgIcon>
            </div>
            <div>
              <p css={styles.promoCode}>
                <span>
                  {promoCode?.couponCode?.code || promoCode.coupon?.id}
                </span>
              </p>
              <p css={styles.promoInfo}>
                -{formatters.formatCurrency(discount)}{' '}
                {discountPercentage &&
                  `(${discountPercentage}% Off${
                    promoCode?.coupon?.duration_type === 'one_time'
                      ? ' First Month'
                      : ''
                  })`}
              </p>
            </div>
            <a onClick={handleRemove} css={[styles.promoBtn]}>
              Remove
            </a>
          </div>
        ) : (
          <PromoForm />
        )}
      </div>
    </>
  );
};
