import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
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
import {
  useProvisionToken,
  organizationSelectors,
} from '@modules/organization';
import { LAUNCH_ERRORS, LauncherWithGuardProps } from '@modules/billing';

export const HostLauncher = ({
  fulfilReqs,
  resetFulfilReqs,
  onCreateClick,
  permissions,
}: LauncherWithGuardProps) => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const { resetProvisionToken, provisionToken, provisionTokenLoadingState } =
    useProvisionToken();

  useEffect(() => {
    if (fulfilReqs) handleHostCreation();
  }, [fulfilReqs]);

  const token = !permissions.disabled
    ? provisionToken
    : provisionToken?.replace(/./g, '*');

  const handleHostCreation = async () => {
    await resetProvisionToken(defaultOrganization?.id!);
    resetFulfilReqs();
  };

  return (
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
                disabled={permissions.disabled}
              />
              {permissions.disabled && (
                <Tooltip
                  noWrap
                  top="-30px"
                  left="50%"
                  tooltip={LAUNCH_ERRORS.NO_PERMISSION}
                />
              )}
            </div>
            <Button
              style="outline"
              size="small"
              disabled={
                provisionTokenLoadingState !== 'finished' ||
                permissions.disabled
              }
              css={styles.button}
              onClick={onCreateClick}
              loading={provisionTokenLoadingState !== 'finished'}
              {...(permissions.disabled && {
                tooltip: LAUNCH_ERRORS.NO_PERMISSION,
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
  );
};
