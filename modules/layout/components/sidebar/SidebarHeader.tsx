import { useRecoilValue } from 'recoil';
import { layoutAtoms, layoutSelectors } from '@modules/layout';
import { styles } from './SidebarHeader.styles';
import Logo from '@public/assets/icons/app/BlockJoyLogoFull.svg';

export const SidebarHeader = () => {
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);
  const isSidebarOpenMobile = useRecoilValue(layoutAtoms.isSidebarOpenMobile);

  return (
    <header css={[styles.wrapper, isSidebarOpen && styles.wrapperSidebarOpen]}>
      {(window.innerWidth >= 1200 && isSidebarOpen) ||
      (window.innerWidth < 1200 && isSidebarOpenMobile) ? (
        <Logo />
      ) : null}
    </header>
  );
};
