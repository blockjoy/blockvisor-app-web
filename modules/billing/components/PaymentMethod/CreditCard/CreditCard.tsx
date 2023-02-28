import { ApplicationError } from '@modules/auth/utils/Errors';
import { Button, Input } from '@shared/index';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './CreditCard.styles';

export type CreditCardForm = {
  cardnumber: string;
  cardholder: string;
  expdate: string;
  cvc: string;
};

export type CreditCardProps = {
  handleAdding: (isAdding: boolean) => void;
  card: CreditCardForm;
};

export const CreditCard = ({ handleAdding, card }: CreditCardProps) => {
  const form = useForm<any>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setValue('cardnumber', card.cardnumber ?? '');
    form.setValue('cardholder', card.cardholder ?? '');
    form.setValue('expdate', card.expdate ?? '');
    form.setValue('cvc', card.cvc ?? '');
  }, []);

  const onSubmit: SubmitHandler<CreditCardForm> = async ({
    cardnumber,
    cardholder,
    expdate,
    cvc,
  }: CreditCardForm) => {
    console.log('FORM SUBMIT', cardnumber, cardholder, expdate, cvc);
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof ApplicationError) toast.error(error.message);
    }
  };
  const handleCancel = () => {
    handleAdding(false);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
        <ul css={[reset.list]}>
          <li css={[styles.formItem]}>
            <Input
              name="cardnumber"
              label="Card number"
              placeholder="1234 1234 1234 1234"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={0}
              value={card.cardnumber}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="cardholder"
              label="Card holder"
              placeholder="John Doe"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={1}
              value={card.cardholder}
            />
          </li>
          <li css={[styles.formItem, styles.formRow]}>
            <div>
              <Input
                name="expdate"
                label="Expiry Date"
                placeholder="MM / YY"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={2}
                value={card.expdate}
              />
            </div>
            <div>
              <Input
                name="cvc"
                label="CVC"
                placeholder="CVC"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={3}
                value={card.cvc}
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
