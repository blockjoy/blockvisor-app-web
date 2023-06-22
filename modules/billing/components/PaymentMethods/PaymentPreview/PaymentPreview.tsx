import { useEffect, useState } from 'react';
import {
  Button,
  DetailsTable,
  DetailsView,
  TableSkeleton,
} from '@shared/components';
import {
  usePaymentMethods,
  mapCardToDetails,
  PaymentMethodsSelector,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { useRecoilValue } from 'recoil';

export const PaymentPreview = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
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
          <DetailsView headline="Payment method">
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
                  Update Payment Method
                </Button>
              </>
            ) : (
              <PaymentMethodsSelector
                subscriptionId={subscription?.id!}
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
