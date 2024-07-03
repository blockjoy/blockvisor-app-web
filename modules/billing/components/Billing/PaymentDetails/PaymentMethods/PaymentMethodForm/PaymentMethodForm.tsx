import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { Button, ButtonGroup } from '@shared/components';
import {
  billingAtoms,
  billingSelectors,
  usePaymentMethod,
  AvailablePayments,
  CreditCardForm,
  BillingDetailsForm,
} from '@modules/billing';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { colors } from 'styles/utils.colors.styles';
import { containers } from 'styles/containers.styles';
import { styles } from './PaymentMethodForm.styles';

type PaymentMethodFormProps = {
  handleCancel: VoidFunction;
};

export const PaymentMethodForm = ({ handleCancel }: PaymentMethodFormProps) => {
  const billingDetails = useRecoilValue(billingSelectors.billingDetails);
  const isValidCardForm = useRecoilValue(billingSelectors.isValidCardForm);
  const [error, setError] = useRecoilState(billingAtoms.paymentMethodError);

  const { paymentMethodLoadingState, initPaymentMethod } = usePaymentMethod();

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      await initPaymentMethod(billingDetails, () => {
        toast.success('Payment method added');
        handleCancel();
      });
    } catch (error: any) {
      console.log('Error while adding a payment method', error);
    }
  };

  const errorMessage = error
    ? 'Something went wrong. Please update you credit card details and try again'
    : null;
  const isLoading = paymentMethodLoadingState !== 'finished';

  return (
    <div css={containers.mediumSmall}>
      <form>
        <div css={spacing.bottom.mediumLarge}>
          <div css={styles.header}>
            <h4 css={styles.headline}>Card details</h4>
            <AvailablePayments />
          </div>

          <CreditCardForm />
        </div>

        <div css={spacing.bottom.mediumLarge}>
          <div css={styles.header}>
            <h4 css={styles.headline}>Billing Details</h4>
          </div>

          <BillingDetailsForm />
        </div>

        {errorMessage && (
          <p
            css={[
              typo.smaller,
              colors.warning,
              spacing.top.medium,
              spacing.bottom.medium,
            ]}
          >
            {errorMessage}
          </p>
        )}
        <ButtonGroup>
          <Button
            loading={isLoading}
            disabled={
              paymentMethodLoadingState !== 'finished' || !isValidCardForm
            }
            style="primary"
            size="small"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Button onClick={handleCancel} style="outline" size="small">
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};
