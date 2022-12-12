import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { styles } from './TopbarBurger.styles';
import IconBurger from '@public/assets/icons/menu-32.svg';

export const TopbarBurger = () => {
  const [app, setApp] = useRecoilState(layoutState);

  const handleClick = () => {
    setApp(app === 'sidebar' ? undefined : 'sidebar');
  };

  return (
    <button css={[styles.button]} onClick={handleClick}>
      <IconBurger />
    </button>
  );
};
