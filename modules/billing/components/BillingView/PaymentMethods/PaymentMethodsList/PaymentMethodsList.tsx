import { useState } from 'react';
import { toast } from 'react-toastify';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { Button, SvgIcon, Table } from '@shared/components';
import {
  usePaymentMethods,
  mapPaymentMethodsToRows,
  useCustomer,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';

type PaymentMethodsListProps = {
  handleAdding: VoidFunction;
  handleRemove: (paymentMethod: PaymentSource) => void;
};

export const PaymentMethodsList = ({
  handleAdding,
  handleRemove,
}: PaymentMethodsListProps) => {
  const [loadingItem, setLoadingItem] = useState<string>('');
  const { paymentMethods } = usePaymentMethods();

  const { customer, assignPaymentRole } = useCustomer();

  const handleDefault = async (paymentSourceId: string) => {
    setLoadingItem(paymentSourceId);

    await assignPaymentRole({
      payment_source_id: paymentSourceId,
      role: 'primary',
    });

    setLoadingItem('');

    toast.success('Updated default Payment method');
  };

  const handleDelete = (paymentMethod: PaymentSource) => {
    setLoadingItem(paymentMethod?.id);

    handleRemove(paymentMethod);

    setLoadingItem('');
  };

  const { headers, rows } = mapPaymentMethodsToRows(
    paymentMethods,
    handleDelete,
    handleDefault,
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
          <Table headers={headers} rows={rows} isLoading={'finished'} />
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
