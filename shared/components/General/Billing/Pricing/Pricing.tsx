import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import {
  ItemPriceSimple,
  billingSelectors,
  usePromoCode,
} from '@modules/billing';
import { styles } from './Pricing.styles';
import { computePricing, formatters } from '@shared/index';
import { Promo } from '@shared/components';

type PricingProps = {
  itemPrice: ItemPrice | ItemPriceSimple | null;
};

export const Pricing = ({ itemPrice }: PricingProps) => {
  const { promoCode, resetPromoCodeError } = usePromoCode();
  const subscription = useRecoilValue(billingSelectors.subscription);

  const [isOpenPromo, setIsOpenPromo] = useState<boolean>(Boolean(promoCode));

  useEffect(() => {
    return () => resetPromoCodeError();
  }, []);

  const togglePromo = () => setIsOpenPromo(!isOpenPromo);

  if (!itemPrice) return null;

  const { total, subtotal } = computePricing(itemPrice, promoCode);

  return (
    <>
      <div css={styles.wrapper}>
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

        <a onClick={togglePromo} css={styles.promo}>
          Having a promo code?
        </a>
      </div>
      {isOpenPromo && <Promo itemPrice={itemPrice} />}
    </>
  );
};
