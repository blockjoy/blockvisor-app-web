import { useEffect, useState } from 'react';
import {
  Button,
  DetailsTable,
  DetailsView,
  TableSkeleton,
} from '@shared/components';
import {
  usePaymentMethods,
  useSubscription,
  mapCardToDetails,
  PaymentMethodsSelector,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';

export const PaymentPreview = () => {
  const { subscription, subscriptionLoadingState } = useSubscription();
  const { paymentMethod, paymentMethodLoadingState, getPaymentMethod } =
    usePaymentMethods();

  const [activeView, setActiveView] = useState<any>('list');

  useEffect(() => {
    getPaymentMethod(subscription?.payment_source_id);
  }, [subscription?.payment_source_id]);

  const handleUpdate = () => setActiveView('dialog');
  const onHide = () => setActiveView('list');

  return (
    <>
      {paymentMethodLoadingState !== 'finished' ||
      subscriptionLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <>
          <DetailsView headline="Payment methods">
            {activeView === 'list' ? (
              <>
                <DetailsTable
                  bodyElements={mapCardToDetails(paymentMethod?.card!)}
                />
                <Button
                  size="small"
                  style="secondary"
                  onClick={handleUpdate}
                  css={spacing.top.medium}
                >
                  Change
                </Button>
              </>
            ) : (
              <PaymentMethodsSelector
                currentPaymentMethod={paymentMethod}
                onHide={onHide}
              />
            )}
          </DetailsView>
        </>
      )}
    </>
  );
};
