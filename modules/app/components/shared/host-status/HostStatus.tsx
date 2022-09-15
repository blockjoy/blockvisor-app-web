import { FC } from 'react';
import { styles } from './HostStatus.styles';
import { hostStatusList as statusList } from 'shared/constants/lookups';

import IconPending from 'public/assets/icons/host-pending-12.svg';
import IconNormal from 'public/assets/icons/host-normal-12.svg';
import IconLoaded from 'public/assets/icons/host-loaded-12.svg';
import IconIssue from 'public/assets/icons/host-issue-12.svg';

const getIcon = (name: string = '') => {
  switch (name) {
    case 'Creating':
    case 'Starting':
    case 'Running':
    case 'Stopping':
    case 'Upgrading':
    case 'Deleting':
    case 'Installing':
    case 'Snapshotting':
      return <IconPending />;
    case 'Undefined':
    case 'Running':
    case 'Broadcasting':
      return <IconNormal />;
    case 'Updgraded':
      return <IconLoaded />;
    case 'Undefined':
    case 'Stopped':
    case 'Deleted':
      return <IconIssue />;
    default:
      return <IconNormal />;
  }
};

type Props = {
  status: number;
};

export const HostStatus: FC<Props> = ({ status }) => {
  const statusInfo = statusList.find((s) => s.id === status);

  return (
    <span css={styles.status}>
      {getIcon(statusInfo?.name)}
      <span css={styles.statusText}>{statusInfo?.name || 'Unknown'}</span>
    </span>
  );
};
