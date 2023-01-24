import { sidebarOpen, layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styles } from './Burger.styles';
import BurgerOpen from '@public/assets/icons/burger-open.svg';
import BurgerClosed from '@public/assets/icons/burger-closed.svg';
import BurgerHide from '@public/assets/icons/burger-hide.svg';

export const Burger = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);
  const layout = useRecoilValue(layoutState);

  const handleClick = () => {
    if (isSidebarOpen) {
      localStorage.setItem('sidebarCollapsed', 'true');
    } else {
      localStorage.removeItem('sidebarCollapsed');
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isMobile = window.innerWidth < 1200;

  return (
    <button
      css={[
        styles.button,
        isSidebarOpen && styles.buttonClosed,
        !!layout && styles.overlayOpen,
      ]}
      onClick={handleClick}
    >
      <span css={styles.icon}>
        {isMobile ? (
          isSidebarOpen ? (
            <BurgerHide />
          ) : (
            <BurgerClosed />
          )
        ) : (
          <BurgerClosed />
        )}
      </span>
    </button>
  );
};
