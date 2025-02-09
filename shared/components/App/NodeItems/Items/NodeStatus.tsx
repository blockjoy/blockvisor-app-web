import { NodeState } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NODE_STATE_PRESENTATION } from '@modules/node';
import { NodePartials } from '@shared/components';

type Props = Partial<Pick<Node, 'nodeStatus'>> & {
  view?: NodeStatusView;
};

export const NodeStatus = ({ nodeStatus, view = 'default' }: Props) => {
  if (!nodeStatus?.state) return <span>-</span>;

  const nodeState = [NodeState[nodeStatus.state]]?.[0]
    .replace('NODE_STATE_', '')
    ?.toLowerCase();

  const { color, Icon, options } = NODE_STATE_PRESENTATION[nodeState];

  return (
    <NodePartials.NodeStatusTextWIcon
      color={color}
      Icon={Icon}
      options={options}
      view={view}
    >
      {nodeState.replaceAll('_', ' ') ?? ''}
    </NodePartials.NodeStatusTextWIcon>
  );
};
