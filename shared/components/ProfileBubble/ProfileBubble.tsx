import { styles } from './ProfileBubble.styles';
import { authAtoms } from '@modules/auth';
import { useRecoilValue } from 'recoil';
import IconArrow from '@public/assets/icons/arrow-down.svg';

export const ProfileBubble = () => {
  const user = useRecoilValue(authAtoms.user);

  return (
    <span css={[styles.bubble]}>
      <span>
        {user?.firstName?.substring(0, 1)?.toUpperCase()}
        {user?.lastName?.substring(0, 1)?.toUpperCase()}
      </span>
      <span css={styles.arrowIcon}>
        <IconArrow />
      </span>
    </span>
  );
};
