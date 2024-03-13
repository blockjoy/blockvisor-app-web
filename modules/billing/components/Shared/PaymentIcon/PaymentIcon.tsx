import { Suspense } from 'react';
import { SvgIcon } from '@shared/components';
import { styles } from './PaymentIcon.styles';
import { getPaymentMethodIcon } from '@modules/billing';

type PaymentIconProps = {
  brand: string;
  size?: string;
};

export const PaymentIcon = ({ brand, size = '100%' }: PaymentIconProps) => {
  const IconComponent = getPaymentMethodIcon(brand);
  const bg = brand === 'visa' ? 'white' : 'none';

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
