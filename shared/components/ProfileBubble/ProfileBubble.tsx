import { styles } from './ProfileBubble.styles';
import { authAtoms } from '@modules/auth';
import { useRecoilValue } from 'recoil';
import IconArrow from '@public/assets/icons/arrow-down.svg';
import { escapeHtml } from '@shared/utils/escapeHtml';

export const ProfileBubble = () => {
  const user = useRecoilValue(authAtoms.user);

  const initials =
    escapeHtml(user?.firstName?.substring(0, 1)?.toUpperCase()!) +
    escapeHtml(user?.lastName?.substring(0, 1)?.toUpperCase()!);

  const hasHtmlCharacters = initials?.length > 2;

  return (
    <span css={[styles.bubble]}>
      <span>{!hasHtmlCharacters ? initials : 'U'}</span>
      <span css={styles.arrowIcon}>
        <IconArrow />
      </span>
    </span>
  );
};
