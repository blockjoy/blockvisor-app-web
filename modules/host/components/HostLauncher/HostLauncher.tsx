import {
  Button,
  CopyToClipboard,
  FormHeader,
  FormText,
  OrganizationSelect,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

export const HostLauncher = () => {
  return (
    <div>
      <FormHeader>Select an organization</FormHeader>
      <OrganizationSelect />

      <FormHeader>Run terminal command</FormHeader>
      <FormText>
        Launch a new host by running this command on any server
      </FormText>

      <CopyToClipboard value={'bv init --34kegfdwfw'} />

      <Button style="outline" size="small" css={spacing.top.medium}>
        Regenerate
      </Button>

      <FormHeader>Sit back and wait</FormHeader>
      <FormText>We expect this host to be ready in 4 minutes</FormText>
    </div>
  );
};
