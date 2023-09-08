import { useState } from 'react';
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
import { organizationSelectors } from '@modules/organization';
import { useHasPermissions } from '@modules/auth/hooks/useHasPermissions';
import { Permissions, authSelectors } from '@modules/auth';
import { styles } from './PaymentPreview.styles';
import { ROUTES } from '@shared/index';

export const PaymentPreview = () => {
  const router = useRouter();
  const [activeView, setActiveView] = useState<'list' | 'dialog'>('list');

  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionPaymentMethodLoadingState = useRecoilValue(
    billingAtoms.subscriptionPaymentMethodLoadingState,
  );

  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const { paymentMethod, paymentMethodLoadingState } = usePaymentMethod();

  const canUpdateBilling: boolean = useHasPermissions(
    userRole,
    userRoleInOrganization,
    Permissions.UPDATE_BILLING,
  );

  const handleUpdate = () => setActiveView('dialog');
  const onHide = () => setActiveView('list');

  const handleNewPaymentMethod = () => {
    router.push(
      {
        pathname: ROUTES.SETTINGS,
        query: { tab: '1', add: true, update: true },
      },
      undefined,
      { shallow: true },
    );
  };

  if (
    paymentMethodLoadingState !== 'finished' ||
    subscriptionPaymentMethodLoadingState === 'loading'
  )
    return <TableSkeleton />;

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
          <p css={styles.text}>Please add a new payment method to continue</p>
        </>
      )}

      {canUpdateBilling && (
        <Button
          size="small"
          style="outline"
          onClick={
            !!paymentMethod?.card ? handleUpdate : handleNewPaymentMethod
          }
          css={spacing.top.medium}
        >
          {!!paymentMethod?.card
            ? 'Update payment method'
            : 'Add payment method'}
        </Button>
      )}
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
