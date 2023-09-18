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
import { useDefaultOrganization } from '@modules/organization';
import { usePermissions } from '@modules/auth';

export const HostLauncher = () => {
  const { resetProvisionToken, provisionToken, provisionTokenLoadingState } =
    useProvisionToken();

  const { defaultOrganization } = useDefaultOrganization();

  const { hasPermission } = usePermissions();

  const canResetProvisionToken = hasPermission('org-provision-reset-token');

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
  );
};
