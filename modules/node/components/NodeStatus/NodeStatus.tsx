import { FC } from 'react';
import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/lookups';

import IconConsensus from 'public/assets/icons/node-consensus-12.svg';
import IconStaking from 'public/assets/icons/node-staking-12.svg';
import IconSyncing from 'public/assets/icons/node-syncing-12.svg';
import IconUpdating from 'public/assets/icons/node-updating-12.svg';
import IconDisabled from 'public/assets/icons/node-disabled-12.svg';

const getIcon = (name: string = '') => {
  switch (name) {
    case 'Undefined':
    case 'Cancelled':
    case 'Removed':
    case 'Disabled':
    case 'Delinquent':
      return <IconDisabled />;
    case 'Earning':
    case 'Elected':
    case 'Broadcasting':
      return <IconConsensus />;
    case 'Delegating':
    case 'Delegating':
    case 'Electing':
    case 'Removing':
      return <IconSyncing />;
    case 'Ingesting':
    case 'Processing':
    case 'Relaying':
      return <IconUpdating />;
    case 'Mining':
    case 'Minting':
      return <IconStaking />;
    default:
      return <IconConsensus />;
  }
};

type Props = {
  status: number;
  hasBorder?: boolean;
};

export const NodeStatus: FC<Props> = ({ status, hasBorder }) => {
  console.log('status', status);

  const statusInfo = nodeStatusList.find((s) => s.id === status);

  if (status === 14) {
    console.log('statusInfo', statusInfo?.name);
  }

  return (
    <span css={[styles.status, hasBorder && styles.statusBorder]}>
      {/* {getIcon(statusInfo?.name)} */}
      <span css={styles.statusText}>{statusInfo?.name || 'Unknown'}</span>
    </span>
  );
};
