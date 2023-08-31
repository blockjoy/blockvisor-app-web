import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, DetailsTable, TableSkeleton } from '@shared/components';
import {
  mapCardToDetails,
  billingAtoms,
  billingSelectors,
  PaymentMethodsSelect,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { containers } from 'styles/containers.styles';
import { organizationSelectors } from '@modules/organization';
import { useHasPermissions } from '@modules/auth/hooks/useHasPermissions';
import { Permissions, authSelectors } from '@modules/auth';

export const PaymentPreview = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const [activeView, setActiveView] = useState<'list' | 'dialog'>('list');

  const paymentMethod = useRecoilValue(
    billingSelectors.paymentMethodById(subscription?.payment_source_id!),
  );

  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canUpdateBilling: boolean = useHasPermissions(
    userRole,
    userRoleInOrganization,
    Permissions.UPDATE_BILLING,
  );

  const handleUpdate = () => setActiveView('dialog');
  const onHide = () => setActiveView('list');

  if (subscriptionLoadingState !== 'finished') return <TableSkeleton />;

  return activeView === 'list' ? (
    <div css={containers.mediumSmall}>
      <DetailsTable bodyElements={mapCardToDetails(paymentMethod?.card!)} />
      {canUpdateBilling && (
        <Button
          size="small"
          style="secondary"
          onClick={handleUpdate}
          css={spacing.top.medium}
        >
          Update payment method
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
