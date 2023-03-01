import { useCreditCard } from '@modules/billing/hooks/useCreditCard';
import { Button, Input } from '@shared/index';
import { FormProvider, useForm } from 'react-hook-form';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './CreditCard.styles';

export type CreditCardProps = {
  handleAdding: (isAdding: boolean) => void;
  card: CreditCardForm;
};

export const CreditCard = ({ handleAdding, card }: CreditCardProps) => {
  const form = useForm<CreditCardForm>({
    defaultValues: {
      cardnumber: card.cardnumber ?? '',
      cardholder: card.cardholder ?? '',
      expdate: card.expdate ?? '',
      cvc: card.cvc ?? '',
    },
  });

  const handleCancel = () => handleAdding(false);
  const {
    loading,
    onSubmit,

    cardNumber,
    cardNumberController,
    handleCardNumberChange,

    cardHolder,
    cardHolderController,
    handleCardHolderChange,

    expDate,
    expDateController,
    handleExpDateChange,

    cvc,
    cvcController,
    handleCvcChange,
  } = useCreditCard(form, card);

  return (
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
              tabIndex={0}
              {...cardNumberController.field}
              onChange={handleCardNumberChange}
              value={cardNumber}
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
              tabIndex={1}
              {...cardHolderController.field}
              onChange={handleCardHolderChange}
              value={cardHolder}
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
                tabIndex={2}
                maxLength={5}
                {...expDateController.field}
                onChange={handleExpDateChange}
                value={expDate}
              />
            </div>
            <div>
              <Input
                label="CVC"
                placeholder="CVC"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={3}
                {...cvcController.field}
                onChange={handleCvcChange}
                value={cvc}
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
          >
            Add
          </Button>
          <Button onClick={handleCancel} style="outline" size="small">
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
