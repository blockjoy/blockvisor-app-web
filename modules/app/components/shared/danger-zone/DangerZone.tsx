import { Button } from '@shared/components';
import { FC } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

interface Props {
  handleDelete: VoidFunction;
  children: React.ReactNode;
}

export const DangerZone: FC<Props> = ({ handleDelete, children }) => {
  return (
    <section>
      <h2 css={[typo.xlarge, spacing.bottom.large]}>Danger Zone</h2>
      <div css={spacing.bottom.medium}>{children}</div>
      <Button size="small" style="warning" onClick={handleDelete}>
        Delete
      </Button>
    </section>
  );
};
