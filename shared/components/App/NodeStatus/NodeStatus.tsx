import { useLayoutEffect, useRef, useState } from 'react';
import {
  NodeHealth,
  NodeJob,
  NodeState,
} from '@modules/grpc/library/blockjoy/common/v1/node';
import { getNodeJobProgress } from '@modules/node/utils/getNodeJobProgress';
import {
  nodeHealthList,
  nodeStatusList,
} from '@shared/constants/nodeStatusList';
import { NodeStatusIcon } from './NodeStatusIcon';
import { NodeStatusLoader } from './NodeStatusLoader';
import { NodeStatusName } from './NodeStatusName';
import { styles } from './NodeStatus.styles';

export type NodeStatusType = 'protocol';

export type NodeStatusViewType = 'default' | 'simple';

export type NodeStatusListItem = {
  id: string | number;
  name: string;
  type?: NodeStatusType;
};

type Props = {
  status: NodeState | NodeHealth;
  protocolStatus?: string;
  jobs?: NodeJob[];
  hasBorder?: boolean;
  type?: NodeStatusType;
  view?: NodeStatusViewType;
};

export const getNodeStatusInfo = (
  status?: number,
  type?: string,
  protocolStatus?: string,
) => {
  switch (true) {
    case Boolean(protocolStatus):
      return {
        id: protocolStatus,
        name: protocolStatus?.toUpperCase(),
      };
    case type === 'protocol':
      return nodeHealthList.find((l) => l.id === status);
    default:
      return nodeStatusList.find((l) => l.id === status);
  }
};

export const getNodeStatusColor = (
  status?: number,
  type?: NodeStatusType,
  protocolStatus?: string,
) => {
  const statusName = getNodeStatusInfo(status, type!, protocolStatus)?.name;

  if (
    statusName?.match(
      /UPLOADING|DOWNLOADING|HEALTHY|RUNNING|SYNCED|SYNCING|FOLLOWER|BROADCASTING|PROVISIONING|UPDATING|UPLOADING|DOWNLOADING/g,
    )
  ) {
    return styles.statusColorGreen;
  } else if (
    statusName?.match(/UNHEALTHY|UNDEFINED|DELETED|DELINQUENT|FAILED/g)
  ) {
    return styles.statusColorRed;
  } else {
    return styles.statusColorDefault;
  }
};

export const checkIfUnspecified = (status: number, type?: NodeStatusType) => {
  if (type === 'protocol' && status === undefined) return true;

  const statusName = getNodeStatusInfo(status, type)?.name!;

  if (statusName?.match(/UNSPECIFIED/g)) return true;

  return false;
};

export const NodeStatus = ({
  status,
  protocolStatus,
  type,
  jobs,
  hasBorder = true,
  view = 'default',
}: Props) => {
  const nameRef = useRef<HTMLParagraphElement>(null);

  const progress = getNodeJobProgress(jobs!);

  const downloadingCurrent = progress?.current;
  const downloadingTotal = progress?.total;

  const isDownloading =
    downloadingCurrent! >= 0 && downloadingCurrent !== downloadingTotal;

  const statusColor = getNodeStatusColor(status, type, protocolStatus);

  const [statusNameWidth, setStatusNameWidth] = useState(
    nameRef.current?.clientWidth!,
  );

  useLayoutEffect(() => {
    setStatusNameWidth(nameRef.current?.clientWidth!);
  }, []);

  const isUnspecified = checkIfUnspecified(status!, type);
  if (isUnspecified) return <span>-</span>;

  return (
    <span
      css={[
        styles.status(!hasBorder),
        hasBorder && styles.statusBorder,
        isDownloading &&
          view === 'default' &&
          styles.statusLoading(statusNameWidth),
        statusColor,
      ]}
    >
      {isDownloading && view === 'default' && (
        <NodeStatusLoader
          current={downloadingCurrent!}
          total={downloadingTotal!}
          view={view}
        />
      )}
      <NodeStatusIcon
        size="12px"
        status={status!}
        type={type}
        protocolStatus={protocolStatus}
      />
      <p ref={nameRef} css={[styles.statusText(!hasBorder), statusColor]}>
        {status !== NodeState.NODE_STATE_FAILED &&
        (protocolStatus === 'downloading' || protocolStatus === 'uploading') ? (
          protocolStatus
        ) : (
          <NodeStatusName status={status} type={type} />
        )}
        {isDownloading && view === 'simple' && (
          <>
            {` `}
            <NodeStatusLoader
              current={downloadingCurrent!}
              total={downloadingTotal!}
              view={view}
            />
          </>
        )}
      </p>
    </span>
  );
};
