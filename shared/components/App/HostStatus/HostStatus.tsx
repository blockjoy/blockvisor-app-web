import { styles } from './HostStatus.styles';
import { hostStatusList } from '@shared/constants/hostStatusList';
import { HostStatusIcon } from './HostStatusIcon';

export const getHostStatusColor = (name: string) => {
  if (name?.match(/RUNNING|INSTALLING/g)) {
    return styles.statusColorGreen;
  } else if (name?.match(/UNSPECIFIED|UNDEFINED|STOPPED/g)) {
    return styles.statusColorRed;
  } else {
    return styles.statusColorDefault;
  }
};

export const getHostStatusInfo = (status: number) =>
  hostStatusList.find((l) => l.id === status);

type HostStatusProps = {
  status: number;
  hasBorder?: boolean;
};

export const HostStatus = ({ status, hasBorder = true }: HostStatusProps) => {
  const statusInfo = getHostStatusInfo(status);
  return (
    <span
      css={[
        styles.status,
        hasBorder && styles.statusBorder,

        getHostStatusColor(statusInfo?.name?.toUpperCase()!),
      ]}
    >
      <HostStatusIcon size="12px" status={status} />
      <span css={[styles.statusText, getHostStatusColor(statusInfo?.name!)]}>
        {statusInfo?.name || 'Unknown'}
      </span>
    </span>
  );
};
