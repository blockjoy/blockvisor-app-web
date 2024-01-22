import { mapNodeToDetails } from '@modules/node/utils/mapNodeToDetails';
import { mapNodeToLaunchDetails } from '@modules/node/utils/mapNodeToLaunchDetails';
import { DetailsTable } from '@shared/components';
import { useNodeView } from '@modules/node';
import { FormHeaderCaps } from '@shared/components';
import { styles } from './NodeViewDetails.styles';
import { NodeViewStatus } from './Status/NodeViewStatus';

export const NodeViewDetails = () => {
  const { node } = useNodeView();
  return (
    <>
      <NodeViewStatus />
      <section css={styles.section}>
        <DetailsTable bodyElements={mapNodeToDetails(node!)} />
      </section>
      <section css={styles.section}>
        <FormHeaderCaps noBottomMargin>Launch Details</FormHeaderCaps>
        <DetailsTable bodyElements={mapNodeToLaunchDetails(node!)} />
      </section>
    </>
  );
};
