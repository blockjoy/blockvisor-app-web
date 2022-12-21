import { useNodeView } from '@modules/node/hooks/useNodeView';
import { PageSection } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewConfig.styles';

export const NodeViewConfig = () => {
  const { node } = useNodeView();

  return (
    <>
      <PageSection>
        <h2 css={[typo.large, spacing.bottom.large]}>Configuration</h2>
      </PageSection>
    </>
  );
};
