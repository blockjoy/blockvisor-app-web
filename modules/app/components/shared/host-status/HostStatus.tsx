import { FC } from 'react';
import { styles } from './HostStatus.styles';

const statusList = [
  { id: 0, name: 'Undefined', icon: '' },
  { id: 1, name: 'Creating', icon: '' },
  { id: 2, name: 'Running', icon: '' },
  { id: 3, name: 'Starting', icon: '' },
  { id: 4, name: 'Stopping', icon: '' },
  { id: 5, name: 'Stopped', icon: '' },
  { id: 6, name: 'Upgrading', icon: '' },
  { id: 7, name: 'Upgraded', icon: '' },
  { id: 8, name: 'Deleting', icon: '' },
  { id: 9, name: 'Deleted', icon: '' },
  { id: 10, name: 'Installing', icon: '' },
  { id: 11, name: 'Snaphotting', icon: '' },
];

type Props = {
  status: number;
};

export const HostStatus: FC<Props> = ({ status }) => {
  return (
    <span css={styles.status}>
      {statusList.find((s) => s.id === status)?.name || 'Unknown'}
    </span>
  );
};
