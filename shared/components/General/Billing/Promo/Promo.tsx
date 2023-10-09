import { FormProvider, useForm } from 'react-hook-form';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import { css } from '@emotion/react';
import { Button, Input, SvgIcon } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { styles } from './Promo.styles';
import IconDiscount from '@public/assets/icons/common/Discount.svg';
import { formatters } from '@shared/utils/formatters';
import { ItemPriceSimple, usePromoCode } from '@modules/billing';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { computePricing } from '@shared/index';

type PromoProps = {
  itemPrice: ItemPrice | ItemPriceSimple;
};

export const Promo = ({ itemPrice }: PromoProps) => {
  const form = useForm<{ promo: string }>({
    mode: 'onChange',
  });

  const {
    promoCode,
    promoCodeError,
    promoCodeLoadingState,
    getPromoCode,
    resetPromoCode,
    resetPromoCodeError,
  } = usePromoCode();

  const { handleSubmit, reset, watch } = form;

  const onSubmit = handleSubmit(async ({ promo }) => {
    const promoCode = await getPromoCode(promo);

    if (!promoCode) return;

    reset();
  });

  const handleRemove = () => {
    resetPromoCode();
    resetPromoCodeError();
  };

  const { discount, discountPercentage } = computePricing(itemPrice, promoCode);

  const promoValue = watch('promo');
  const isDisabled = !promoValue?.trim();

  return (
    <>
      <div css={styles.wrapper}>
        {promoCode ? (
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
          <div>
            <FormProvider {...form}>
              <form onSubmit={onSubmit} css={styles.form}>
                <Input
                  name="promo"
                  type="text"
                  autoFocus
                  style={{ width: '100%' }}
                  labelStyles={[display.visuallyHidden]}
                  placeholder={`Enter promo code`}
                  {...(promoCodeError && { inputStyles: [styles.invalid] })}
                />
                <Button
                  disabled={isDisabled}
                  loading={promoCodeLoadingState !== 'finished'}
                  type="submit"
                  size="medium"
                  style="basic"
                  customCss={[
                    css`
                      min-width: 125px;
                    `,
                  ]}
                >
                  Apply
                </Button>
              </form>
            </FormProvider>
            {promoCodeError && (
              <p css={[typo.smaller, colors.warning, spacing.top.small]}>
                {promoCodeError}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
