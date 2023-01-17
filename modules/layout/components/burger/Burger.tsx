import { sidebarOpen, layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styles } from './Burger.styles';
import BurgerOpen from '@public/assets/icons/burger-open.svg';
import BurgerClosed from '@public/assets/icons/burger-closed.svg';

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

  return (
    <button
      css={[
        styles.button,
        isSidebarOpen && styles.buttonClosed,
        !!layout && styles.overlayOpen,
      ]}
      onClick={handleClick}
    >
      {!isSidebarOpen ? <BurgerClosed /> : <BurgerOpen />}
    </button>
  );
};
