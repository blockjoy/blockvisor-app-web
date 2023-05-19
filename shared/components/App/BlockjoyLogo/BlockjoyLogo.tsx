import { styles } from './BlockjoyLogo.styles';
import LogoSmall from '@public/assets/icons/blockjoy-logo-beta.svg';
import { FC } from 'react';

type Props = {
  scale?: number;
};

export const BlockjoyLogo: FC<Props> = ({ scale = 0.8 }) => (
  <span css={[styles.wrapper]}>
    <span css={styles.icon} style={{ transform: `scale(${scale})` }}>
      <LogoSmall />
    </span>
  </span>
);
