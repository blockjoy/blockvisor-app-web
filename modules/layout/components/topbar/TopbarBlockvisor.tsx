import { styles } from './TopbarBlockvisor.styles';
import IconBlockvisor from '@public/assets/icons/blockvisor-20.svg';
import { useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const TopbarBlockvisor = () => {
  const layout = useRecoilValue(layoutState);

  return (
    <div
      css={[
        styles.iconWrapper,
        layout === 'sidebar' && styles.iconWrapperSidebarOpen,
      ]}
    >
      <IconBlockvisor css={[styles.icon]} />
    </div>
  );
};
