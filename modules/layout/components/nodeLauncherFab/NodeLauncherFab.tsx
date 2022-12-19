import { styles } from './NodeLauncherFab.styles';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import { useRouter } from 'next/router';

export const NodeLauncherFab = () => {
  const router = useRouter();

  return (
    <button css={styles.button} onClick={() => router.push('/launch-node')}>
      <IconRocket />
    </button>
  );
};
