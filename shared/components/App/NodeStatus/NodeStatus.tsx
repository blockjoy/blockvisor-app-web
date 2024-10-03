import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/nodeStatusList';
import { NodeStatusIcon } from './NodeStatusIcon';
import { NodeStatusLoader } from './NodeStatusLoader';
import { NodeStatusName } from './NodeStatusName';
import { useLayoutEffect, useRef, useState } from 'react';

export type NodeStatusType = 'container' | 'sync' | 'staking';

export type NodeStatusListItem = {
  id: string | number;
  name: string;
  type?: NodeStatusType;
};

type Props = {
  status: number;
  type?: NodeStatusType;
  hasBorder?: boolean;
  downloadingCurrent?: number;
  downloadingTotal?: number;
};

export const getNodeStatusInfo = (status: number, type?: NodeStatusType) => {
  const statusInfo = nodeStatusList.find(
    (l) => l.id === status && l.type === type,
  );

  return {
    id: statusInfo?.id,
    name: statusInfo?.name,
    type: statusInfo?.type,
  };
};

export const getNodeStatusColor = (status: number, type?: NodeStatusType) => {
  const statusName = getNodeStatusInfo(status, type)?.name!;

  if (
    statusName?.match(
      /RUNNING|SYNCED|SYNCING|FOLLOWER|BROADCASTING|PROVISIONING|UPDATING|UPLOADING|DOWNLOADING/g,
    )
  ) {
    return styles.statusColorGreen;
  } else if (statusName?.match(/UNDEFINED|DELETED|DELINQUENT|FAILED/g)) {
    return styles.statusColorRed;
  } else {
    return styles.statusColorDefault;
  }
};

export const NodeStatus = ({
  status,
  type,
  hasBorder = true,
  downloadingCurrent,
  downloadingTotal,
}: Props) => {
  const nameRef = useRef<HTMLParagraphElement>(null);

  const isDownloading =
    downloadingCurrent! >= 0 && downloadingCurrent !== downloadingTotal;

  const statusColor = getNodeStatusColor(status, type);

  const [statusNameWidth, setStatusNameWidth] = useState(
    nameRef.current?.clientWidth!,
  );

  useLayoutEffect(() => {
    setStatusNameWidth(nameRef.current?.clientWidth!);
  }, []);

  return (
    <span
      css={[
        styles.status(!hasBorder),
        hasBorder && styles.statusBorder,
        isDownloading && styles.statusLoading(statusNameWidth),
        statusColor,
      ]}
    >
      {isDownloading && (
        <NodeStatusLoader
          current={downloadingCurrent!}
          total={downloadingTotal!}
        />
      )}
      <NodeStatusIcon size="12px" status={status} type={type} />
      <p ref={nameRef} css={[styles.statusText(!hasBorder), statusColor]}>
        <NodeStatusName status={status} type={type} />
      </p>
    </span>
  );
};
