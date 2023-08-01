import { AvailablePaymentMethods } from '@modules/billing';
import { styles } from './PaymentMethodForm.styles';

export const PaymentMethodFormHeader = () => {
  return (
    <div css={styles.header}>
      <h4 css={styles.headline}>CARD DETAILS</h4>
      <AvailablePaymentMethods />
    </div>
  );
};
