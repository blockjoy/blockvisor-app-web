import { styles } from './ProfileBubble.styles';
import { authAtoms } from '@modules/auth';
import { useRecoilValue } from 'recoil';

export const ProfileBubble = () => {
  const user = useRecoilValue(authAtoms.user);

  return (
    <span css={[styles.bubble]}>
      {user?.firstName?.substring(0, 1)}
      {user?.lastName?.substring(0, 1)}
    </span>
  );
};
