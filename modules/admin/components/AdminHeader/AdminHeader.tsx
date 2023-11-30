import { SvgIcon } from '@shared/components';
import { useRouter } from 'next/router';
import { styles } from './AdminHeader.styles';

type Props = {
  icon: React.ReactNode;
  name: string;
  children?: React.ReactNode;
};

export const AdminHeader = ({ icon, name, children }: Props) => {
  const router = useRouter();

  const { id, ip, search, page } = router.query;

  const handleTitleClicked = () => {
    router.push({
      pathname: `admin`,
      query: {
        name,
        search,
        page,
      },
    });
  };

  return (
    <header css={styles.cardHeader}>
      <span css={styles.cardIcon}>
        <SvgIcon size="16px">{icon}</SvgIcon>
      </span>
      <h2
        onClick={() => (id || ip ? handleTitleClicked() : null)}
        css={[styles.cardTitle, (id || ip) && styles.cardTitleClickable]}
      >
        {name}
      </h2>
      {children}
    </header>
  );
};
