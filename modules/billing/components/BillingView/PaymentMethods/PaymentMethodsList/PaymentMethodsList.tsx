import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { Button, SvgIcon, Table } from '@shared/components';
import {
  usePaymentMethods,
  mapPaymentMethodsToRows,
  billingSelectors,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';

type PaymentMethodsListProps = {
  handleAdding: VoidFunction;
  handleAction: (
    action: PaymentMethodAction,
    paymentMethod: PaymentSource,
  ) => void;
};

export const PaymentMethodsList = ({
  handleAdding,
  handleAction,
}: PaymentMethodsListProps) => {
  const [loadingItem, setLoadingItem] = useState('');
  const { paymentMethods } = usePaymentMethods();
  const customer = useRecoilValue(billingSelectors.customer);

  const handleUpdate = async (
    action: PaymentMethodAction,
    paymentMethod: PaymentSource,
  ) => {
    setLoadingItem(paymentMethod?.id);

    handleAction(action, paymentMethod);

    setLoadingItem('');
  };

  const { headers, rows } = mapPaymentMethodsToRows(
    paymentMethods,
    handleUpdate,
    customer?.primary_payment_source_id,
    loadingItem,
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
      <Button onClick={handleAdding} style="primary" size="small">
        <SvgIcon size="10px">
          <IconPlus />
        </SvgIcon>
        <span>Add Credit Card</span>
      </Button>
    </>
  );
};
