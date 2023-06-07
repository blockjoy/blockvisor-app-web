import { mapNodeConfigToDetails } from '@modules/node/utils/mapNodeConfigToDetails';
import { mapNodeToDetails } from '@modules/node/utils/mapNodeToDetails';
import { DetailsTable } from '@shared/components';
import { useNodeView } from '@modules/node';
import { FormHeaderCaps } from '@shared/components';
import { styles } from './NodeViewDetails.styles';

export const NodeViewDetails = () => {
  const { node } = useNodeView();
  return (
    <>
      <section css={styles.section}>
        <FormHeaderCaps noBottomMargin>Main</FormHeaderCaps>
        <DetailsTable bodyElements={mapNodeToDetails(node!)} />
      </section>
      <section css={styles.section}>
        <FormHeaderCaps noBottomMargin>Configuration</FormHeaderCaps>
        <DetailsTable bodyElements={mapNodeConfigToDetails(node!)} />
      </section>
    </>
  );
};
