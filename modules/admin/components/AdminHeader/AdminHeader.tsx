import { useRouter } from 'next/router';
import { styles } from './AdminHeader.styles';
import IconBack from '@public/assets/icons/common/ArrowLeft.svg';
import { SvgIcon } from '@shared/components';

type Props = {
  name: string;
  children?: React.ReactNode;
};

export const AdminHeader = ({ name, children }: Props) => {
  const router = useRouter();

  const { id, ip, search, page, field, order } = router.query;

  const handleTitleClicked = () => {
    router.push({
      pathname: `admin`,
      query: {
        name,
        search,
        page,
        field,
        order,
      },
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
