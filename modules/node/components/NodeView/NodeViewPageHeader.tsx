import { PageTitle } from '@shared/components';
import { LaunchNodeButton } from '@modules/node';
import { styles } from './NodeViewPageHeader.styles';

export const NodeViewPageHeader = () => (
  <PageTitle title="Node View">
    <div css={styles.wrapper}>
      <h1>Nodes</h1>
      {/* <NodeCreate /> */}
      <LaunchNodeButton />
      <div css={styles.spacer}></div>
    </div>
  </PageTitle>
);
