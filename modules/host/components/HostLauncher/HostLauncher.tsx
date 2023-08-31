import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useProvisionToken } from '@modules/organization/hooks/useProvisionToken';
import {
  Alert,
  Button,
  CopyToClipboard,
  FormHeaderCaps,
  FormLabelCaps,
  FormText,
  OrganizationSelect,
  Skeleton,
  SvgIcon,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './HostLauncher.styles';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';
import {
  organizationSelectors,
  useDefaultOrganization,
} from '@modules/organization';
import { authSelectors } from '@modules/auth';
import {
  billingAtoms,
  billingSelectors,
  PaymentRequired,
} from '@modules/billing';

import {
  useHasPermissions,
  Permissions,
} from '@modules/auth/hooks/useHasPermissions';

export const HostLauncher = () => {
  const { resetProvisionToken, provisionToken, provisionTokenLoadingState } =
    useProvisionToken();

  const { defaultOrganization } = useDefaultOrganization();

  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const [activeView, setActiveView] = useState<'view' | 'action'>('view');

  const hasPaymentMethod = useRecoilValue(billingSelectors.hasPaymentMethod);

  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const canAddHost: boolean = useHasPermissions(
    userRole,
    userRoleInOrganization,
    Permissions.CREATE_HOST,
  );

  const isDisabledAdding = !hasPaymentMethod || !canAddHost;

  const token = !isDisabledAdding
    ? provisionToken
    : provisionToken?.replace(/./g, '*');

  const handleAddingPaymentMethod = () => setActiveView('action');
  const handleHidingPortal = () => setActiveView('view');

  return (
    <>
      <div>
        <header css={styles.header}>
          <FormHeaderCaps noBottomMargin>LAUNCH HOST</FormHeaderCaps>
        </header>
        <ul css={styles.timeline}>
          <li>
            <div>
              <FormLabelCaps>Select Organization</FormLabelCaps>
              <OrganizationSelect />
            </div>
          </li>
          <li>
            <div css={spacing.bottom.medium}>
              <FormLabelCaps>Confirm Subscription Status</FormLabelCaps>
              {subscriptionLoadingState !== 'finished' ? (
                <Skeleton width="160px" />
              ) : (
                <>
                  <Alert isSuccess={!isDisabledAdding} noBottomMargin>
                    {isDisabledAdding
                      ? !canAddHost
                        ? 'Cannot launch host due to insufficient permissions.'
                        : 'Set up a payment method to add new hosts.'
                      : 'Good to go!'}
                  </Alert>
                  {canAddHost && !hasPaymentMethod && (
                    <Button
                      style="outline"
                      size="small"
                      css={[spacing.top.medium, styles.button]}
                      onClick={handleAddingPaymentMethod}
                      loading={provisionTokenLoadingState !== 'finished'}
                    >
                      Add payment method
                    </Button>
                  )}
                </>
              )}
            </div>
          </li>
          <li>
            <div css={spacing.bottom.medium}>
              <FormLabelCaps>Run terminal command</FormLabelCaps>
              <FormText>
                Launch a new host by running this command on any server
              </FormText>
              <CopyToClipboard
                value={`bvup ${token}`}
                disabled={isDisabledAdding}
              />
              <Button
                style="outline"
                size="small"
                disabled={
                  provisionTokenLoadingState !== 'finished' || isDisabledAdding
                }
                css={[spacing.top.medium, styles.button]}
                onClick={() => resetProvisionToken(defaultOrganization?.id!)}
                loading={provisionTokenLoadingState !== 'finished'}
              >
                <SvgIcon>
                  <IconRefresh />
                </SvgIcon>
                Regenerate
              </Button>
            </div>
          </li>
          <li>
            <div>
              <FormLabelCaps>Sit back and wait</FormLabelCaps>
              <FormText>We expect this host to be ready in 4 minutes</FormText>
            </div>
          </li>
        </ul>
      </div>
      {activeView === 'action' && (
        <PaymentRequired
          warningMessage="Creating a Host requires a payment method."
          handleCancel={handleHidingPortal}
          handleSubmit={handleHidingPortal}
          handleHide={handleHidingPortal}
        />
      )}
    </>
  );
};
