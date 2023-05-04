import { styles } from './SidebarHeader.styles';
import { useRecoilValue } from 'recoil';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import Logo from '@public/assets/icons/blockjoy-logo-full.svg';
import Info from '@public/assets/icons/info.svg';
import { SvgIcon } from '@shared/components';

export const SidebarHeader = () => {
  const isSidebarOpen = useRecoilValue(sidebarOpen);
  return (
    <header css={[styles.wrapper, isSidebarOpen && styles.wrapperSidebarOpen]}>
      {isSidebarOpen && (
        <>
          <Logo />
          <SvgIcon css={styles.infoIcon}>
            <Info />
          </SvgIcon>
        </>
      )}
    </header>
  );
};
