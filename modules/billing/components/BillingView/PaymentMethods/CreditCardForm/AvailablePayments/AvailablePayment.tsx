import { ComponentType, Suspense } from 'react';
import { SvgIcon } from '@shared/components';
import { styles } from './AvailablePayments.styles';

type AvailablePaymentProps = {
  icon: ComponentType;
  type?: 'default' | 'outline';
  size?: string;
};

export const AvailablePayment = ({
  icon,
  type = 'default',
  size = '100%',
}: AvailablePaymentProps) => {
  const IconComponent = icon;

  return (
    <span css={[styles.icon, type === 'outline' && styles.iconOutline]}>
      <SvgIcon size={size}>
        <Suspense fallback={null}>{<IconComponent />}</Suspense>
      </SvgIcon>
    </span>
  );
};
