import { useRecoilValue } from 'recoil';
import { Button, SvgIcon } from '@shared/components';
import { usePaymentMethods, PaymentMethodsListItem } from '@modules/billing';
import { authSelectors } from '@modules/auth';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './PaymentMethodsList.styles';
import { containers } from 'styles/containers.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';

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
        <div css={[containers.mediumSmall, styles.wrapper]}>
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
