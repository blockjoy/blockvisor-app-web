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
  const { paymentMethods } = usePaymentMethods();

  const { customer, assignPaymentRole } = useCustomer();

  const handleDefault = async (paymentSourceId: string) =>
    await assignPaymentRole({
      payment_source_id: paymentSourceId,
      role: 'primary',
    });

  const { headers, rows } = mapPaymentMethodsToRows(
    paymentMethods,
    handleRemove,
    handleDefault,
    customer?.primary_payment_source_id,
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
