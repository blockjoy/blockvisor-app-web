import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Button,
  DetailsTable,
  DetailsView,
  TableSkeleton,
} from '@shared/components';
import {
  usePaymentMethods,
  mapCardToDetails,
  billingAtoms,
  billingSelectors,
  PaymentMethodsSelector,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';

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

  return (
    <DetailsView headline="Payment method">
      {activeView === 'list' ? (
        <>
          <DetailsTable bodyElements={mapCardToDetails(paymentMethod?.card!)} />
          <Button
            size="small"
            style="outline"
            onClick={handleUpdate}
            css={spacing.top.medium}
          >
            Update Payment Method
          </Button>
        </>
      ) : (
        <>
          {paymentMethod && (
            <PaymentMethodsSelector
              subscriptionId={subscription?.id!}
              currentPaymentMethod={paymentMethod}
              onHide={onHide}
            />
          )}
        </>
      )}
    </DetailsView>
  );
};
