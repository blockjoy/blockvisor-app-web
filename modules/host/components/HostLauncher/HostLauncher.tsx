import { useProvisionToken } from '@modules/organization/hooks/useProvisionToken';
import {
  Button,
  CopyToClipboard,
  FormHeader,
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
      <h3 css={styles.title}>Create host</h3>
      <div>
        <FormHeader>Select an organization</FormHeader>
        <OrganizationSelect />
      </div>
      <div>
        <FormHeader>Run terminal command</FormHeader>
        <FormText>
          Launch a new host by running this command on any server
        </FormText>

        <CopyToClipboard value={`bvup ${token}`} />

        <Button
          style="outline"
          size="small"
          css={[spacing.top.medium, styles.button]}
          onClick={resetProvisionToken}
          loading={provisionTokenLoadingState !== 'finished'}
        >
          Regenerate
        </Button>
      </div>
      <div css={spacing.top.medium}>
        <FormHeader>Sit back and wait</FormHeader>
        <FormText>We expect this host to be ready in 4 minutes</FormText>
      </div>
    </div>
  );
};
