import { NodeTagsPerView } from './NodeTagsPerView/NodeTagsPerView';
import { NodeGroups } from './NodeGroups/NodeGroups';
import { styles } from './NodeLayout.styles';

export const NodeLayout = () => (
  <>
    <span css={styles.title}>Table Layout</span>
    <div css={styles.list}>
      <NodeGroups />
      <NodeTagsPerView />
    </div>
  </>
);
