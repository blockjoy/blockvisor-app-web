import { styles } from './NodeStatus.styles';
import {
  nodeHealthList,
  nodeStatusList,
} from '@shared/constants/nodeStatusList';
import { NodeStatusIcon } from './NodeStatusIcon';
import { NodeStatusLoader } from './NodeStatusLoader';
import { NodeStatusName } from './NodeStatusName';
import { useLayoutEffect, useRef, useState } from 'react';
import {
  NodeHealth,
  NodeState,
} from '@modules/grpc/library/blockjoy/common/v1/node';

export type NodeStatusType = 'protocol';

export type NodeStatusViewType = 'default' | 'simple';

export type NodeStatusListItem = {
  id: string | number;
  name: string;
  type?: NodeStatusType;
};

type Props = {
  status: NodeState;
  type?: NodeStatusType;
  jobs?: NodeJob[];
  hasBorder?: boolean;
  view?: NodeStatusViewType;
};

export const getNodeStatusInfo = (status: NodeState) => {
  const statusInfo = nodeStatusList.find((l) => l.id === status);

  return {
    id: status,
    name: statusInfo?.name,
  };
};

export const getNodeHealthInfo = (status: NodeHealth) => {
  const statusInfo = nodeHealthList.find((l) => l.id === status);

  return {
    id: status,
    name: statusInfo?.name,
  };
};

export const getNodeStatusColor = (status: number, type?: NodeStatusType) => {
  const statusName =
    type === 'protocol'
      ? getNodeHealthInfo(status)?.name!
      : getNodeStatusInfo(status)?.name!;

  if (
    statusName?.match(
      /HEALTHY|RUNNING|SYNCED|SYNCING|FOLLOWER|BROADCASTING|PROVISIONING|UPDATING|UPLOADING|DOWNLOADING/g,
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
  const statusName = getNodeStatusInfo(status, type)?.name!;

  if (statusName?.match(/UNSPECIFIED/g)) return true;

  return false;
};

export const NodeStatus = ({
  status,
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

  const statusColor = getNodeStatusColor(status!, type);

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
      <NodeStatusIcon size="12px" status={status!} type={type} />
      <p ref={nameRef} css={[styles.statusText(!hasBorder), statusColor]}>
        <NodeStatusName status={status!} type={type} />
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
