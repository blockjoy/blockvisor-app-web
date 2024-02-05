import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import {
  ItemPriceSimple,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { styles } from './Pricing.styles';
import { formatters } from '@shared/index';
import { Promo, Skeleton } from '@shared/components';
import { blockchainAtoms, nodeAtoms } from '@modules/node';

type PricingProps = {
  itemPrice: ItemPrice | ItemPriceSimple | null;
};

export const Pricing = ({ itemPrice }: PricingProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const blockchainsLoadingState = useRecoilValue(
    blockchainAtoms.blockchainsLoadingState,
  );
  const allRegionsLoadingState = useRecoilValue(
    nodeAtoms.allRegionsLoadingState,
  );
  const pricing = useRecoilValue(billingSelectors.pricing);
  const promoCode = useRecoilValue(billingAtoms.promoCode);
  const setPromoCodeError = useSetRecoilState(billingAtoms.promoCodeError);

  const [isOpenPromo, setIsOpenPromo] = useState(Boolean(promoCode));

  useEffect(() => {
    return () => setPromoCodeError(null);
  }, []);

  const togglePromo = () => setIsOpenPromo(!isOpenPromo);

  const { total, subtotal } = pricing;

  const isLoading =
    blockchainsLoadingState !== 'finished' ||
    allRegionsLoadingState !== 'finished';

  return (
    <>
      <div css={[styles.wrapper, !itemPrice ? styles.disabled : null]}>
        {isLoading ? (
          <Skeleton width="120px" height="25px" />
        ) : (
          <div css={styles.priceWrapper}>
            {total !== subtotal && (
              <span css={styles.priceSubtotal}>
                {formatters.formatCurrency(subtotal)}
              </span>
            )}
            <span css={styles.priceTotal}>
              {formatters.formatCurrency(total)}
            </span>
            <span css={styles.priceLabel}>
              {`/ ${
                promoCode?.coupon?.duration_type === 'one_time' ? 'first ' : ''
              }${subscription?.billing_period_unit ?? 'month'}`}
            </span>
          </div>
        )}

        {isLoading ? (
          <Skeleton width="82px" height="25px" />
        ) : (
          <a onClick={togglePromo} css={styles.promo}>
            Having a promo code?
          </a>
        )}
      </div>
      {isOpenPromo && itemPrice ? <Promo /> : null}
    </>
  );
};
