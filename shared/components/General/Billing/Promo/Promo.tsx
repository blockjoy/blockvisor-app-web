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
  const regionsLoadingState = useRecoilValue(nodeAtoms.regionsLoadingState);
  const blockchainsLoadingState = useRecoilValue(
    blockchainAtoms.blockchainsLoadingState,
  );
  const [promoCode, setPromoCode] = useRecoilState(billingAtoms.promoCode);
  const setPromoCodeError = useSetRecoilState(billingAtoms.promoCodeError);
  const pricing = useRecoilValue(billingSelectors.pricing);

  const handleRemove = () => {
    setPromoCode(null);
    setPromoCodeError(null);
  };

  const { discount, discountPercentage } = pricing;

  const isLoading =
    regionsLoadingState !== 'finished' ||
    blockchainsLoadingState !== 'finished';

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
