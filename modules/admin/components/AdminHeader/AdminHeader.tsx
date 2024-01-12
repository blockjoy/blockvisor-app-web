import { useRouter } from 'next/router';
import { styles } from './AdminHeader.styles';
import { SvgIcon } from '@shared/components';
import IconBack from '@public/assets/icons/common/ArrowLeft.svg';

type Props = {
  name: string;
  children?: React.ReactNode;
};

export const AdminHeader = ({ name, children }: Props) => {
  const router = useRouter();

  const { id, ip, search, page } = router.query;

  const handleTitleClicked = () => {
    const query: AdminQuery = {
      name,
    };

    if (search) query.search = search as string;
    if (page) query.page = +page;

    router.push({
      pathname: `admin`,
      query,
    });
  };

  return (
    <header css={styles.header}>
      {(id || ip) && (
        <div css={styles.title}>
          <a onClick={handleTitleClicked} css={styles.titleText}>
            <SvgIcon>
              <IconBack />
            </SvgIcon>
            {name}
          </a>
        </div>
      )}
      {children}
    </header>
  );
};
