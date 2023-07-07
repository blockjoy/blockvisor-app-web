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
  SvgIcon,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './HostLauncher.styles';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';
import { useDefaultOrganization } from '@modules/organization';
import { billingSelectors, PaymentRequired } from '@modules/billing';
import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationSelectors } from '@modules/organization';
import {
  ERROR_MESSAGES,
  PermissionsCreateResource,
  useHasPermissionsToCreateResource,
} from '@modules/auth';

export const HostLauncher = () => {
  const { resetProvisionToken, provisionToken, provisionTokenLoadingState } =
    useProvisionToken();
  const { defaultOrganization } = useDefaultOrganization();

  const [activeView, setActiveView] = useState<'view' | 'action'>('view');

  const hasPaymentMethod = useRecoilValue(billingSelectors.hasPaymentMethod);
  const hasSubscription = useRecoilValue(billingSelectors.hasSubscription);

  const userRoleInOrganization: OrgRole = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canAddHost: PermissionsCreateResource =
    useHasPermissionsToCreateResource(
      userRoleInOrganization,
      hasPaymentMethod,
      hasSubscription,
    );

  const tokenValue = hasPaymentMethod ? token : token?.replace(/./g, '*');

  const handleAddingPaymentMethod = () => {
    setActiveView('action');
  };

  const handleHidingPortal = () => setActiveView('view');
  const handleSubmitPayment = () => {
    setActiveView('view');
  };

  const isDisabledAdding: boolean =
    canAddHost !== PermissionsCreateResource.GRANTED || !hasPaymentMethod;

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
          {isDisabledAdding && (
            <li>
              <div css={spacing.bottom.large}>
                <FormLabelCaps>Confirm Subscription Status</FormLabelCaps>
                <div css={spacing.top.medium}>
                  <Alert noBottomMargin>
                    {canAddHost !== PermissionsCreateResource.GRANTED
                      ? ERROR_MESSAGES['HOST'][canAddHost]
                      : 'Set up a payment method to add new hosts.'}
                  </Alert>
                </div>
                {canAddHost === PermissionsCreateResource.GRANTED &&
                  !hasPaymentMethod && (
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
              </div>
            </li>
          )}
          <li>
            <div css={spacing.bottom.large}>
              <FormLabelCaps>Run terminal command</FormLabelCaps>
              <FormText>
                Launch a new host by running this command on any server
              </FormText>
              <CopyToClipboard
                value={`bvup ${tokenValue}`}
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
          onHide={handleHidingPortal}
          handleSubmit={handleSubmitPayment}
        />
      )}
    </>
  );
};
