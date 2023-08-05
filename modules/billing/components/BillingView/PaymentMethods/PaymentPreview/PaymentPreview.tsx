import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, DetailsTable, TableSkeleton } from '@shared/components';
import {
  usePaymentMethods,
  mapCardToDetails,
  billingAtoms,
  billingSelectors,
  PaymentMethodsSelect,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { containers } from 'styles/containers.styles';

export const PaymentPreview = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const { paymentMethod, paymentMethodLoadingState, getPaymentMethod } =
    usePaymentMethods();

  const [activeView, setActiveView] = useState<'list' | 'dialog'>('list');

  useEffect(() => {
    getPaymentMethod(subscription?.payment_source_id!);
  }, [subscription?.payment_source_id]);

  const handleUpdate = () => setActiveView('dialog');
  const onHide = () => setActiveView('list');

  if (
    paymentMethodLoadingState !== 'finished' ||
    subscriptionLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  return activeView === 'list' ? (
    <div css={containers.mediumSmall}>
      <DetailsTable bodyElements={mapCardToDetails(paymentMethod?.card!)} />
      <Button
        size="small"
        style="secondary"
        onClick={handleUpdate}
        css={spacing.top.medium}
      >
        Update payment method
      </Button>
    </div>
  ) : (
    <>
      {paymentMethod && (
        <PaymentMethodsSelect
          subscriptionId={subscription?.id!}
          currentPaymentMethod={paymentMethod}
          onHide={onHide}
        />
      )}
    </>
  );
};
