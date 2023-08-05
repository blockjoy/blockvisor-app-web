import { styles } from './AvailablePayments.styles';
import { AVAILABLE_PAYMENT_METHODS, PaymentIcon } from '@modules/billing';

export const AvailablePayments = () => {
  return (
    <div css={styles.wrapper}>
      {AVAILABLE_PAYMENT_METHODS.map((pm: AvailablePaymentMethod) => (
        <PaymentIcon key={pm.id} brand={pm.id} type="outline" />
      ))}
    </div>
  );
};
