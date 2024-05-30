import { useRecoilState, useRecoilValue } from 'recoil';
import { useLayout, layoutSelectors, layoutAtoms } from '@modules/layout';
import { styles } from './Burger.styles';
import BurgerClosed from '@public/assets/icons/common/BurgerClosed.svg';
import BurgerHide from '@public/assets/icons/common/BurgerHide.svg';

export const Burger = () => {
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useRecoilState(
    layoutAtoms.isSidebarOpenMobile,
  );

  const { updateLayout } = useLayout();

  const handleClick = () => {
    const isMobileWidth = window.innerWidth < 1200;
    if (isMobileWidth) {
      setIsSidebarOpenMobile(!isSidebarOpenMobile);
    } else {
      updateLayout('sidebar.isOpen', !isSidebarOpen);
    }
  };

  return (
    <button css={styles.button} onClick={handleClick}>
      <span css={styles.icon}>
        {window.innerWidth < 1200 && isSidebarOpenMobile ? (
          <BurgerHide />
        ) : (
          <BurgerClosed />
        )}
      </span>
    </button>
  );
};
