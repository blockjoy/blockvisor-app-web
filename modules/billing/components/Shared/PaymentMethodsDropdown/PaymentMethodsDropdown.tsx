import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import {
  billingAtoms,
  billingSelectors,
  CreditCardTypes,
} from '@modules/billing';
import { styles } from './PaymentMethodsDropdown.styles';
import { ROUTES } from '@shared/index';
import { Badge, Select } from '@shared/components';

type PaymentMethodsDropdownProps = {
  primaryId?: string;
  handlePaymentMethod: (paymentMethod: PaymentSource) => void;
};

export const PaymentMethodsDropdown = ({
  primaryId,
  handlePaymentMethod,
}: PaymentMethodsDropdownProps) => {
  const router = useRouter();
  const customer = useRecoilValue(billingSelectors.customer);
  const paymentMethods = useRecoilValue(billingAtoms.paymentMethods);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(!isOpen);

  const handleSelect = (paymentMethod: PaymentSource) => {
    handlePaymentMethod(paymentMethod);
    handleClose();
  };

  const activePaymentMethod = paymentMethods.find((pm) => pm.id === primaryId);

  const handleNewPaymentMethod = () => {
    router.push(
      {
        pathname: ROUTES.SETTINGS,
        query: { tab: '1', add: true },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <Select
      buttonText={
        <p>
          {activePaymentMethod ? (
            <>
              <span css={styles.title}>
                {CreditCardTypes[activePaymentMethod.card?.brand!]} ***
                {activePaymentMethod.card?.last4}
              </span>
              {customer?.primary_payment_source_id ===
                activePaymentMethod.id && (
                <Badge
                  color="primary"
                  style="outline"
                  customCss={[styles.badge]}
                >
                  Primary
                </Badge>
              )}
            </>
          ) : (
            'Select payment method'
          )}
        </p>
      }
      items={paymentMethods?.map((paymentMethod) => ({
        name: paymentMethod.card?.last4 ?? '',
        element: (
          <p css={styles.dropdownItem}>
            <span css={styles.title}>
              {CreditCardTypes[paymentMethod.card?.brand!]} ***
              {paymentMethod.card?.last4}
            </span>
            {customer?.primary_payment_source_id === paymentMethod.id && (
              <Badge color="primary" style="outline" customCss={[styles.badge]}>
                Primary
              </Badge>
            )}
          </p>
        ),
        onClick: () => handleSelect(paymentMethod),
      }))}
      newItem={{
        title: 'Add payment method',
        onClick: handleNewPaymentMethod,
      }}
    />
  );
};
