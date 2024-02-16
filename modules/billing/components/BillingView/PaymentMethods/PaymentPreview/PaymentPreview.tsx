import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { Button, DetailsTable, TableSkeleton } from '@shared/components';
import {
  mapCardToDetails,
  billingSelectors,
  PaymentMethodsSelect,
  usePaymentMethod,
  billingAtoms,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { containers } from 'styles/containers.styles';
import { styles } from './PaymentPreview.styles';
import { ROUTES } from '@shared/index';
import { usePermissions } from '@modules/auth';

export const PaymentPreview = () => {
  const router = useRouter();
  const [activeView, setActiveView] = useState<'list' | 'dialog'>('list');

  const subscription = useRecoilValue(billingSelectors.subscription);

  const { paymentMethod, paymentMethodLoadingState } = usePaymentMethod();
  const allPaymentMethods = useRecoilValue(billingAtoms.paymentMethods);

  const { hasPermission } = usePermissions();
  const canUpdateSubscription = hasPermission('subscription-update');

  const handleUpdate = () => setActiveView('dialog');
  const onHide = () => setActiveView('list');

  const handleNewPaymentMethod = () => {
    if (!allPaymentMethods.length)
      router.push(
        {
          pathname: ROUTES.SETTINGS_BILLING,
          query: { tab: 'payment-methods', add: true, update: true },
        },
        undefined,
        { shallow: true },
      );
    else handleUpdate();
  };

  useEffect(() => {
    setActiveView('list');
  }, [subscription?.status]);

  if (paymentMethodLoadingState !== 'finished') return <TableSkeleton />;

  return activeView === 'list' ? (
    <div css={containers.mediumSmall}>
      {!!paymentMethod?.card ? (
        <DetailsTable bodyElements={mapCardToDetails(paymentMethod?.card)} />
      ) : (
        <>
          <p css={[styles.text, spacing.bottom.small]}>
            Subscription is missing a payment method. Without one, the next
            payment cannot proceed, and services will be terminated
          </p>
          <p css={styles.text}>Please update the payment method to continue</p>
        </>
      )}

      {canUpdateSubscription && (
        <Button
          size="small"
          style="outline"
          onClick={
            !!paymentMethod?.card ? handleUpdate : handleNewPaymentMethod
          }
          css={spacing.top.medium}
          disabled={subscription?.status !== 'active'}
        >
          {!!paymentMethod?.card || !!allPaymentMethods.length
            ? 'Change payment method'
            : 'Add payment method'}
        </Button>
      )}
    </div>
  ) : (
    <>
      {paymentMethod || (!paymentMethod && allPaymentMethods.length) ? (
        <PaymentMethodsSelect
          subscriptionId={subscription?.id!}
          currentPaymentMethod={paymentMethod}
          onHide={onHide}
        />
      ) : null}
    </>
  );
};
