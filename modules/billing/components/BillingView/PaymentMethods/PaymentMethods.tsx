import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { Button, Table, TableSkeleton } from '@shared/components';
import {
  billingSelectors,
  usePaymentMethods,
  mapPaymentMethodsToRows,
  PaymentMethodDialog,
  PaymentMethodForm,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';

export const PaymentMethods = () => {
  const router = useRouter();
  const { add } = router.query;

  const {
    paymentMethods,
    getPaymentMethods,
    paymentMethodsLoadingState,
    deletePaymentMethod,
  } = usePaymentMethods();

  const customer = useRecoilValue(billingSelectors.customer);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeView, setActiveView] =
    useState<string | 'list' | 'dialog'>('list');

  const [activePaymentMethod, setActivePaymentMethod] =
    useState<PaymentSource | null>(null);

  useEffect(() => {
    if (router.isReady && add) setIsAdding(true);
  }, [router.isReady, add]);

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  const handleRemove = (paymentMethod: PaymentSource) => {
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
      <div css={spacing.bottom.medium}>
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
            {activeView === 'dialog' && activePaymentMethod && (
              <PaymentMethodDialog
                paymentMethod={activePaymentMethod}
                onConfirm={onConfirm}
                onHide={onHide}
              />
            )}
          </div>
        )}
      </div>
      <Button onClick={handleAdding} style="primary" size="small">
        Add Credit Card
      </Button>
    </>
  ) : (
    <PaymentMethodForm handleCancel={handleCancel} />
  );
};
