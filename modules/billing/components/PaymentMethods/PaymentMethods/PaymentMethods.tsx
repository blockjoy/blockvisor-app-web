import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Table, TableSkeleton } from '@shared/index';
import { styles } from './PaymentMethods.styles';
import {
  billingAtoms,
  usePaymentMethods,
  mapPaymentMethodsToRows,
  PaymentMethodDialog,
} from '@modules/billing';
import { useRouter } from 'next/router';
import { PaymentMethodForm } from '../PaymentMethodForm/PaymentMethodForm';

export const PaymentMethods = () => {
  const router = useRouter();
  const { add } = router.query;

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
    if (router.isReady && add) setIsAdding(true);
  }, [router.isReady, add]);

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
    <PaymentMethodForm handleCancel={handleCancel} />
  );
};
