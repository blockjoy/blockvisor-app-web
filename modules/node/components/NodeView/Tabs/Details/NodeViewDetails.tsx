import { mapNodeConfigToDetails } from '@modules/node/utils/mapNodeConfigToDetails';
import { mapNodeToMainDetails } from '@modules/node/utils/mapNodeToMainDetails';
import { mapNodeToGeneralDetails } from '@modules/node/utils/mapNodeToGeneralDetails';
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
        <DetailsTable bodyElements={mapNodeToMainDetails(node!)} />
      </section>
      <section css={styles.section}>
        <FormHeaderCaps noBottomMargin>Configuration</FormHeaderCaps>
        <DetailsTable bodyElements={mapNodeConfigToDetails(node!)} />
      </section>
      <section css={styles.section}>
        <FormHeaderCaps noBottomMargin>General</FormHeaderCaps>
        <DetailsTable bodyElements={mapNodeToGeneralDetails(node!)} />
      </section>
    </>
  );
};
