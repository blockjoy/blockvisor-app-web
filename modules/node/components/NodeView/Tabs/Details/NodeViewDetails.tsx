import { useNodeView } from '@modules/node/hooks/useNodeView';
import { mapNodeConfigToDetails } from '@modules/node/utils/mapNodeConfigToDetails';
import { mapNodeToDetails } from '@modules/node/utils/mapNodeToDetails';
import { DetailsTable } from '@shared/components';
import { NodeViewFormHeader } from '../../NodeViewFormHeader';
import { styles } from './NodeViewDetails.styles';

export const NodeViewDetails = () => {
  const { node } = useNodeView();
  return (
    <>
      <section css={styles.section}>
        <NodeViewFormHeader noBottomMargin>Main</NodeViewFormHeader>
        <DetailsTable bodyElements={mapNodeToDetails(node!)} />
      </section>

      <NodeViewFormHeader noBottomMargin>Configuration</NodeViewFormHeader>
      <DetailsTable bodyElements={mapNodeConfigToDetails(node!)} />
    </>
  );
};
