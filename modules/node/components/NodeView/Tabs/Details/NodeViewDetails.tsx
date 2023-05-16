import { mapNodeConfigToDetails } from '@modules/node/utils/mapNodeConfigToDetails';
import { mapNodeToDetails } from '@modules/node/utils/mapNodeToDetails';
import { DetailsTable } from '@shared/components';
import { useNodeView, NodeFormHeader } from '@modules/node';
import { styles } from './NodeViewDetails.styles';

export const NodeViewDetails = () => {
  const { node } = useNodeView();
  return (
    <>
      <section css={styles.section}>
        <NodeFormHeader noBottomMargin>Main</NodeFormHeader>
        <DetailsTable bodyElements={mapNodeToDetails(node!)} />
      </section>

      <NodeFormHeader noBottomMargin>Configuration</NodeFormHeader>
      <DetailsTable bodyElements={mapNodeConfigToDetails(node!)} />
    </>
  );
};
