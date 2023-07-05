import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SvgIcon } from '@shared/components';
import { styles } from './HostStatus.styles';

const IconRunning = dynamic(() => import('@public/assets/icons/app/Host.svg'));

type HostStatusIconProps = {
  size: string;
};

export const HostStatusIcon = ({ size = '24px' }: HostStatusIconProps) => {
  return (
    <Suspense fallback={null}>
      <SvgIcon additionalStyles={[styles.statusColorGreen]} size={size}>
        <IconRunning />
      </SvgIcon>
    </Suspense>
  );
};
