import { Suspense } from 'react';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { SvgIcon } from '@shared/components';
import { styles } from './PaymentIcon.styles';
import { getPaymentMethodIcon } from '@modules/billing';

type PaymentIconProps = {
  paymentMethod: PaymentSource;
  size?: string;
};

export const PaymentIcon = ({
  paymentMethod,
  size = '100%',
}: PaymentIconProps) => {
  const type =
    paymentMethod?.type === 'card'
      ? paymentMethod?.card?.brand
      : paymentMethod?.type;
  const IconComponent = getPaymentMethodIcon(type);

  const bg = paymentMethod?.card?.brand === 'visa' ? 'white' : 'none';

  return (
    <span css={[styles.wrapper]}>
      <SvgIcon
        size={size}
        additionalStyles={[styles.icon, styles.iconBgColor(bg)]}
      >
        <Suspense fallback={null}>{<IconComponent />}</Suspense>
      </SvgIcon>
    </span>
  );
};
