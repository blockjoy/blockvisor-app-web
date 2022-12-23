import { styles } from './LaunchNodeButton.styles';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import { useRouter } from 'next/router';

export const LaunchNodeButton = () => {
  const router = useRouter();

  return (
    <button css={styles.button} onClick={() => router.push('/launch-node')}>
      <IconRocket />
      <span>Launch a Node</span>
    </button>
  );
};
