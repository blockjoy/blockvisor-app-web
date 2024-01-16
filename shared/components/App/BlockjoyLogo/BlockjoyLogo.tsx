import { styles } from './BlockjoyLogo.styles';
import { SvgIcon } from '@shared/components';
import BlockJoyLogoBeta from '@public/assets/icons/app/BlockJoyLogoBeta.svg';

type Props = {
  scale?: number;
};

export const BlockjoyLogo = ({ scale = 0.8 }: Props) => (
  <span css={[styles.wrapper]}>
    <span css={styles.icon} style={{ transform: `scale(${scale})` }}>
      <SvgIcon size="64px">
        <BlockJoyLogoBeta />
      </SvgIcon>
    </span>
  </span>
);
