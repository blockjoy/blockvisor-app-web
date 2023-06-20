import {
  billingAtoms,
  billingSelectors,
  CreditCardTypes,
} from '@modules/billing';
import {
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  Scrollbar,
} from '@shared/components';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './PaymentMethodsSelect.styles';
import IconPlus from '@public/assets/icons/plus-12.svg';
import { useRouter } from 'next/router';
import { Badge, ROUTES } from '@shared/index';

type PaymentMethodsSelectProps = {
  primaryId?: string;
  handlePaymentMethod: (paymentMethod: PaymentSource) => void;
};

export const PaymentMethodsSelect = ({
  primaryId,
  handlePaymentMethod,
}: PaymentMethodsSelectProps) => {
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
    <DropdownWrapper
      isEmpty={false}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DropdownButton
        text={
          <p>
            {activePaymentMethod ? (
              <>
                <span css={styles.title}>
                  {CreditCardTypes[activePaymentMethod.card?.brand!]} ***
                  {activePaymentMethod.card?.last4}
                </span>
                {customer?.primary_payment_source_id ===
                  activePaymentMethod.id &&
                  paymentMethods?.length > 1 && (
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
        onClick={handleClose}
        isOpen={isOpen}
      />

      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          <ul>
            {paymentMethods?.map((paymentMethod: PaymentSource) => {
              return (
                <li key={paymentMethod.id}>
                  <DropdownItem
                    size="medium"
                    type="button"
                    onButtonClick={() => handleSelect(paymentMethod)}
                  >
                    <p css={styles.active}>
                      <span css={styles.title}>
                        {CreditCardTypes[paymentMethod.card?.brand!]} ***
                        {paymentMethod.card?.last4}
                      </span>
                      {customer?.primary_payment_source_id ===
                        paymentMethod.id &&
                        paymentMethods?.length > 1 && (
                          <Badge
                            color="primary"
                            style="outline"
                            customCss={[styles.badge]}
                          >
                            Primary
                          </Badge>
                        )}
                    </p>
                  </DropdownItem>
                </li>
              );
            })}
          </ul>
        </Scrollbar>
        <button css={[styles.createButton]} onClick={handleNewPaymentMethod}>
          <IconPlus /> Add payment method
        </button>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
