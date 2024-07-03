import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PaymentMethod } from '@modules/grpc/library/blockjoy/v1/org';
import { Button, SvgIcon, Table, Unauthorized } from '@shared/components';
import {
  usePaymentMethods,
  mapPaymentMethodsToRows,
  billingSelectors,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import { authSelectors } from '@modules/auth';

type PaymentMethodsListProps = {
  handleAdding: VoidFunction;
  handleAction: (
    action: PaymentMethodAction,
    paymentMethod: PaymentMethod,
  ) => void;
};

export const PaymentMethodsList = ({
  handleAdding,
  handleAction,
}: PaymentMethodsListProps) => {
  const [loadingItem, setLoadingItem] = useState('');

  const customer = useRecoilValue(billingSelectors.customer);
  const canInitCard = useRecoilValue(
    authSelectors.hasPermission('org-billing-init-card'),
  );
  const canListPaymentMethods = useRecoilValue(
    authSelectors.hasPermission('org-billing-list-payment-methods'),
  );

  const { paymentMethods } = usePaymentMethods();

  // const handleUpdate = async (
  //   action: PaymentMethodAction,
  //   paymentMethod: PaymentMethod,
  // ) => {
  //   setLoadingItem(paymentMethod?.id ?? '');

  //   handleAction(action, paymentMethod);

  //   setLoadingItem('');
  // };

  const { headers, rows } = mapPaymentMethodsToRows(
    paymentMethods,
    // handleUpdate,
    // customer?.primary_payment_source_id,
    // loadingItem,
    // canInitCard,
  );

  if (!canListPaymentMethods)
    return (
      <Unauthorized>
        You don't have permission to view payment methods. Please contact your
        organization's administrator.
      </Unauthorized>
    );

  return (
    <>
      <div css={spacing.bottom.medium}>
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
      </div>
      {canInitCard && (
        <Button onClick={handleAdding} style="primary" size="small">
          <SvgIcon size="10px">
            <IconPlus />
          </SvgIcon>
          <span>Add Credit Card</span>
        </Button>
      )}
    </>
  );
};
