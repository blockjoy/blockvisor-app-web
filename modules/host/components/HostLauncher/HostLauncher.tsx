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
import { useHasPermissions } from '@modules/auth';

export const HostLauncher = () => {
  const { resetProvisionToken, provisionToken, provisionTokenLoadingState } =
    useProvisionToken();

  const { defaultOrganization } = useDefaultOrganization();

  const canAddHost = useHasPermissions('host-create');

  const token = canAddHost
    ? provisionToken
    : provisionToken?.replace(/./g, '*');

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
              <CopyToClipboard value={`bvup ${token}`} disabled={!canAddHost} />
              {!canAddHost && (
                <Tooltip
                  noWrap
                  top="-30px"
                  left="50%"
                  tooltip="Feature disabled during beta."
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
              onClick={() => resetProvisionToken(defaultOrganization?.id!)}
              loading={provisionTokenLoadingState !== 'finished'}
              {...(!canAddHost && {
                tooltip: 'Feature disabled during beta.',
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
