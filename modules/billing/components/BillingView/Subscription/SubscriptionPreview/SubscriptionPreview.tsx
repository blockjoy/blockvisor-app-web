import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import { DetailsView } from '@shared/components';
import {
  billingSelectors,
  SubscriptionInfo,
  PaymentPreview,
  SubscriptionActions,
} from '@modules/billing';
import { useHasPermissions, Permissions, authSelectors } from '@modules/auth';
import { organizationSelectors } from '@modules/organization';

type SubscriptionPreviewProps = {
  itemPrices: ItemPrice[];
  handleCancellation: VoidFunction;
};

export const SubscriptionPreview = ({
  itemPrices,
  handleCancellation,
}: SubscriptionPreviewProps) => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canUpdateBilling: boolean = useHasPermissions(
    userRole,
    userRoleInOrganization,
    Permissions.UPDATE_BILLING,
  );

  return (
    <>
      <DetailsView headline="Info">
        <SubscriptionInfo itemPrices={itemPrices} />
      </DetailsView>
      {subscription?.status === 'active' && (
        <DetailsView headline="Payment information">
          <PaymentPreview />
        </DetailsView>
      )}
      {canUpdateBilling && (
        <DetailsView headline="Subscription status">
          <SubscriptionActions handleCancellation={handleCancellation} />
        </DetailsView>
      )}
    </>
  );
};
