import { Suspense } from 'react';
import { SvgIcon } from '@shared/components';
import { styles } from './PaymentIcon.styles';
import { getPaymentMethodIcon } from '@modules/billing';

type PaymentIconProps = {
  brand: string;
  type?: 'default' | 'outline';
  size?: string;
};

export const PaymentIcon = ({
  brand,
  type = 'default',
  size = '100%',
}: PaymentIconProps) => {
  const IconComponent = getPaymentMethodIcon(brand);

  return (
    <span css={[styles.icon, type === 'outline' && styles.iconOutline]}>
      <SvgIcon size={size}>
        <Suspense fallback={null}>{<IconComponent />}</Suspense>
      </SvgIcon>
    </span>
  );
};
