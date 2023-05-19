import { styles } from './ProfileBubble.styles';
import { authAtoms } from '@modules/auth';
import { useRecoilValue } from 'recoil';
import { escapeHtml } from '@shared/utils/escapeHtml';
import IconArrow from '@public/assets/icons/arrow-down.svg';

export const ProfileBubble = () => {
  const user = useRecoilValue(authAtoms.user);

  const initials =
    escapeHtml(user?.firstName?.substring(0, 1)?.toUpperCase()!) +
    escapeHtml(user?.lastName?.substring(0, 1)?.toUpperCase()!);

  return (
    <span css={[styles.bubble]}>
      <span>{initials?.substring(0, 2)}</span>
      <span css={styles.arrowIcon}>
        <IconArrow />
      </span>
    </span>
  );
};
