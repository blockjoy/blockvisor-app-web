import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { escapeHtml } from '@shared/index';
import { NodeTags } from './NodeTags/NodeTags';
import { styles } from './NodeName.styles';

type NodeNameProps = {
  node: Node;
};

export const NodeName = ({ node }: NodeNameProps) => {
  const nodeTags = node?.tags?.tags ?? [];

  return (
    <span css={styles.wrapper(nodeTags.length > 0)}>
      <span css={styles.title}>
        {escapeHtml(node.displayName! || node.nodeName)}
      </span>
      <NodeTags node={node} />
    </span>
  );
};
