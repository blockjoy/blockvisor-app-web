import { styles } from './AvailablePayments.styles';
import {
  AVAILABLE_PAYMENT_METHODS,
  AvailablePayment,
  getPaymentMethodIcon,
} from '@modules/billing';

export const AvailablePayments = () => {
  return (
    <div css={styles.wrapper}>
      {AVAILABLE_PAYMENT_METHODS.map((pm: AvailablePaymentMethod) => {
        const IconComponent = getPaymentMethodIcon(pm.id);

        return (
          <AvailablePayment key={pm.id} type="outline" icon={IconComponent} />
        );
      })}
    </div>
  );
};
