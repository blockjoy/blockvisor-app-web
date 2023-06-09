import { styles } from './PageTitleLaunchNode.styles';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import { useRouter } from 'next/router';

export const PageTitleLaunchNode = () => {
  const router = useRouter();

  return !router.pathname.includes('launch-node') ? (
    <button css={styles.button} onClick={() => router.push('/launch-node')}>
      <IconRocket />
      <span css={styles.buttonText}>Launch Node</span>
    </button>
  ) : null;
};
