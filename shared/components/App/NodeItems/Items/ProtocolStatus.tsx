import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NodePartials } from '@shared/components';
import {
  NODE_STATE_PRESENTATION_EXTENDED,
  checkIfNodeInProgress,
} from '@modules/node';

type Props = Partial<Pick<Node, 'nodeStatus' | 'jobs'>> & {
  view?: NodeStatusView;
};

export const ProtocolStatus = ({ nodeStatus, jobs, view }: Props) => {
  const protocolState = nodeStatus?.protocol?.state?.toLowerCase();

  if (!protocolState) return <>-</>;

  const { color, Icon, options } =
    NODE_STATE_PRESENTATION_EXTENDED[protocolState];

  const inProgress = checkIfNodeInProgress(nodeStatus);

  return (
    <NodePartials.NodeStatusTextWIcon
      color={color}
      Icon={Icon}
      options={options}
      view={view}
    >
      <span>{protocolState?.replaceAll('_', ' ') ?? ''}</span>
      {inProgress && (
        <>
          {' '}
          <NodePartials.NodeStatusDownloader jobs={jobs} view={view} />
        </>
      )}
    </NodePartials.NodeStatusTextWIcon>
  );
};
