import { useRecoilValue } from 'recoil';
import { Button, SvgIcon, Table } from '@shared/components';
import { usePaymentMethods, mapPaymentMethodsToRows } from '@modules/billing';
import { authSelectors } from '@modules/auth';
import { spacing } from 'styles/utils.spacing.styles';
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

  const { headers, rows } = mapPaymentMethodsToRows(paymentMethods);

  return (
    <>
      {!paymentMethods || !paymentMethods?.length ? (
        <p>
          You have not yet added any cards. Click the button below to add one.
        </p>
      ) : (
        <Table
          headers={headers}
          rows={rows}
          isLoading={'finished'}
          isHover={false}
        />
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
