import { FormProvider, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { styles } from './Promo.styles';
import { usePromoCode } from '@modules/billing';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';

export const PromoForm = () => {
  const form = useForm<{ promo: string }>({
    mode: 'onChange',
  });

  const { promoCodeError, promoCodeLoadingState, getPromoCode } =
    usePromoCode();

  const { handleSubmit, reset, watch } = form;

  const onSubmit = handleSubmit(async ({ promo }) => {
    const promoCode = await getPromoCode(promo);

    if (!promoCode) return;

    reset();
  });

  const promoValue = watch('promo');
  const isDisabled = !promoValue?.trim();

  return (
    <>
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
    </>
  );
};
