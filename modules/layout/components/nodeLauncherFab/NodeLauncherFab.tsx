import { styles } from './NodeLauncherFab.styles';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import { useRouter } from 'next/router';

export const NodeLauncherFab = () => {
  const router = useRouter();

  return !router.pathname.includes('launch-node') ? (
    <button css={styles.button} onClick={() => router.push('/launch-node')}>
      <IconRocket />
      <span css={styles.buttonText}>Launch Node</span>
    </button>
  ) : null;
};
