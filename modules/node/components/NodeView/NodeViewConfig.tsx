import { useNodeView } from '@modules/node/hooks/useNodeView';
import { DetailsTable, PageSection } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

export const NodeViewConfig = () => {
  const { node } = useNodeView();
  return (
    <>
      <PageSection>
        <h2 css={[typo.large, spacing.top.large]}>Configuration</h2>
        <DetailsTable bodyElements={node?.nodeTypeConfigDetails!} />
      </PageSection>
    </>
  );
};
