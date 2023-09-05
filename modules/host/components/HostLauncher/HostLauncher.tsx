<<<<<<< HEAD
=======
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
>>>>>>> e4e84717 (fix: [sc-2346] removed additional step in HostLauncher, rebased off develop)
import { useProvisionToken } from '@modules/organization/hooks/useProvisionToken';
import {
  Button,
  CopyToClipboard,
  FormHeaderCaps,
  FormLabelCaps,
  FormText,
  OrganizationSelect,
  SvgIcon,
  Tooltip,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './HostLauncher.styles';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';
<<<<<<< HEAD
import { useDefaultOrganization } from '@modules/organization';
import { usePermissions } from '@modules/auth';
=======
import {
  organizationSelectors,
  useDefaultOrganization,
} from '@modules/organization';
import { authSelectors } from '@modules/auth';
import { billingSelectors, PaymentRequired } from '@modules/billing';

import {
  useHasPermissions,
  Permissions,
} from '@modules/auth/hooks/useHasPermissions';
>>>>>>> e4e84717 (fix: [sc-2346] removed additional step in HostLauncher, rebased off develop)

export const HostLauncher = () => {
  const { resetProvisionToken, provisionToken, provisionTokenLoadingState } =
    useProvisionToken();

  const { defaultOrganization } = useDefaultOrganization();

<<<<<<< HEAD
  const { hasPermission } = usePermissions();

  const canResetProvisionToken = hasPermission('org-provision-reset-token');
=======
  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );
  const hasPaymentMethod = useRecoilValue(billingSelectors.hasPaymentMethod);

  const [activeView, setActiveView] = useState<'view' | 'action'>('view');
  const [fulfilRequirements, setFulfilRequirements] = useState<boolean>(false);

  const canAddHost: boolean = useHasPermissions(
    userRole,
    userRoleInOrganization,
    Permissions.CREATE_HOST,
  );

  const isDisabledAdding = !hasPaymentMethod || !canAddHost;

  const token = !isDisabledAdding
    ? provisionToken
    : provisionToken?.replace(/./g, '*');

  const handleHidingPortal = () => setActiveView('view');
>>>>>>> e4e84717 (fix: [sc-2346] removed additional step in HostLauncher, rebased off develop)

  const handleHostCreation = async () => {
    await resetProvisionToken(defaultOrganization?.id!);
    setFulfilRequirements(false);
  };

  const handleCreateHostClicked = () => {
    if (!hasPaymentMethod) {
      setActiveView('action');
      setFulfilRequirements(false);
      return;
    }

    setFulfilRequirements(true);
  };

  useEffect(() => {
    if (fulfilRequirements) setFulfilRequirements(false);
  }, [defaultOrganization?.id]);

  useEffect(() => {
    if (fulfilRequirements) handleHostCreation();
  }, [fulfilRequirements]);

  return (
<<<<<<< HEAD
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
          <div css={spacing.bottom.large}>
            <FormLabelCaps>Run terminal command</FormLabelCaps>
            <FormText>
              Launch a new host by running this command on any server
            </FormText>
            <div css={[styles.copy, spacing.bottom.medium]}>
              <CopyToClipboard
                value={`bvup ${
                  !canResetProvisionToken ? 'xxxxxxx' : provisionToken
                }`}
                disabled={!canResetProvisionToken}
              />
              {!canResetProvisionToken && (
                <Tooltip
                  noWrap
                  top="-30px"
                  left="50%"
                  tooltip="Insufficient Permissions"
                />
              )}
            </div>
            <Button
              style="outline"
              size="small"
              disabled={
                provisionTokenLoadingState !== 'finished' ||
                !canResetProvisionToken
              }
              css={styles.button}
              onClick={() => resetProvisionToken(defaultOrganization?.id!)}
              loading={provisionTokenLoadingState !== 'finished'}
              {...(!canResetProvisionToken && {
                tooltip: 'Insufficient Permissions.',
              })}
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
=======
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
              <FormLabelCaps>Run terminal command</FormLabelCaps>
              <FormText>
                Launch a new host by running this command on any server
              </FormText>
              <div css={[styles.copy, spacing.bottom.medium]}>
                <CopyToClipboard
                  value={`bvup ${token}`}
                  disabled={isDisabledAdding}
                />
                {isDisabledAdding && (
                  <Tooltip
                    noWrap
                    top="-30px"
                    left="50%"
                    tooltip={
                      !canAddHost
                        ? 'Insufficient permissions to launch host.'
                        : 'Payment required to launch host.'
                    }
                  />
                )}
              </div>
              <Button
                style="outline"
                size="small"
                disabled={
                  provisionTokenLoadingState !== 'finished' || !canAddHost
                }
                css={styles.button}
                onClick={handleCreateHostClicked}
                loading={provisionTokenLoadingState !== 'finished'}
                {...(!canAddHost && {
                  tooltip: 'Insufficient permissions to launch host.',
                })}
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
          warningMessage="Payment required to launch host."
          handleCancel={handleHidingPortal}
          handleSubmit={handleHidingPortal}
          handleHide={handleHidingPortal}
        />
      )}
    </>
>>>>>>> e4e84717 (fix: [sc-2346] removed additional step in HostLauncher, rebased off develop)
  );
};
