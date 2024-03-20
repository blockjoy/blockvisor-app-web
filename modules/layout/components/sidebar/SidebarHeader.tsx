import { useRecoilValue } from 'recoil';
import { styles } from './SidebarHeader.styles';
import { sidebarOpen, sidebarOpenMobile } from '@modules/layout';
import Logo from '@public/assets/icons/app/BlockJoyLogoFull.svg';

export const SidebarHeader = () => {
  const isSidebarOpen = useRecoilValue(sidebarOpen);
  const isSidebarOpenMobile = useRecoilValue(sidebarOpenMobile);

  return (
    <header css={[styles.wrapper, isSidebarOpen && styles.wrapperSidebarOpen]}>
      {(window.innerWidth >= 1200 && isSidebarOpen) ||
      (window.innerWidth < 1200 && isSidebarOpenMobile) ? (
        <Logo />
      ) : null}
    </header>
  );
};
