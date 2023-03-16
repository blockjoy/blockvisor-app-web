import { useCreditCard, useCreditCardForm } from '@modules/billing';
import { Button, Input } from '@shared/index';
import { useState } from 'react';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './CreditCard.styles';

export type CreditCardProps = {
  handleCancel: VoidFunction;
};

export const CreditCard = ({ handleCancel }: CreditCardProps) => {
  const { addCard } = useCreditCard();
  const {
    form,

    cardNumberController,
    handleCardNumberChange,

    cardHolderController,
    handleCardHolderChange,

    expDateController,
    handleExpDateChange,

    cvcController,
    handleCvcChange,
  } = useCreditCardForm();

  const [loading, setLoading] = useState<any>(false);

  const onSubmit: SubmitHandler<CreditCardForm> = async ({
    cardNumber,
    cardHolder,
    expDate,
    cvc,
  }: CreditCardForm) => {
    console.log('FORM SUBMIT init CreditCard');
    setLoading(true);

    const expMonth = expDate.split('/')[0];
    const expYear = expDate.split('/')[1];

    const card = {
      cardHolder,
      cardNumber,
      expMonth: parseInt(expMonth),
      expYear: parseInt(expYear),
      cvc,
    };

    try {
      await addCard(card);
      handleCancel();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
          <ul css={[reset.list]}>
            <li css={[styles.formItem]}>
              <Input
                type="tel"
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength={19}
                label="Card number"
                placeholder="1234 1234 1234 1234"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={1}
                {...cardNumberController.field}
                ref={null}
                onChange={handleCardNumberChange}
                validationOptions={{
                  required: 'Credit Card is required',
                }}
              />
            </li>
            <li css={[styles.formItem]}>
              <Input
                type="text"
                label="Card holder"
                autoComplete="cc-name"
                placeholder="John Doe"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={2}
                {...cardHolderController.field}
                ref={null}
                onChange={handleCardHolderChange}
                validationOptions={{
                  required: 'Name is required',
                }}
              />
            </li>
            <li css={[styles.formItem, styles.formRow]}>
              <div>
                <Input
                  type="text"
                  autoComplete="cc-exp"
                  label="Expiry Date"
                  placeholder="MM / YY"
                  inputSize="medium"
                  labelStyles={[typo.base]}
                  tabIndex={3}
                  maxLength={7}
                  {...expDateController.field}
                  ref={null}
                  onChange={handleExpDateChange}
                  validationOptions={{
                    required: 'Expiration date is required',
                  }}
                />
              </div>
              <div>
                <Input
                  label="CVC"
                  placeholder="CVC"
                  inputSize="medium"
                  labelStyles={[typo.base]}
                  tabIndex={4}
                  {...cvcController.field}
                  ref={null}
                  onChange={handleCvcChange}
                  validationOptions={{
                    required: 'CVC is required',
                  }}
                />
              </div>
            </li>
          </ul>
          <div css={styles.buttons}>
            <Button
              loading={loading}
              style="secondary"
              size="small"
              type="submit"
              tabIndex={5}
            >
              Add
            </Button>
            <Button
              onClick={handleCancel}
              style="outline"
              size="small"
              tabIndex={6}
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
