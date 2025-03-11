import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PaymentMethod } from '@modules/grpc/library/blockjoy/v1/org';
import { billingAtoms, CreditCardBrand, PaymentIcon } from '@modules/billing';
import { ROUTES } from '@shared/index';
import { Badge, Dropdown } from '@shared/components';
import { styles } from './PaymentMethodsDropdown.styles';

type PaymentMethodsDropdownProps = {
  primaryId?: string;
  handleNew?: VoidFunction;
};

export const PaymentMethodsDropdown = ({
  primaryId,
  handleNew,
}: PaymentMethodsDropdownProps) => {
  const router = useRouter();
  const paymentMethods = useRecoilValue(billingAtoms.paymentMethods);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = (paymentMethod: PaymentMethod | null) => {
    handleOpen(false);
  };

  const activePaymentMethod =
    paymentMethods.find((pm) => pm.id === primaryId) ?? null;

  const handleNewPaymentMethod = () => {
    if (handleNew) {
      handleNew?.();
    } else {
      router.push(
        {
          pathname: ROUTES.BILLING_PAYMENT_METHODS,
          query: { add: true },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  const renderItem = (paymentMethod: PaymentMethod) => (
    <span css={styles.item}>
      <PaymentIcon brand={paymentMethod.card?.brand!} />
      <span>
        {CreditCardBrand[paymentMethod.card?.brand!]} ***{' '}
        {paymentMethod.card?.last4}
      </span>
      <Badge color="secondary" customCss={[styles.item, styles.badge]}>
        Expires {paymentMethod.card?.expMonth} / {paymentMethod.card?.expYear}
      </Badge>
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
