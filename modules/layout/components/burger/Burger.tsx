import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarOpen, layoutState, sidebarOpenMobile } from '@modules/layout';
import { styles } from './Burger.styles';
import BurgerClosed from '@public/assets/icons/common/BurgerClosed.svg';
import BurgerHide from '@public/assets/icons/common/BurgerHide.svg';

export const Burger = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);

  const [isSidebarOpenMobile, setIsSidebarOpenMobile] =
    useRecoilState(sidebarOpenMobile);

  const layout = useRecoilValue(layoutState);

  const handleClick = () => {
    const isMobileWidth = window.innerWidth < 1200;
    if (isMobileWidth) {
      setIsSidebarOpenMobile(!isSidebarOpenMobile);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <button
      css={[
        styles.button,
        (isSidebarOpen || isSidebarOpenMobile) && styles.buttonClosed,
        !!layout && styles.overlayOpen,
      ]}
      onClick={handleClick}
    >
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
