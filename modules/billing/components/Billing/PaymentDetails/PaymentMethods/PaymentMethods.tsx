import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TableSkeleton, Unauthorized } from '@shared/components';
import {
  usePaymentMethods,
  PaymentMethodForm,
  PaymentMethodsList,
} from '@modules/billing';
import { authSelectors } from '@modules/auth';

export const PaymentMethods = () => {
  const router = useRouter();
  const { add } = router.query;

  const canInitCard = useRecoilValue(
    authSelectors.hasPermission('org-billing-init-card'),
  );

  const [isAdding, setIsAdding] = useState(false);

  const { paymentMethodsLoadingState } = usePaymentMethods();

  useEffect(() => {
    if (router.isReady && add) setIsAdding(true);
  }, [router.isReady, add]);

  const handleAdding = () => setIsAdding(true);
  const handleCancel = () => setIsAdding(false);

  if (paymentMethodsLoadingState === 'initializing' && !isAdding)
    return <TableSkeleton />;

  return (
    <>
      {!isAdding ? (
        <PaymentMethodsList handleAdding={handleAdding} />
      ) : !canInitCard ? (
        <Unauthorized>
          You don't have permission to add a payment method. Please contact your
          organization's administrator.
        </Unauthorized>
      ) : (
        <PaymentMethodForm handleCancel={handleCancel} />
      )}
    </>
  );
};
