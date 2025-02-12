import { NodeHealth } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NodePartials } from '@shared/components';
import { PROTOCOL_HEALTH_PRESENTATION } from '@modules/node';

type Props = Partial<Pick<Node, 'nodeStatus'>> & {
  view?: NodeStatusView;
};

export const ProtocolHealth = ({ nodeStatus, view }: Props) => {
  if (!nodeStatus?.protocol?.health) return <>-</>;

  const protocolHealth = [NodeHealth[nodeStatus?.protocol?.health]]?.[0]
    .replace('NODE_HEALTH_', '')
    ?.toLowerCase();

  const { color, Icon, options } = PROTOCOL_HEALTH_PRESENTATION[protocolHealth];

  return (
    <NodePartials.NodeStatusTextWIcon
      color={color}
      Icon={Icon}
      options={options}
      view={view}
    >
      {protocolHealth?.replaceAll('_', ' ') ?? ''}
    </NodePartials.NodeStatusTextWIcon>
  );
};
