import { useRecoilValue } from 'recoil';
import { Button, SvgIcon, Table } from '@shared/components';
import { usePaymentMethods, PaymentMethodsListItem } from '@modules/billing';
import { authSelectors } from '@modules/auth';
import { spacing } from 'styles/utils.spacing.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import { styles } from './PaymentMethodsList.styles';

type PaymentMethodsListProps = {
  handleAdding: VoidFunction;
};

export const PaymentMethodsList = ({
  handleAdding,
}: PaymentMethodsListProps) => {
  const canInitCard = useRecoilValue(
    authSelectors.hasPermission('org-billing-init-card'),
  );

  const { paymentMethods } = usePaymentMethods();

  return (
    <>
      {!paymentMethods || !paymentMethods?.length ? (
        <p>
          You have not yet added any cards. Click the button below to add one.
        </p>
      ) : (
        <div css={styles.wrapper}>
          {paymentMethods.map((paymentMethod) => (
            <PaymentMethodsListItem
              key={paymentMethod.createdAt?.toString()}
              paymentMethod={paymentMethod}
            />
          ))}
        </div>
      )}
      {canInitCard && (
        <div css={spacing.top.medium}>
          <Button onClick={handleAdding} style="primary" size="small">
            <SvgIcon size="10px">
              <IconPlus />
            </SvgIcon>
            <span>Add Credit Card</span>
          </Button>
        </div>
      )}
    </>
  );
};
