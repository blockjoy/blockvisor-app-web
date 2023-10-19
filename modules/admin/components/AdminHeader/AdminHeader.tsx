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

  const { id } = router.query;

  const handleTitleClicked = () => {
    router.back();
  };

  return (
    <header css={styles.cardHeader}>
      <span css={styles.cardIcon}>
        <SvgIcon size="16px">{icon}</SvgIcon>
      </span>
      <h2
        onClick={() => (id ? handleTitleClicked() : null)}
        css={[styles.cardTitle, id && styles.cardTitleClickable]}
      >
        {name}
      </h2>
      {children}
    </header>
  );
};
