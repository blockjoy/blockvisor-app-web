import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
// import { toast } from 'react-toastify';
import { PaymentMethod } from '@modules/grpc/library/blockjoy/v1/org';
import {
  ConfirmDialog,
  DeleteModal,
  TableSkeleton,
  Unauthorized,
} from '@shared/components';
import {
  usePaymentMethods,
  PaymentMethodForm,
  PaymentMethodsList,
  CreditCardBrand,
} from '@modules/billing';
import { authSelectors } from '@modules/auth';

export const PaymentMethods = () => {
  const router = useRouter();
  const { add } = router.query;

  const canInitCard = useRecoilValue(
    authSelectors.hasPermission('org-billing-init-card'),
  );

  const { paymentMethodsLoadingState, deletePaymentMethod } =
    usePaymentMethods();
  const { setDefaultPaymentMethod } = usePaymentMethods();

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeView, setActiveView] =
    useState<'list' | 'delete' | 'update'>('list');

  const [activePaymentMethod, setActivePaymentMethod] =
    useState<PaymentMethod | null>(null);

  useEffect(() => {
    if (router.isReady && add) setIsAdding(true);
  }, [router.isReady, add]);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  const onHide = () => setActiveView('list');

  const handleAction = (
    action: PaymentMethodAction,
    paymentMethod: PaymentMethod,
  ) => {
    setActivePaymentMethod(paymentMethod);
    setActiveView(action);
  };

  const handleDeletePaymentMethod = async () => {
    // await deletePaymentMethod(activePaymentMethod?.id!);
    // onHide();
    // toast.success(
    //   `Payment Method (****${activePaymentMethod?.card?.last4}) removed`,
    // );
  };

  const handleUpdatePaymentMethod = async () => {
    // if (!activePaymentMethod?.id) return;
    // await setDefaultPaymentMethod(activePaymentMethod.id);
    // onHide();
    // toast.success(
    //   `Payment Method [${
    //     CreditCardBrand[activePaymentMethod?.card?.brand!]
    //   } ****${activePaymentMethod?.card?.last4}] is set as primary.`,
    // );
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
      ) : !canInitCard ? (
        <Unauthorized>
          You don't have permission to add a payment method. Please contact your
          organization's administrator.
        </Unauthorized>
      ) : (
        <PaymentMethodForm handleCancel={handleCancel} />
      )}
      {activeView === 'delete' && activePaymentMethod && canInitCard && (
        <DeleteModal
          portalId="delete-payment-method-modal"
          elementType="last four digits"
          elementName={activePaymentMethod.card?.last4!}
          elementPlaceholder={`****${activePaymentMethod.card?.last4}`}
          entityName="Payment Method"
          onHide={onHide}
          onSubmit={handleDeletePaymentMethod}
        />
      )}
      {activeView === 'update' && activePaymentMethod && canInitCard && (
        <ConfirmDialog
          type="primary"
          title="Update Primary payment method"
          message={`Credit card [${
            CreditCardBrand[activePaymentMethod?.card?.brand!]
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
