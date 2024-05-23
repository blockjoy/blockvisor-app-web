import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { styles } from './HostOs.styles';
import { SvgIcon } from '@shared/components';

type Props = {
  os: string;
  osVersion?: string;
};

const IconUbuntu = dynamic(
  () => import(`@public/assets/icons/hostOs/Ubuntu.svg`),
);

export const HostOs = ({ os, osVersion }: Props) => {
  let Component;
  switch (os?.toLowerCase()) {
    case 'ubuntu':
      Component = IconUbuntu;
      break;
    default:
      Component = IconUbuntu;
      break;
  }

  return (
    <span css={styles.wrapper}>
      <SvgIcon size="16px">
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      </SvgIcon>
      <p css={styles.text}>
        {os} {!!osVersion && osVersion}
      </p>
    </span>
  );
};
