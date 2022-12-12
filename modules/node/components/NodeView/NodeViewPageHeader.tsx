import { PageTitle } from '@shared/components';
import { NodeCreate } from '../NodeList/NodeCreate/NodeCreate';
import { styles } from './NodeViewPageHeader.styles';

export const NodeViewPageHeader = () => (
  <PageTitle title="Node View">
    <div css={styles.wrapper}>
      <h1>Nodes</h1>
      <NodeCreate />
      <div css={styles.spacer}></div>
    </div>
  </PageTitle>
);
