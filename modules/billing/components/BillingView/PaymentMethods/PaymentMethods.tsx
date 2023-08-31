import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { DeleteModal, TableSkeleton } from '@shared/components';
import {
  usePaymentMethods,
  PaymentMethodForm,
  PaymentMethodsList,
} from '@modules/billing';

export const PaymentMethods = () => {
  const router = useRouter();
  const { add } = router.query;

  const { paymentMethodsLoadingState, deletePaymentMethod } =
    usePaymentMethods();

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeView, setActiveView] =
    useState<string | 'list' | 'dialog'>('list');

  const [activePaymentMethod, setActivePaymentMethod] =
    useState<PaymentSource | null>(null);

  useEffect(() => {
    if (router.isReady && add) setIsAdding(true);
  }, [router.isReady, add]);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  const onHide = () => setActiveView('list');

  const handleRemove = (paymentMethod: PaymentSource) => {
    setActivePaymentMethod(paymentMethod);
    setActiveView('dialog');
  };

  const handleDeletePaymentMethod = () => {
    deletePaymentMethod(activePaymentMethod?.id!);
    onHide();
    toast.success(
      `Payment Method (${activePaymentMethod?.card?.masked_number}) Deleted`,
    );
  };

  if (paymentMethodsLoadingState !== 'finished') return <TableSkeleton />;

  return (
    <>
      {!isAdding ? (
        <PaymentMethodsList
          handleAdding={handleAdding}
          handleRemove={handleRemove}
        />
      ) : (
        <PaymentMethodForm handleCancel={handleCancel} />
      )}

      {activeView === 'dialog' && activePaymentMethod && (
        <DeleteModal
          portalId="delete-payment-method-modal"
          elementType="last four digits"
          elementName={activePaymentMethod.card?.last4!}
          elementPlaceholder={activePaymentMethod.card?.masked_number!}
          entityName="Payment Method"
          onHide={onHide}
          onSubmit={handleDeletePaymentMethod}
        />
      )}
    </>
  );
};
