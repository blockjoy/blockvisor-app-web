import { useNodeView } from '@modules/node/hooks/useNodeView';
import { DetailsTable, PageSection } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewConfig.styles';

export const NodeViewConfig = () => {
  const { node } = useNodeView();

  console.log('nodeViewConfig', node);

  const config = [];

  return (
    <>
      <PageSection>
        <h2 css={typo.large}>Configuration</h2>
        <DetailsTable bodyElements={node?.nodeTypeConfigDetails!} />
      </PageSection>
    </>
  );
};
