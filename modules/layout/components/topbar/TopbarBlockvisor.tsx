import { styles } from './TopbarBlockvisor.styles';
import IconBlockvisor from '@public/assets/icons/blockvisor-20.svg';

export const TopbarBlockvisor = () => {
  return (
    <div css={styles.iconWrapper}>
      <IconBlockvisor css={[styles.icon]} />
    </div>
  );
};
