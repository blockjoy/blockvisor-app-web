import { Button } from '@shared/components';
import { styles } from './OrganizationInvite.styles';

export const OrganizationInvite = () => {
  return (
    <>
      <textarea rows={10} />
      <div css={styles.buttons}>
        <Button display="block" size="small">
          Add Members
        </Button>
        <Button display="block" size="small" style="outline">
          Cancel
        </Button>
      </div>
    </>
  );
};
