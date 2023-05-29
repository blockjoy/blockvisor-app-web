import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getHostStatusColor, SvgIcon } from '@shared/components';
import { hostStatusList } from '@shared/constants/lookups';

const IconUndefined = dynamic(
  () => import('@public/assets/icons/hostStatus/Undefined.svg'),
);
const IconCreating = dynamic(
  () => import('@public/assets/icons/hostStatus/Creating.svg'),
);
const IconRunning = dynamic(
  () => import('@public/assets/icons/hostStatus/Running.svg'),
);
const IconStarting = dynamic(
  () => import('@public/assets/icons/hostStatus/Starting.svg'),
);
const IconStopping = dynamic(
  () => import('@public/assets/icons/hostStatus/Stopping.svg'),
);
const IconStopped = dynamic(
  () => import('@public/assets/icons/hostStatus/Stopped.svg'),
);
const IconUpgrading = dynamic(
  () => import('@public/assets/icons/hostStatus/Upgrading.svg'),
);
const IconUpgraded = dynamic(
  () => import('@public/assets/icons/hostStatus/Upgraded.svg'),
);
const IconDeleting = dynamic(
  () => import('@public/assets/icons/hostStatus/Deleting.svg'),
);
const IconDeleted = dynamic(
  () => import('@public/assets/icons/hostStatus/Deleted.svg'),
);
const IconInstalling = dynamic(
  () => import('@public/assets/icons/hostStatus/Installing.svg'),
);
const IconSnaphotting = dynamic(
  () => import('@public/assets/icons/hostStatus/Snaphotting.svg'),
);

const icons = {
  0: <IconUndefined />,
  1: <IconCreating />,
  2: <IconRunning />,
  3: <IconStarting />,
  4: <IconStopping />,
  5: <IconStopped />,
  6: <IconUpgrading />,
  7: <IconUpgraded />,
  8: <IconDeleting />,
  9: <IconDeleted />,
  10: <IconInstalling />,
  11: <IconSnaphotting />,
};

const getIcon = (status: number) => {
  return icons[status];
};

type HostStatusIconProps = {
  status: number;
  size: string;
};

export const HostStatusIcon = ({
  status,
  size = '24px',
}: HostStatusIconProps) => {
  const statusInfo = hostStatusList.find((s) => s.id === status);
  return (
    <Suspense fallback={null}>
      <SvgIcon
        additionalStyles={[getHostStatusColor(statusInfo!.name)]}
        size={size}
      >
        {getIcon(status)}
      </SvgIcon>
    </Suspense>
  );
};
