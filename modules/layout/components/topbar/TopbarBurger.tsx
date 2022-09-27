import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { styles } from './TopbarBurger.styles';
import IconBlockvisor from '@public/assets/icons/menu-32.svg';

export const TopbarBurger = () => {
  const [, setApp] = useRecoilState(layoutState);

  const handleClick = () => {
    setApp('sidebar');
  };

  return (
    <button css={[styles.button]} onClick={handleClick}>
      <IconBlockvisor />
    </button>
  );
};
