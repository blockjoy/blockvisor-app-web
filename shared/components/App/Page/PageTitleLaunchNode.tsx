import { styles } from './PageTitleLaunchNode.styles';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import { useRouter } from 'next/router';
import { SvgIcon } from '@shared/components';

export const PageTitleLaunchNode = () => {
  const router = useRouter();

  return !router.pathname.includes('launch-node') ? (
    <button css={styles.button} onClick={() => router.push('/launch-node')}>
      <SvgIcon size="20px">
        <IconRocket />
      </SvgIcon>
      <span css={styles.buttonText}>Launch Node</span>
    </button>
  ) : null;
};
