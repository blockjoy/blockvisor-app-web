import { useCreditCard } from '@modules/billing';
import { Button, Input } from '@shared/index';
import { FormProvider } from 'react-hook-form';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './CreditCard.styles';

export type CreditCardProps = {
  handleAdding: (isAdding: boolean) => void;
  card: CreditCardForm;
};

export const CreditCard = ({ handleAdding, card }: CreditCardProps) => {
  const handleCancel = () => handleAdding(false);

  const {
    loading,
    form,

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
  } = useCreditCard(card);

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
              tabIndex={1}
              {...cardNumberController.field}
              onChange={handleCardNumberChange}
              value={cardNumber}
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
              onChange={handleCardHolderChange}
              value={cardHolder}
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
                onChange={handleExpDateChange}
                value={expDate}
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
                onChange={handleCvcChange}
                value={cvc}
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
  );
};
