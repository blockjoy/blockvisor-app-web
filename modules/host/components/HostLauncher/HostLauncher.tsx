import { useProvisionToken } from '@modules/organization/hooks/useProvisionToken';
import {
  Button,
  CopyToClipboard,
  FormHeader,
  FormHeaderCaps,
  FormLabelCaps,
  FormText,
  OrganizationSelect,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './HostLauncher.styles';

type HostLauncherProps = {
  token?: string;
};

export const HostLauncher = ({ token }: HostLauncherProps) => {
  const { resetProvisionToken, provisionTokenLoadingState } =
    useProvisionToken();

  // TODO: Improve design and structure
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
            <CopyToClipboard value={`bvup ${token}`} />
            <Button
              style="outline"
              size="small"
              disabled={provisionTokenLoadingState !== 'finished'}
              css={[spacing.top.medium, styles.button]}
              onClick={resetProvisionToken}
              loading={provisionTokenLoadingState !== 'finished'}
            >
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
