import { styles } from './SidebarHeader.styles';
import { useRecoilValue } from 'recoil';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import Logo from '@public/assets/icons/blockjoy-logo-full.svg';
import { isDesktop } from 'react-device-detect';
export const SidebarHeader = () => {
  const isSidebarOpen = useRecoilValue(sidebarOpen);
  return (
    <header css={[styles.wrapper, isSidebarOpen && styles.wrapperSidebarOpen]}>
      {isSidebarOpen && isDesktop && <Logo />}
    </header>
  );
};
