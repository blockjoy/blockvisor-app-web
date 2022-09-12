import { FC } from 'react';
import { hostStyles } from './host.styles';

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
  status: string;
};

export const HostStatus: FC<Props> = ({ status }) => {
  console.log('status', status);
  return (
    <span css={hostStyles.status}>{statusList[status]?.name || 'Unknown'}</span>
  );
};
