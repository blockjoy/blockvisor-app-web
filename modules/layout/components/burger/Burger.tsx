import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutSelectors, layoutAtoms } from '@modules/layout';
import { useSettings } from '@modules/settings';
import { useViewport } from '@shared/index';
import { styles } from './Burger.styles';
import BurgerClosed from '@public/assets/icons/common/BurgerClosed.svg';
import BurgerHide from '@public/assets/icons/common/BurgerHide.svg';

export const Burger = () => {
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useRecoilState(
    layoutAtoms.isSidebarOpenMobile,
  );

  const { updateSettings } = useSettings();
  const { isXlrg } = useViewport();

  const handleClick = () => {
    if (isXlrg) setIsSidebarOpenMobile(!isSidebarOpenMobile);
    else
      updateSettings('layout', {
        'sidebar.isOpen': !isSidebarOpen,
      });
  };

  return (
    <button css={styles.button} onClick={handleClick}>
      <span css={styles.icon}>
        {isXlrg && isSidebarOpenMobile ? <BurgerHide /> : <BurgerClosed />}
      </span>
    </button>
  );
};
