import { useNodeView } from '@modules/node/hooks/useNodeView';
import { mapNodeConfigToDetails } from '@modules/node/utils/mapNodeConfigToDetails';
import { DetailsTable } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

export const NodeViewConfig = () => {
  const { node } = useNodeView();
  return (
    <>
      <h2 css={[typo.large, spacing.top.large]}>Configuration</h2>
      <DetailsTable bodyElements={mapNodeConfigToDetails(node)} />
    </>
  );
};
