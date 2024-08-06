import { Suspense } from 'react';
import { SvgIcon } from '@shared/components';
import { styles } from './PaymentIcon.styles';
import { getPaymentMethodIcon } from '@modules/billing';

type PaymentIconProps = {
  brand: CreditCardBrand;
  size?: 'small' | 'large';
};

export const PaymentIcon = ({ brand, size = 'small' }: PaymentIconProps) => {
  const IconComponent = getPaymentMethodIcon(brand);

  return (
    <span css={[styles.wrapper(size)]}>
      <SvgIcon size="100%" additionalStyles={[styles.icon]}>
        <Suspense fallback={null}>{<IconComponent />}</Suspense>
      </SvgIcon>
    </span>
  );
};
