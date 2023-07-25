import { useRecoilValue } from 'recoil';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { Button, Table } from '@shared/components';
import {
  billingSelectors,
  usePaymentMethods,
  mapPaymentMethodsToRows,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';

type PaymentMethodsListProps = {
  handleAdding: VoidFunction;
  handleRemove: (paymentMethod: PaymentSource) => void;
};

export const PaymentMethodsList = ({
  handleAdding,
  handleRemove,
}: PaymentMethodsListProps) => {
  const { paymentMethods } = usePaymentMethods();

  const customer = useRecoilValue(billingSelectors.customer);

  const { headers, rows } = mapPaymentMethodsToRows(
    paymentMethods,
    handleRemove,
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
        Add Credit Card
      </Button>
    </>
  );
};
