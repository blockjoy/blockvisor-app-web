import { styles } from './PageTitleLaunchNode.styles';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import { useRouter } from 'next/router';
import { SvgIcon } from '@shared/components';

export const PageTitleLaunchNode = () => {
  const router = useRouter();
  const query: { hostId?: string | string[] } = {};

  if (router.query.id && router.pathname === '/hosts/[id]')
    query.hostId = router.query.id;

  return !router.pathname.includes('launch-node') &&
    !router.pathname.includes('node-launcher') ? (
    <button
      css={styles.button}
      onClick={() =>
        router.push({
          pathname: '/launch-node',
          query,
        })
      }
    >
      <SvgIcon size="20px">
        <IconRocket />
      </SvgIcon>
      <span css={styles.buttonText}>Launch Node</span>
    </button>
  ) : null;
};
