import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import { styles } from './AvailablePaymentMethods.styles';
import { SvgIcon } from '@shared/components';
import { AVAILABLE_PAYMENT_METHODS } from '@modules/billing';

const IconAmericanExpress = dynamic(
  () => import(`@public/assets/icons/billing/AmericanExpress.svg`),
);

const IconMasterCard = dynamic(
  () => import(`@public/assets/icons/billing/MasterCard.svg`),
);

const IconVisa = dynamic(() => import(`@public/assets/icons/billing/Visa.svg`));

const matchIcon = (name: string) => {
  switch (name) {
    case 'american-express':
      return IconAmericanExpress;
    case 'master-card':
      return IconMasterCard;
    case 'visa':
      return IconVisa;
    default:
      return null;
  }
};

export const AvailablePaymentMethods = () => {
  return (
    <div css={styles.wrapper}>
      {AVAILABLE_PAYMENT_METHODS.map((pm: AvailablePaymentMethod) => {
        const IconComponent = matchIcon(pm.id);

        return (
          <React.Fragment key={pm.id}>
            {IconComponent && (
              <span css={styles.icon}>
                <SvgIcon>
                  <Suspense fallback={null}>
                    <IconComponent />
                  </Suspense>
                </SvgIcon>
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
