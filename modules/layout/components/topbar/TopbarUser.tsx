import { useSetRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { styles } from './TopbarUser.styles';

export const TopbarUser = () => {
  const setLayout = useSetRecoilState(layoutState);

  const handleClick = () => {
    setLayout('profile');
  };

  return (
    <button css={[styles.button]} onClick={handleClick}>
      JH
    </button>
  );
};
