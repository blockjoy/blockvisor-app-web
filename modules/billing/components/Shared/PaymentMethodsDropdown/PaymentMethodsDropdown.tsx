import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import {
  billingAtoms,
  billingSelectors,
  CreditCardTypes,
} from '@modules/billing';
import { ROUTES } from '@shared/index';
import { Badge, Dropdown } from '@shared/components';
import { styles } from './PaymentMethodsDropdown.styles';

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

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = (paymentMethod: PaymentSource | null) => {
    if (paymentMethod) handlePaymentMethod(paymentMethod);
    handleOpen(false);
  };

  const activePaymentMethod =
    paymentMethods.find((pm) => pm.id === primaryId) ?? null;

  const handleNewPaymentMethod = () => {
    router.push(
      {
        pathname: ROUTES.SETTINGS_BILLING,
        query: { tab: 'payment-methods', add: true },
      },
      undefined,
      { shallow: true },
    );
  };

  const renderItem = (paymentMethod: PaymentSource) => (
    <span css={styles.item}>
      <span>
        {CreditCardTypes[paymentMethod.card?.brand!]} ***
        {paymentMethod.card?.last4}
      </span>
      {customer?.primary_payment_source_id === paymentMethod.id && (
        <Badge
          color="secondary"
          style="outline"
          customCss={[styles.item, styles.badge]}
        >
          Primary
        </Badge>
      )}
    </span>
  );

  return (
    <Dropdown
      items={paymentMethods}
      handleSelected={handleSelect}
      selectedItem={activePaymentMethod}
      isOpen={isOpen}
      handleOpen={handleOpen}
      defaultText="Select payment method"
      renderItem={renderItem}
      newItem={{
        title: 'Add payment method',
        onClick: handleNewPaymentMethod,
      }}
    />
  );
};
