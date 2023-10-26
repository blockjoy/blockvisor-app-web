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

  const handleSearch = (keyword: string) => {
    router.push({
      pathname: '/admin',
      query: {
        name: name.toLowerCase(),
        page: 0,
        search: keyword.trim(),
      },
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
        <div>
          <label css={styles.cardLabel}>{name}</label>
          <var css={styles.cardValue}>
            {total! >= 0 ? (
              total
            ) : (
              <Skeleton height="34px" margin="6px 0 0" width="60px" />
            )}
          </var>
        </div>
      </div>
      <AdminSearch onSearch={handleSearch} />
    </article>
  );
};
