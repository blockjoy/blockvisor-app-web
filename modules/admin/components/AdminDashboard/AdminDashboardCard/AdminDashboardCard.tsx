import { styles } from './AdminDashboardCard.styles';
import { Skeleton, SvgIcon } from '@shared/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AdminSearch } from '../../AdminSearch/AdminSearch';

type Props = {
  name: string;
  icon: React.ReactNode;
  getTotal: () => Promise<number>;
};

export const AdminDashboardCard = ({ name, icon, getTotal }: Props) => {
  const router = useRouter();
  const [total, setTotal] = useState<number>();

  const query: AdminQuery = {
    name: name.toLowerCase(),
    page: 1,
  };

  const handleSearch = (keyword: string) => {
    if (keyword) query.search = keyword.trim();

    router.push({
      pathname: '/admin',
      query,
    });
  };

  const handleTotalClick = () => {
    router.push({
      pathname: '/admin',
      query,
    });
  };

  useEffect(() => {
    (async () => {
      const response = await getTotal();
      setTotal(response);
    })();
  }, []);

  return (
    <article css={styles.card}>
      <div css={styles.cardTitle}>
        <span css={styles.cardIcon}>
          <SvgIcon size="20px"> {icon}</SvgIcon>
        </span>
        <a onClick={handleTotalClick} css={styles.cardTotal}>
          <label css={styles.cardLabel}>{name}</label>
          <var css={styles.cardValue}>
            {total! >= 0 ? (
              total
            ) : (
              <Skeleton height="34px" margin="6px 0 0" width="60px" />
            )}
          </var>
        </a>
      </div>
      <AdminSearch onSearch={handleSearch} isDashboardSearch />
    </article>
  );
};
