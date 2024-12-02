import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { styles } from './Pricing.styles';
import { formatters } from '@shared/index';
import { Promo, Skeleton } from '@shared/components';
import { protocolAtoms, nodeAtoms } from '@modules/node';

export const Pricing = () => {
  const subscription = useRecoilValue(billingAtoms.subscription);
  const blockchainsLoadingState = useRecoilValue(
    protocolAtoms.protocolsLoadingState,
  );
  const regionsLoadingState = useRecoilValue(nodeAtoms.regionsLoadingState);
  const promoCode = useRecoilValue(billingAtoms.promoCode);
  const setPromoCodeError = useSetRecoilState(billingAtoms.promoCodeError);

  const [isOpenPromo, setIsOpenPromo] = useState(Boolean(promoCode));

  useEffect(() => {
    return () => setPromoCodeError(null);
  }, []);

  const togglePromo = () => setIsOpenPromo(!isOpenPromo);

  const price = useRecoilValue(billingAtoms.price);

  const pricing: any = { total: 0, subtotal: 0 };

  const { total, subtotal } = pricing;

  const isLoading =
    blockchainsLoadingState !== 'finished' ||
    regionsLoadingState !== 'finished';

  const isDisabled = false;

  return (
    <>
      <div css={[styles.wrapper, isDisabled ? styles.disabled : null]}>
        {isLoading ? (
          <Skeleton width="120px" height="25px" />
        ) : (
          <div css={styles.priceWrapper}>
            {/* {total !== subtotal && (
              <span css={styles.priceSubtotal}>
                {formatters.formatCurrency(subtotal)}
              </span>
            )} */}
            <span css={styles.priceTotal}>
              {formatters.formatCurrency(price?.amountMinorUnits!)}
            </span>
            <span css={styles.priceLabel}>
              {/* {`/ ${
                promoCode?.coupon?.duration_type === 'one_time' ? 'first ' : ''
              }month`} */}
              / month
            </span>
          </div>
        )}

        {/* {isLoading ? (
          <Skeleton width="82px" height="25px" />
        ) : (
          <a onClick={togglePromo} css={styles.promo}>
            Have a promo code?
          </a>
        )} */}
      </div>
      {isOpenPromo ? <Promo /> : null}
    </>
  );
};
