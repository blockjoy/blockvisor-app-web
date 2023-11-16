import { styles } from './HostStatus.styles';
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

type HostStatusProps = {
  hasBorder?: boolean;
};

export const HostStatus = ({ hasBorder = true }: HostStatusProps) => {
  return (
    <span
      css={[
        styles.status,
        hasBorder && styles.statusBorder,
        styles.statusColorGreen,
      ]}
    >
      <HostStatusIcon size="12px" />
      <span css={[styles.statusText, styles.statusColorGreen]}>Online</span>
    </span>
  );
};
