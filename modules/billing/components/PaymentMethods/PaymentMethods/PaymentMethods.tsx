import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Table, TableSkeleton } from '@shared/index';
import { styles } from './PaymentMethods.styles';
import {
  billingAtoms,
  usePaymentMethods,
  mapPaymentMethodsToRows,
  PaymentMethodDialog,
  CreditCardForm,
} from '@modules/billing';

export const PaymentMethods = () => {
  const {
    paymentMethods,
    getPaymentMethods,
    paymentMethodsLoadingState,
    deletePaymentMethod,
  } = usePaymentMethods();

  const customer = useRecoilValue(billingAtoms.customer);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeView, setActiveView] =
    useState<string | 'list' | 'dialog'>('list');

  const [activePaymentMethod, setActivePaymentMethod] = useState<any>(null);

  useEffect(() => {
    getPaymentMethods({
      customer_id: { is: customer?.id },
      type: { is: 'card' },
    });
  }, []);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  const handleRemove = (paymentMethod: any) => {
    setActivePaymentMethod(paymentMethod);
    setActiveView('dialog');
  };

  const onConfirm = (id: string) => deletePaymentMethod(id);
  const onHide = () => setActiveView('list');

  const { headers, rows } = mapPaymentMethodsToRows(
    paymentMethods,
    handleRemove,
    customer?.primary_payment_source_id,
  );

  return paymentMethodsLoadingState !== 'finished' ? (
    <TableSkeleton />
  ) : !isAdding ? (
    <>
      <div>
        {!paymentMethods || !paymentMethods?.length ? (
          <p>
            You have not yet added any cards. Click the button below to add one.
          </p>
        ) : (
          <div>
            <Table
              headers={headers}
              rows={rows}
              isLoading={paymentMethodsLoadingState}
            />
            {activeView === 'dialog' && (
              <PaymentMethodDialog
                paymentMethod={activePaymentMethod}
                onConfirm={onConfirm}
                onHide={onHide}
              />
            )}
          </div>
        )}
      </div>
      <Button
        onClick={handleAdding}
        style="primary"
        size="small"
        css={styles.button}
      >
        Add Credit Card
      </Button>
    </>
  ) : (
    <>
      <CreditCardForm handleCancel={handleCancel} />
    </>
  );
};
