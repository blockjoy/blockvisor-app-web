import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PaymentMethod } from '@modules/grpc/library/blockjoy/v1/org';
import { billingAtoms, CreditCardBrand } from '@modules/billing';
import { ROUTES } from '@shared/index';
import { Badge, Dropdown } from '@shared/components';
import { styles } from './PaymentMethodsDropdown.styles';

type PaymentMethodsDropdownProps = {
  primaryId?: string;
  handlePaymentMethod: (paymentMethod: PaymentMethod) => void;
};

export const PaymentMethodsDropdown = ({
  primaryId,
  handlePaymentMethod,
}: PaymentMethodsDropdownProps) => {
  const router = useRouter();
  const paymentMethods = useRecoilValue(billingAtoms.paymentMethods);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = (paymentMethod: PaymentMethod | null) => {
    if (paymentMethod) handlePaymentMethod(paymentMethod);
    handleOpen(false);
  };

  // const activePaymentMethod =
  //   paymentMethods.find((pm) => pm.id === primaryId) ?? null;
  const activePaymentMethod = null;

  const handleNewPaymentMethod = () => {
    router.push(
      {
        pathname: ROUTES.BILLING_PAYMENT_METHODS,
        query: { add: true },
      },
      undefined,
      { shallow: true },
    );
  };

  const renderItem = (paymentMethod: PaymentMethod) => (
    <span css={styles.item}>
      <span>
        {CreditCardBrand[paymentMethod.card?.brand!]} ***
        {paymentMethod.card?.last4}
      </span>
      {/* {customer?.primary_payment_source_id === paymentMethod.id && (
        <Badge
          color="secondary"
          style="outline"
          customCss={[styles.item, styles.badge]}
        >
          Primary
        </Badge>
      )} */}
    </span>
  );

  return (
    <Dropdown
      items={paymentMethods as any}
      handleSelected={handleSelect as any}
      selectedItem={activePaymentMethod}
      isOpen={isOpen}
      handleOpen={handleOpen}
      defaultText="Select payment method"
      renderItem={renderItem as any}
      newItem={{
        title: 'Add payment method',
        onClick: handleNewPaymentMethod,
      }}
    />
  );
};
