import { styles } from './HostStatus.styles';
import { hostStatusList } from '@shared/constants/lookups';
import { HostStatusIcon } from './HostStatusIcon';

export const getHostStatusColor = (name: string) => {
  if (name === 'Running') {
    return styles.statusColorGreen;
  }

  return styles.statusColorDefault;
};

type HostStatusProps = {
  status: number;
  hasBorder?: boolean;
};

export const HostStatus = ({ status, hasBorder = true }: HostStatusProps) => {
  const statusInfo = hostStatusList.find((s) => s.id === status);

  return (
    <span
      css={[
        styles.status,
        hasBorder && styles.statusBorder,

        getHostStatusColor(statusInfo?.name!),
      ]}
    >
      <HostStatusIcon size="12px" status={status} />
      <span css={[styles.statusText, getHostStatusColor(statusInfo?.name!)]}>
        {statusInfo?.name || 'Unknown'}
      </span>
    </span>
  );
};
