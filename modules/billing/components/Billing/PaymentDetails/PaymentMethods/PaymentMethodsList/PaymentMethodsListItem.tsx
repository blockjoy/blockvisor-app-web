import { PaymentMethod } from '@modules/grpc/library/blockjoy/v1/org';
import {
  PaymentIcon,
  CreditCardBrand,
  // PaymentMethodActions,
} from '@modules/billing';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './PaymentMethodsListItem.styles';

type PaymentMethodsListItemProps = {
  paymentMethod: PaymentMethod;
};

export const PaymentMethodsListItem = ({
  paymentMethod,
}: PaymentMethodsListItemProps) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.content}>
        <PaymentIcon brand={paymentMethod?.card?.brand!} size="large" />
        <div css={[flex.display.flex, flex.direction.column]}>
          <div>
            {`${CreditCardBrand[paymentMethod?.card?.brand!]} ****${
              paymentMethod.card?.last4
            }`}
          </div>
          <div
            css={[
              flex.display.flex,
              flex.direction.row,
              flex.align.center,
              spacing.top.micro,
            ]}
          >
            <p css={[styles.expiry, spacing.right.small]}>
              Exp. date{' '}
              {paymentMethod?.card?.expMonth?.toString().padStart(2, '0')}/
              {paymentMethod?.card?.expYear?.toString().slice(-2)}
            </p>
          </div>
        </div>
      </div>
      {/* <div css={styles.actions}>
        <PaymentMethodActions
          handleDefault={() => {}}
          handleDelete={() => {}}
          isPrimary={false}
        />
      </div> */}
    </div>
  );
};
