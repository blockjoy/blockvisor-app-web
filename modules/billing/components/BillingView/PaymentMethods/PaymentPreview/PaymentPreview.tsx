import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, DetailsTable, TableSkeleton } from '@shared/components';
import {
  mapCardToDetails,
  billingSelectors,
  PaymentMethodsSelect,
  usePaymentMethod,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { containers } from 'styles/containers.styles';
import { organizationSelectors } from '@modules/organization';
import { useHasPermissions } from '@modules/auth/hooks/useHasPermissions';
import { Permissions, authSelectors } from '@modules/auth';

export const PaymentPreview = () => {
  const [activeView, setActiveView] = useState<'list' | 'dialog'>('list');

  const subscription = useRecoilValue(billingSelectors.subscription);
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

  if (paymentMethodLoadingState !== 'finished') return <TableSkeleton />;

  return activeView === 'list' ? (
    <div css={containers.mediumSmall}>
      <DetailsTable bodyElements={mapCardToDetails(paymentMethod?.card!)} />
      {canUpdateBilling && (
        <Button
          size="small"
          style="outline"
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
