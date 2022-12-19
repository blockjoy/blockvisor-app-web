import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { styles } from './Burger.styles';

export const Burger = () => {
  const [app, setApp] = useRecoilState(layoutState);

  const handleClick = () => {
    if (app !== 'sidebar') {
      localStorage.setItem('sidebarCollapsed', 'true');
    } else {
      localStorage.removeItem('sidebarCollapsed');
    }
    setApp(app === 'sidebar' ? undefined : 'sidebar');
  };

  return (
    <button
      css={[styles.button, app === 'sidebar' && styles.buttonClosed]}
      onClick={handleClick}
    >
      <span></span>
    </button>
  );
};
