import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { styles } from './Burger.styles';

export const Burger = () => {
  const [app, setApp] = useRecoilState(layoutState);

  const handleClick = () => {
    if (app !== 'sidebar') {
      localStorage.setItem('sidebarOpen', 'true');
    } else {
      localStorage.removeItem('sidebarOpen');
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
