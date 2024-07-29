import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { Button, ButtonGroup, FormError } from '@shared/components';
import {
  usePaymentMethod,
  AvailablePayments,
  CreditCardForm,
  billingAtoms,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { containers } from 'styles/containers.styles';
import { styles } from './PaymentMethodForm.styles';

type PaymentMethodFormProps = {
  handleCancel: VoidFunction;
};

export const PaymentMethodForm = ({ handleCancel }: PaymentMethodFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const { paymentMethodLoadingState, initPaymentMethod } = usePaymentMethod();

  const isValidCard = useRecoilValue(billingAtoms.isValidCard);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidCard) return;

    try {
      await initPaymentMethod(
        () => {
          toast.success('Payment method added');
          handleCancel();
        },
        (err) => setError(err),
      );
    } catch (error: any) {
      console.log('Error while adding a payment method', error);
    }
  };

  const isLoading = paymentMethodLoadingState !== 'finished';

  return (
    <div css={containers.mediumSmall}>
      <form onSubmit={handleSubmit}>
        <div css={spacing.bottom.mediumLarge}>
          <div css={styles.header}>
            <h4 css={styles.headline}>Card details</h4>
            <AvailablePayments />
          </div>

          <CreditCardForm />
        </div>

        <ButtonGroup>
          <Button
            loading={isLoading}
            disabled={isLoading || !isValidCard}
            style="primary"
            size="small"
            type="submit"
          >
            Add
          </Button>
          <Button onClick={handleCancel} style="outline" size="small">
            Cancel
          </Button>
        </ButtonGroup>

        <FormError isVisible={Boolean(error)}>{error}</FormError>
      </form>
    </div>
  );
};
