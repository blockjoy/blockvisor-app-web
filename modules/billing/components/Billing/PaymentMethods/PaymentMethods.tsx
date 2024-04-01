import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { ConfirmDialog, DeleteModal, TableSkeleton } from '@shared/components';
import {
  usePaymentMethods,
  PaymentMethodForm,
  PaymentMethodsList,
  useCustomer,
  CreditCardTypes,
} from '@modules/billing';

export const PaymentMethods = () => {
  const router = useRouter();
  const { add } = router.query;

  const { paymentMethodsLoadingState, deletePaymentMethod } =
    usePaymentMethods();
  const { assignPaymentRole } = useCustomer();

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeView, setActiveView] =
    useState<'list' | 'delete' | 'update'>('list');

  const [activePaymentMethod, setActivePaymentMethod] =
    useState<PaymentSource | null>(null);

  useEffect(() => {
    if (router.isReady && add) setIsAdding(true);
  }, [router.isReady, add]);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  const onHide = () => setActiveView('list');

  const handleAction = (
    action: PaymentMethodAction,
    paymentMethod: PaymentSource,
  ) => {
    setActivePaymentMethod(paymentMethod);
    setActiveView(action);
  };

  const handleDeletePaymentMethod = async () => {
    await deletePaymentMethod(activePaymentMethod?.id!);

    onHide();

    toast.success(
      `Payment Method (${activePaymentMethod?.card?.masked_number}) removed`,
    );
  };

  const handleUpdatePaymentMethod = async () => {
    await assignPaymentRole({
      payment_source_id: activePaymentMethod?.id!,
      role: 'primary',
    });

    onHide();

    toast.success(
      `Payment Method [${
        CreditCardTypes[activePaymentMethod?.card?.brand!]
      } ****${activePaymentMethod?.card?.last4}] is set as primary.`,
    );
  };

  if (paymentMethodsLoadingState === 'initializing' && !isAdding)
    return <TableSkeleton />;

  return (
    <>
      {!isAdding ? (
        <PaymentMethodsList
          handleAdding={handleAdding}
          handleAction={handleAction}
        />
      ) : (
        <PaymentMethodForm handleCancel={handleCancel} />
      )}

      {activeView === 'delete' && activePaymentMethod && (
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
      {activeView === 'update' && activePaymentMethod && (
        <ConfirmDialog
          type="primary"
          title="Update Primary payment method"
          message={`Credit card [${
            CreditCardTypes[activePaymentMethod?.card?.brand!]
          } ****${
            activePaymentMethod.card?.last4
          }] will be set as primary for billing.`}
          handleConfirm={handleUpdatePaymentMethod}
          onHide={onHide}
        />
      )}
    </>
  );
};
